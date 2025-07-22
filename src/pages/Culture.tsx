import React, { useEffect, useState } from 'react';
import { Calendar, Clock, User, Tag, Heart, MessageCircle, Send } from 'lucide-react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { useCultureStore } from '../store/cultureStore';
import { useAuthStore } from '../store/authStore';

const CulturePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [commentInputs, setCommentInputs] = useState<{ [key: string]: string }>({});
  const [showComments, setShowComments] = useState<{ [key: string]: boolean }>({});

  const {
    posts,
    comments,
    userLikes,
    loading,
    fetchPosts,
    toggleLike,
    addComment,
    fetchComments,
    fetchUserLikes,
  } = useCultureStore();

  const { user, userProfile } = useAuthStore();

  // Local loading state for user likes to avoid flicker
  const [likesLoading, setLikesLoading] = useState(true);

  // Fetch posts on mount
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // Fetch user likes once user is loaded
  useEffect(() => {
    if (user) {
      setLikesLoading(true);
      fetchUserLikes(user.id)
        .catch(() => toast.error('Failed to fetch liked posts'))
        .finally(() => setLikesLoading(false));
    } else {
      // If no user, clear likes state and loading
      setLikesLoading(false);
    }
  }, [user, fetchUserLikes]);

  const handleLike = async (postId: string) => {
    if (!user) return toast.error('Please sign in to like posts');
    try {
      await toggleLike(postId, user.id);
    } catch {
      toast.error('Failed to toggle like');
    }
  };

  const handleComment = async (postId: string) => {
    if (!user) return toast.error('Please sign in to comment');
    const content = commentInputs[postId]?.trim();
    if (!content) return;
    try {
      await addComment(postId, user.id, content, userProfile?.full_name || 'Anonymous');
      setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
      await fetchComments(postId);
      toast.success('Comment added');
    } catch {
      toast.error('Failed to add comment');
    }
  };

  const handleShowComments = async (postId: string) => {
    if (!showComments[postId]) {
      await fetchComments(postId);
    }
    setShowComments((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  

  const categories = [
    { id: 'all', name: 'All Content' },
    { id: 'traditions', name: 'Traditions' },
    { id: 'history', name: 'History' },
    { id: 'festivals', name: 'Festivals' },
    { id: 'art', name: 'Art & Music' },
    { id: 'cuisine', name: 'Cuisine' },
  ];

  const filteredPosts = posts.filter(
    (post) => selectedCategory === 'all' || post.category === selectedCategory
  );

  // Show loading if posts are loading or userLikes are loading
  if (loading || likesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Explore Ethiopian Culture</h1>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-green-600 to-yellow-500 text-white'
                  : 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-100'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-xl shadow hover:shadow-lg overflow-hidden">
              <img src={post.image_url} alt={post.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {format(new Date(post.created_at), 'MMM dd, yyyy')}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {post.read_time}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2">{post.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-3 mb-3">{post.excerpt}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {post.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="flex items-center text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                    >
                      <Tag className="w-3 h-3 mr-1" />{tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-green-600" />
                    {post.author}
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-1 text-xs px-2 py-1 rounded ${
                        userLikes.has(post.id)
                          ? 'bg-red-100 text-red-600'
                          : 'bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600'
                      }`}
                    >
                      <Heart className="w-4 h-4" /> {post.likes_count}
                    </button>
                    <button
                      onClick={() => handleShowComments(post.id)}
                      className="flex items-center gap-1 text-xs px-2 py-1 rounded bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600"
                    >
                      <MessageCircle className="w-4 h-4" /> {post.comments_count}
                    </button>
                  </div>
                </div>

                {user && (
                  <div className="flex items-center gap-2 mt-3">
                    <input
                      type="text"
                      value={commentInputs[post.id] || ''}
                      onChange={(e) =>
                        setCommentInputs((prev) => ({ ...prev, [post.id]: e.target.value }))
                      }
                      onKeyDown={(e) => e.key === 'Enter' && handleComment(post.id)}
                      placeholder="Write a comment..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring focus:ring-green-500"
                    />
                    <button
                      onClick={() => handleComment(post.id)}
                      className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {showComments[post.id] && (
                  <div className="mt-3 max-h-32 overflow-y-auto border-t pt-2">
                    {(comments[post.id] || []).map((comment) => (
                      <div key={comment.id} className="flex gap-2 mb-2">
                        <User className="w-4 h-4 text-green-600 mt-1" />
                        <div>
                          <p className="text-sm font-medium text-gray-800">
                            {comment.author_name}{' '}
                            <span className="text-xs text-gray-500">
                              {format(new Date(comment.created_at), 'MMM dd, HH:mm')}
                            </span>
                          </p>
                          <p className="text-sm text-gray-700">{comment.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-green-600 to-yellow-500 text-white text-center mt-16 p-8 rounded-2xl">
          <h2 className="text-2xl font-bold mb-2">Stay Updated on Ethiopian Culture</h2>
          <p className="text-lg mb-4">Get weekly insights into traditions, history, and more.</p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 text-gray-900 rounded-lg focus:outline-none"
            />
            <button className="bg-white text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CulturePage;
