import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  Briefcase, 
  FileText, 
  Users, 
  Plus,
  Edit,
  Trash2,
  Eye,
  Calendar,
  TrendingUp
} from 'lucide-react';
import { useJobStore } from '../store/jobStore';
import { useCultureStore } from '../store/cultureStore';
import { useAuthStore } from '../store/authStore';
import JobForm from '../components/JobForm';
import CultureForm from '../components/CultureForm';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const location = useLocation();
  const { jobs, fetchJobs, deleteJob } = useJobStore();
  const { posts, fetchPosts, deletePost } = useCultureStore();
  const { userProfile } = useAuthStore();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchJobs();
    fetchPosts();
  }, [fetchJobs, fetchPosts]);

  const navigation = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'jobs', name: 'Jobs', icon: Briefcase },
    { id: 'culture', name: 'Culture Posts', icon: FileText },
    { id: 'users', name: 'Users', icon: Users },
  ];

  const handleDeleteJob = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        await deleteJob(id);
        toast.success('Job deleted successfully');
      } catch (error) {
        toast.error('Failed to delete job');
      }
    }
  };

  const handleDeletePost = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(id);
        toast.success('Post deleted successfully');
      } catch (error) {
        toast.error('Failed to delete post');
      }
    }
  };

  const OverviewTab = () => {
    const activeJobs = jobs.filter(job => job.is_active).length;
    const publishedPosts = posts.filter(post => post.is_published).length;
    const totalLikes = posts.reduce((sum, post) => sum + post.likes_count, 0);
    const totalComments = posts.reduce((sum, post) => sum + post.comments_count, 0);

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full">
                <Briefcase className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Jobs</p>
                <p className="text-2xl font-bold text-gray-900">{activeJobs}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Published Posts</p>
                <p className="text-2xl font-bold text-gray-900">{publishedPosts}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Likes</p>
                <p className="text-2xl font-bold text-gray-900">{totalLikes}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Comments</p>
                <p className="text-2xl font-bold text-gray-900">{totalComments}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Jobs</h3>
            <div className="space-y-3">
              {jobs.slice(0, 5).map((job) => (
                <div key={job.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{job.title}</p>
                    <p className="text-sm text-gray-600">{job.company}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    job.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {job.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Posts</h3>
            <div className="space-y-3">
              {posts.slice(0, 5).map((post) => (
                <div key={post.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{post.title}</p>
                    <p className="text-sm text-gray-600">By {post.author}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">{post.likes_count} likes</p>
                    <p className="text-sm text-gray-600">{post.comments_count} comments</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const JobsTab = () => {
    const [showForm, setShowForm] = useState(false);
    const [editingJob, setEditingJob] = useState(null);

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Job Management</h2>
          <button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-green-600 to-yellow-500 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Job</span>
          </button>
        </div>

        {showForm && (
          <JobForm
            job={editingJob}
            onClose={() => {
              setShowForm(false);
              setEditingJob(null);
            }}
          />
        )}

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Job Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {jobs.map((job) => (
                  <tr key={job.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{job.title}</div>
                        <div className="text-sm text-gray-500">{job.location}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {job.company}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {job.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        job.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {job.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => {
                          setEditingJob(job);
                          setShowForm(true);
                        }}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteJob(job.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const CultureTab = () => {
    const [showForm, setShowForm] = useState(false);
    const [editingPost, setEditingPost] = useState(null);

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Culture Posts Management</h2>
          <button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-green-600 to-yellow-500 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Post</span>
          </button>
        </div>

        {showForm && (
          <CultureForm
            post={editingPost}
            onClose={() => {
              setShowForm(false);
              setEditingPost(null);
            }}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={post.image_url}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                    {post.category}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    post.is_published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {post.is_published ? 'Published' : 'Draft'}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>By {post.author}</span>
                  <span>{format(new Date(post.created_at), 'MMM dd, yyyy')}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>{post.likes_count} likes</span>
                  <span>{post.comments_count} comments</span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setEditingPost(post);
                      setShowForm(true);
                    }}
                    className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1"
                  >
                    <Edit className="h-3 w-3" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    className="flex-1 bg-red-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors flex items-center justify-center space-x-1"
                  >
                    <Trash2 className="h-3 w-3" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {userProfile?.full_name}</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <nav className="bg-white rounded-lg shadow-md p-4">
              <ul className="space-y-2">
                {navigation.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeTab === item.id
                          ? 'bg-gradient-to-r from-green-600 to-yellow-500 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'overview' && <OverviewTab />}
            {activeTab === 'jobs' && <JobsTab />}
            {activeTab === 'culture' && <CultureTab />}
            {activeTab === 'users' && (
              <div className="bg-white rounded-lg p-8 shadow-md text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">User Management</h2>
                <p className="text-gray-600">User management features coming soon...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;