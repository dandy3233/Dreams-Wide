import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);


export type Database = {
  public: {
    Tables: {
      jobs: {
        Row: {
          id: string;
          title: string;
          company: string;
          location: string;
          type: string;
          category: string;
          description: string;
          requirements: string[];
          deadline: string;
          posted_at: string;
          created_at: string;
          updated_at: string;
          is_active: boolean;
        };
        Insert: {
          title: string;
          company: string;
          location: string;
          type: string;
          category: string;
          description: string;
          requirements: string[];
          deadline: string;
          posted_at?: string;
          is_active?: boolean;
        };
        Update: {
          title?: string;
          company?: string;
          location?: string;
          type?: string;
          category?: string;
          description?: string;
          requirements?: string[];
          deadline?: string;
          posted_at?: string;
          is_active?: boolean;
        };
      };
      cultural_posts: {
        Row: {
          id: string;
          title: string;
          content: string;
          excerpt: string;
          category: string;
          author: string;
          image_url: string;
          tags: string[];
          likes_count: number;
          comments_count: number;
          read_time: string;
          created_at: string;
          updated_at: string;
          is_published: boolean;
        };
        Insert: {
          title: string;
          content: string;
          excerpt: string;
          category: string;
          author: string;
          image_url: string;
          tags: string[];
          read_time: string;
          is_published?: boolean;
        };
        Update: {
          title?: string;
          content?: string;
          excerpt?: string;
          category?: string;
          author?: string;
          image_url?: string;
          tags?: string[];
          read_time?: string;
          is_published?: boolean;
        };
      };
      post_likes: {
        Row: {
          id: string;
          post_id: string;
          user_id: string;
          created_at: string;
        };
        Insert: {
          post_id: string;
          user_id: string;
        };
        Update: object;
      };
      post_comments: {
        Row: {
          id: string;
          post_id: string;
          user_id: string;
          content: string;
          author_name: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          post_id: string;
          user_id: string;
          content: string;
          author_name: string;
        };
        Update: {
          content?: string;
        };
      };
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          role: 'admin' | 'user';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name: string;
          role?: 'admin' | 'user';
        };
        Update: {
          email?: string;
          full_name?: string;
          role?: 'admin' | 'user';
        };
      };
    };
  };
};