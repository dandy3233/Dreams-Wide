import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { X } from 'lucide-react';
import { useJobStore } from '../store/jobStore';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabase';

const schema = yup.object({
  title: yup.string().required('Title is required'),
  company: yup.string().required('Company is required'),
  location: yup.string().required('Location is required'),
  type: yup.string().required('Job type is required'),
  category: yup.string().required('Category is required'),
  description: yup.string().required('Description is required'),
  requirements: yup.string().required('Requirements are required'),
  deadline: yup.string().required('Deadline is required'),
  is_active: yup.boolean(),
});

interface JobFormProps {
  job?: any;
  onClose: () => void;
}

const JobForm: React.FC<JobFormProps> = ({ job, onClose }) => {
  const { createJob, updateJob } = useJobStore();
  const isEditing = !!job;
  const [logoFile, setLogoFile] = useState<File | null>(null);
  

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: job
      ? {
          ...job,
          requirements: Array.isArray(job.requirements)
            ? job.requirements.join('\n')
            : typeof job.requirements === 'string'
            ? job.requirements
            : '',
        }
      : {
          is_active: true,
        },
  });

  const uploadLogo = async (file: File): Promise<string | null> => {
    const fileName = `${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage.from('logos').upload(fileName, file);

    if (error) {
      console.error('Logo upload error:', error.message);
      return null;
    }

    const { data: urlData } = supabase.storage.from('logos').getPublicUrl(fileName);
    return urlData?.publicUrl || null;
  };

  const onSubmit = async (data: any) => {
    try {
      let logo_url = job?.logo_url || null;

      if (logoFile) {
        const uploadedUrl = await uploadLogo(logoFile);
        if (!uploadedUrl) {
          toast.error('Logo upload failed');
          return;
        }
        logo_url = uploadedUrl;
      }

      const jobData = {
        ...data,
        logo_url,
        requirements: data.requirements
          .split('\n')
          .map((req: string) => req.trim())
          .filter(Boolean),
        posted_at: new Date().toISOString(),
      };

      if (isEditing) {
        await updateJob(job.id, jobData);
        toast.success('Job updated successfully');
      } else {
        await createJob(jobData);
        toast.success('Job created successfully');
      }

      onClose();
    } catch (error) {
      console.error(error);
      toast.error('Failed to save job');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">
            {isEditing ? 'Edit Job' : 'Create New Job'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Job Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
              <input
                {...register('title')}
                type="text"
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Enter job title"
              />
              {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
            </div>

            {/* Company */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
              <input
                {...register('company')}
                type="text"
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Enter company name"
              />
              {errors.company && <p className="text-red-500 text-sm">{errors.company.message}</p>}
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                {...register('location')}
                type="text"
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Enter location"
              />
              {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
            </div>

            {/* Job Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
              <select
                {...register('type')}
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option value="">Select type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
              {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                {...register('category')}
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option value="">Select category</option>
                <option value="government">Government</option>
                <option value="banking">Banking</option>
                <option value="ngo">NGO & International</option>
                <option value="private">Private Sector</option>
              </select>
              {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
            </div>

            {/* Deadline */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
              <input
                {...register('deadline')}
                type="date"
                className="w-full px-4 py-2 border rounded-lg"
              />
              {errors.deadline && <p className="text-red-500 text-sm">{errors.deadline.message}</p>}
            </div>

            {/* Logo Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Logo</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              {...register('description')}
              rows={4}
              className="w-full px-4 py-3 border rounded-lg"
              placeholder="Enter job description"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description.message}</p>
            )}
          </div>

          {/* Requirements */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Requirements (one per line)
            </label>
            <textarea
              {...register('requirements')}
              rows={4}
              className="w-full px-4 py-3 border rounded-lg"
              placeholder="Enter requirements"
            />
            {errors.requirements && (
              <p className="text-red-500 text-sm">{errors.requirements.message}</p>
            )}
          </div>

          {/* Active Toggle */}
          <div className="flex items-center">
            <input
              {...register('is_active')}
              type="checkbox"
              className="h-4 w-4 text-green-600 border-gray-300 rounded"
            />
            <label className="ml-2 text-sm text-gray-700">Active (visible to seekers)</label>
          </div>

          {/* Buttons */}
          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 px-4 py-3 border rounded-lg text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-green-600 to-yellow-500 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-200 disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : isEditing ? 'Update Job' : 'Create Job'}
            </button>
            
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobForm;
