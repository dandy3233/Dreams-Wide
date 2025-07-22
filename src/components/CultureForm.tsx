import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { X } from 'lucide-react';
import { useCultureStore } from '../store/cultureStore';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

const schema = yup.object({
  title: yup.string().required('Title is required'),
  content: yup.string().required('Content is required'),
  excerpt: yup.string().required('Excerpt is required'),
  category: yup.string().required('Category is required'),
  imageFile: yup
    .mixed()
    .test('required', 'Image is required', (value) => !!value && value.length > 0),
  tags: yup.string().required('Tags are required'),
  read_time: yup.string().required('Read time is required'),
  is_published: yup.boolean(),
});

interface CultureFormProps {
  post?: any;
  onClose: () => void;
}

const CultureForm: React.FC<CultureFormProps> = ({ post, onClose }) => {
  const { createPost, updatePost } = useCultureStore();
  const { userProfile } = useAuthStore();
  const isEditing = !!post;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: post
      ? {
          ...post,
          tags: post.tags.join(', '),
        }
      : {
          is_published: true,
        },
  });

  const onSubmit = async (data: any) => {
  try {
    const imageFile = data.imageFile?.[0];

    const postData = {
  ...data,
  tags: data.tags
    .split(',')
    .map((tag: string) => tag.trim())
    .filter((tag: string) => tag),
  author_id: userProfile?.id,              // ✅ for RLS
  author: userProfile?.full_name || 'Admin', // optional
};


    delete postData.imageFile;

    if (isEditing) {
      await updatePost(post.id, postData);
      toast.success('Post updated successfully');
    } else {
      await createPost(postData, imageFile);
      toast.success('Post created successfully');
    }

    onClose();
  } catch (error) {
    console.error(error);
    toast.error('Failed to save post');
  }
};


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              {isEditing ? 'Edit Culture Post' : 'Create New Culture Post'}
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                {...register('title')}
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter post title"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                {...register('category')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Select category</option>
                <option value="traditions">Traditions</option>
                <option value="history">History</option>
                <option value="festivals">Festivals</option>
                <option value="art">Art & Music</option>
                <option value="cuisine">Cuisine</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Read Time</label>
              <input
                {...register('read_time')}
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., 5 min read"
              />
              {errors.read_time && (
                <p className="text-red-500 text-sm mt-1">{errors.read_time.message}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload Image</label>
              <input
                {...register('imageFile')}
                type="file"
                accept="image/*"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              {errors.imageFile && (
                <p className="text-red-500 text-sm mt-1">{errors.imageFile.message}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags (comma separated)
              </label>
              <input
                {...register('tags')}
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="culture, tradition, ethiopia"
              />
              {errors.tags && (
                <p className="text-red-500 text-sm mt-1">{errors.tags.message}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt</label>
              <textarea
                {...register('excerpt')}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Brief description of the post"
              />
              {errors.excerpt && (
                <p className="text-red-500 text-sm mt-1">{errors.excerpt.message}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
              <textarea
                {...register('content')}
                rows={8}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Write your post content here..."
              />
              {errors.content && (
                <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
              )}
            </div>
          </div>

          <div className="flex items-center">
            <input
              {...register('is_published')}
              type="checkbox"
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">
              Published (visible to users)
            </label>
          </div>

          <div className="flex space-x-4 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-green-600 to-yellow-500 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-200 disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : isEditing ? 'Update Post' : 'Create Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CultureForm;
 