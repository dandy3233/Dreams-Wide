import React, { useState, useEffect } from 'react';
import { Search, MapPin, Briefcase, Building, Filter } from 'lucide-react';
import { useJobStore } from '../store/jobStore';
import { format } from 'date-fns';

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);
  const { jobs, loading, fetchJobs } = useJobStore();

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const activeJobs = jobs.filter((job) => job.is_active);

  const jobCategories = [
    { id: 'all', name: 'All Categories', count: activeJobs.length },
    { id: 'government', name: 'Government Jobs', count: activeJobs.filter((j) => j.category === 'government').length },
    { id: 'banking', name: 'Banking Sector', count: activeJobs.filter((j) => j.category === 'banking').length },
    { id: 'ngo', name: 'NGO & International', count: activeJobs.filter((j) => j.category === 'ngo').length },
    { id: 'private', name: 'Private Sector', count: activeJobs.filter((j) => j.category === 'private').length },
  ];

  const filteredJobs = activeJobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Find Your Dream Job</h1>
          <p className="text-xl text-gray-600">
            Discover verified opportunities from trusted Ethiopian employers
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs, companies, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent min-w-[200px]"
            >
              {jobCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name} ({category.count})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Job Categories
              </h3>
              <div className="space-y-2">
                {jobCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-green-100 text-green-700'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{category.name}</span>
                      <span className="text-sm text-gray-500">{category.count}</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-8 p-4 bg-gradient-to-r from-green-600 to-yellow-500 rounded-lg text-white">
                <h4 className="font-semibold mb-2">Job Alert</h4>
                <p className="text-sm mb-3">Get notified about new jobs matching your preferences.</p>
                <button className="w-full bg-white text-green-600 py-2 rounded font-medium hover:bg-gray-100 transition-colors">
                  Set up Alert
                </button>
              </div>
            </div>
          </div>

          {/* Job Listings */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                {filteredJobs.length} Jobs Found
                {selectedCategory !== 'all' && (
                  <span className="text-lg text-gray-600 ml-2">
                    in {jobCategories.find((cat) => cat.id === selectedCategory)?.name}
                  </span>
                )}
              </h2>
            </div>

            <div className="space-y-6">
              {filteredJobs.map((job) => {
                const requirements = Array.isArray(job.requirements) ? job.requirements : [];

                return (
                  <div key={job.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                      <div className="flex-1 flex gap-4 items-start">
                        {job.logo_url && (
                          <img
                            src={job.logo_url}
                            alt={`${job.company} logo`}
                            className="h-12 w-12 object-contain rounded-md border"
                          />
                        )}
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-1 hover:text-green-600 cursor-pointer">
                            {job.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-4 text-gray-600">
                            <div className="flex items-center">
                              <Building className="h-4 w-4 mr-1" />
                              <span>{job.company}</span>
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center">
                              <Briefcase className="h-4 w-4 mr-1" />
                              <span>{job.type}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right mt-4 lg:mt-0">
                        <div className="text-sm text-gray-500 mb-1">
                          Posted {format(new Date(job.posted_at), 'MMM dd, yyyy')}
                        </div>
                        <div className="text-sm text-red-600 font-medium">
                          Deadline: {format(new Date(job.deadline), 'MMM dd, yyyy')}
                        </div>
                      </div>
                    </div>

                    {expandedJobId === job.id && (
                      <>
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-gray-900 mb-2">Job Description:</h4>
                          <p className="text-sm text-gray-700 whitespace-pre-line">{job.description}</p>
                        </div>

                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-gray-900 mb-2">Requirements:</h4>
                          {requirements.length > 0 ? (
                            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                              {requirements.map((req, idx) => (
                                <li key={idx}>{req}</li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-sm text-yellow-600 italic">Requirements will be shared soon.</p>
                          )}
                        </div>
                      </>
                    )}

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button className="bg-gradient-to-r from-green-600 to-yellow-500 text-white px-6 py-2 rounded-lg font-medium hover:shadow-md transition-all duration-200">
                        Apply Now
                      </button>
                      <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                        Save Job
                      </button>
                      <button
                        onClick={() => setExpandedJobId(expandedJobId === job.id ? null : job.id)}
                        className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                      >
                        {expandedJobId === job.id ? 'Hide Details' : 'View Details'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Load More Button (optional implementation) */}
            <div className="text-center mt-8">
              <button className="bg-white border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                Load More Jobs
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
