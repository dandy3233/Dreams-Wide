// store/cultureStore.ts

import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/supabase';

type CulturalPost = Database['public']['Tables']['cultural_posts']['Row'];
type CulturalPostInsert = Database['public']['Tables']['cultural_posts']['Insert'];
type CulturalPostUpdate = Database['public']['Tables']['cultural_posts']['Update'];
type PostComment = Database['public']['Tables']['post_comments']['Row'];

interface CultureState {
  posts: CulturalPost[];
  comments: { [postId: string]: PostComment[] };
  userLikes: Set<string>;
  loading: boolean;

  fetchPosts: () => Promise<void>;
  createPost: (post: CulturalPostInsert, imageFile?: File) => Promise<void>;
  updatePost: (id: string, post: CulturalPostUpdate) => Promise<void>;
  deletePost: (id: string) => Promise<void>;

  toggleLike: (postId: string, userId: string) => Promise<void>;
  addComment: (postId: string, userId: string, content: string, authorName: string) => Promise<void>;
  fetchComments: (postId: string) => Promise<void>;
  fetchUserLikes: (userId: string) => Promise<void>;
}

export const useCultureStore = create<CultureState>((set, get) => ({
  posts: [],
  comments: {},
  userLikes: new Set(),
  loading: false,

  fetchPosts: async () => {
    set({ loading: true });
    try {
      const { data, error } = await supabase
        .from('cultural_posts')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      set({ posts: data || [] });
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      set({ loading: false });
    }
  },

  createPost: async (post, imageFile) => {
    try {
      let image_url = '';
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from('cultural-posts')
          .upload(fileName, imageFile);

        if (uploadError) throw uploadError;
        image_url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/cultural-posts/${fileName}`;
      }

      const { data, error } = await supabase
        .from('cultural_posts')
        .insert([{ ...post, image_url }])
        .select()
        .single();

      if (error) throw error;

      set((state) => ({ posts: [data, ...state.posts] }));
    } catch (error) {
      console.error('Error creating post:', error);
    }
  },

  updatePost: async (id, post) => {
    try {
      const { data, error } = await supabase
        .from('cultural_posts')
        .update(post)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      set((state) => ({
        posts: state.posts.map((p) => (p.id === id ? data : p)),
      }));
    } catch (error) {
      console.error('Error updating post:', error);
    }
  },

  deletePost: async (id) => {
    try {
      const { error } = await supabase.from('cultural_posts').delete().eq('id', id);
      if (error) throw error;
      set((state) => ({
        posts: state.posts.filter((p) => p.id !== id),
      }));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  },

  toggleLike: async (postId, userId) => {
    try {
      const { data: existing, error: existingError } = await supabase
        .from('post_likes')
        .select('*')
        .eq('post_id', postId)
        .eq('user_id', userId)
        .maybeSingle();

      if (existingError) throw existingError;

      if (existing) {
        await supabase.from('post_likes').delete().eq('post_id', postId).eq('user_id', userId);
        await supabase.rpc('decrement_likes', { post_id: postId });

        set((state) => {
          const newLikes = new Set(state.userLikes);
          newLikes.delete(postId);
          return {
            userLikes: newLikes,
            posts: state.posts.map((p) =>
              p.id === postId ? { ...p, likes_count: (p.likes_count || 1) - 1 } : p
            ),
          };
        });
      } else {
        await supabase.from('post_likes').insert([{ post_id: postId, user_id: userId }]);
        await supabase.rpc('increment_likes', { post_id: postId });

        set((state) => {
          const newLikes = new Set(state.userLikes);
          newLikes.add(postId);
          return {
            userLikes: newLikes,
            posts: state.posts.map((p) =>
              p.id === postId ? { ...p, likes_count: (p.likes_count || 0) + 1 } : p
            ),
          };
        });
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  },

  addComment: async (postId, userId, content, authorName) => {
    try {
      const { error } = await supabase.from('post_comments').insert([
        {
          post_id: postId,
          user_id: userId,
          content,
          author_name: authorName,
        },
      ]);
      if (error) throw error;

      set((state) => ({
        posts: state.posts.map((p) =>
          p.id === postId ? { ...p, comments_count: (p.comments_count || 0) + 1 } : p
        ),
      }));
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  },

  fetchComments: async (postId) => {
    try {
      const { data, error } = await supabase
        .from('post_comments')
        .select('*')
        .eq('post_id', postId)
        .order('created_at', { ascending: false });
      if (error) throw error;

      set((state) => ({
        comments: { ...state.comments, [postId]: data || [] },
      }));
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  },

  fetchUserLikes: async (userId) => {
    try {
      const { data, error } = await supabase.from('post_likes').select('post_id').eq('user_id', userId);
      if (error) throw error;

      const likedPosts = new Set(data.map((like) => like.post_id));
      set({ userLikes: likedPosts });
    } catch (error) {
      console.error('Error fetching user likes:', error);
      set({ userLikes: new Set() });
    }
  },
}));
