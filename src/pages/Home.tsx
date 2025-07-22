import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase, Users, Globe, Star, CheckCircle, TrendingUp } from 'lucide-react';

const Home = () => {
  const jobCategories = [
    { name: 'Government Jobs', icon: '🏛️', count: '150+ Active', color: 'bg-blue-500' },
    { name: 'Banking Sector', icon: '🏦', count: '45+ Active', color: 'bg-green-500' },
    { name: 'NGO & International', icon: '🌍', count: '80+ Active', color: 'bg-purple-500' },
    { name: 'Private Sector', icon: '💼', count: '200+ Active', color: 'bg-orange-500' },
  ];

  const culturalHighlights = [
    {
      title: 'Ethiopian Coffee Ceremony',
      description: 'Discover the rich tradition of coffee preparation and its cultural significance.',
      image: 'https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      title: 'Timkat Festival',
      description: 'Explore the colorful celebration of Ethiopian Orthodox Epiphany.',
      image: 'https://images.pexels.com/photos/8112478/pexels-photo-8112478.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      title: 'Historic Rock Churches',
      description: 'Journey through the UNESCO World Heritage sites of Lalibela.',
      image: 'https://images.pexels.com/photos/9881343/pexels-photo-9881343.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
  ];

  const stats = [
    { label: 'Active Job Listings', value: '500+', icon: Briefcase },
    { label: 'Registered Users', value: '10K+', icon: Users },
    { label: 'Partner Organizations', value: '150+', icon: Globe },
    { label: 'Success Stories', value: '2K+', icon: Star },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 via-yellow-500 to-red-500 text-white py-20">
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Welcome to <span className="text-yellow-300">Dreams Wide</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100">
              Ethiopia's go-to source for verified jobs and vibrant culture
            </p>
            <p className="text-lg mb-10 max-w-3xl mx-auto text-gray-200">
              Your daily digest of work and wisdom. Connect with opportunities and explore Ethiopia's rich heritage, all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/jobs"
                className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Briefcase className="h-5 w-5" />
                <span>Explore Jobs</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/culture"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-green-600 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Globe className="h-5 w-5" />
                <span>Discover Culture</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-r from-green-600 to-yellow-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Find Your Dream Job</h2>
            <p className="text-xl text-gray-600">Explore opportunities across all sectors</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {jobCategories.map((category, index) => (
              <Link
                key={index}
                to="/jobs"
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 group"
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-600 mb-4">{category.count}</p>
                <div className="flex items-center text-green-600 font-medium">
                  <span>View Jobs</span>
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Cultural Highlights */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Explore Ethiopian Culture</h2>
            <p className="text-xl text-gray-600">Discover the rich heritage and traditions of Ethiopia</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {culturalHighlights.map((item, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-xl mb-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/culture"
              className="bg-gradient-to-r from-green-600 to-yellow-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 inline-flex items-center space-x-2"
            >
              <span>Explore More Culture</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose Dreams Wide?</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Verified Job Listings</h3>
                    <p className="text-gray-600">All jobs are verified from trusted institutions across Ethiopia.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Daily Updates</h3>
                    <p className="text-gray-600">Fresh job opportunities and cultural content updated every day.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Cultural Heritage</h3>
                    <p className="text-gray-600">Celebrate and learn about Ethiopia's rich traditions and history.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Trusted Network</h3>
                    <p className="text-gray-600">Connected with major employers, banks, NGOs, and government institutions.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-r from-green-600 to-yellow-500 rounded-2xl p-8 text-white">
                <TrendingUp className="h-12 w-12 mb-6" />
                <h3 className="text-2xl font-bold mb-4">Join Thousands of Success Stories</h3>
                <p className="text-lg mb-6">
                  Be part of Ethiopia's growing professional community. Connect with opportunities that match your dreams.
                </p>
                <Link
                  to="/about"
                  className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center space-x-2"
                >
                  <span>Learn More</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;