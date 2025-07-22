import React from 'react';
import { Target, Eye, Heart, Users, Shield, Globe, Award, CheckCircle } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Shield,
      title: 'Trust',
      description: 'We build confidence through transparency and accountability in all our job listings and cultural content.',
    },
    {
      icon: Heart,
      title: 'Ethics',
      description: 'Integrity and fairness guide everything we do, ensuring equal opportunities for all job seekers.',
    },
    {
      icon: Target,
      title: 'Opportunity',
      description: 'We connect dreams with real career paths, helping professionals find their perfect match.',
    },
    {
      icon: Users,
      title: 'Diversity & Inclusion',
      description: 'We value all experiences and perspectives as fuel for innovation and progress.',
    },
  ];

  const guidelines = [
    'Respect Others – Show dignity and kindness in all interactions.',
    'Be Honest – Share accurate and truthful information.',
    'Promote Fair Work – No listings with exploitative or illegal conditions.',
    'Protect Privacy – Keep communication professional and secure.',
    'Stay Professional – No spam, offensive content, or irrelevant ads.',
    'Report Violations – Help us keep the platform safe and trustworthy.',
  ];

  const partners = [
    'National Job Opportunities (NJO)',
    'Ethiopian Airports Enterprise',
    'Commercial Bank of Ethiopia (CBE)',
    'Awash International Bank',
    'Dashen Bank',
    'Ethiopian Electric Power (EEP)',
    'Addis Ababa City Administration',
    'Shaggar City Administration',
    'UNICEF Ethiopia',
    'World Bank Group',
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">About Dreams Wide</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ethiopia's premier platform connecting ambitious professionals with verified opportunities 
            while celebrating our rich cultural heritage.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="bg-gradient-to-r from-green-600 to-yellow-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
              <Target className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              To connect ambition with opportunity. We aim to bridge the gap between talent and 
              organizations by providing a comprehensive, accessible platform for job seekers and 
              employers across all industries, levels, and locations in Ethiopia.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="bg-gradient-to-r from-green-600 to-yellow-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
              <Eye className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              To become the world's most trusted and inclusive job portal — where every dreamer 
              finds their path and every company finds its perfect match, while preserving and 
              celebrating Ethiopian culture for future generations.
            </p>
          </div>
        </div>

        {/* What We Do */}
        <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What Makes Us Different</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Verified Listings</h3>
              <p className="text-gray-600">
                Every job posting is verified from trusted institutions across Ethiopia, ensuring authenticity and quality.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Cultural Heritage</h3>
              <p className="text-gray-600">
                Beyond jobs, we celebrate Ethiopian culture, traditions, and history through engaging content.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Daily Updates</h3>
              <p className="text-gray-600">
                Fresh opportunities and cultural insights updated daily to keep you informed and inspired.
              </p>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md text-center">
                <div className="bg-gradient-to-r from-green-600 to-yellow-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Community Guidelines */}
        <div className="bg-gradient-to-r from-green-600 to-yellow-500 rounded-2xl p-8 lg:p-12 text-white mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Community Guidelines</h2>
          <p className="text-lg mb-8 text-center">
            To keep Dreams Wide a safe, respectful, and effective space, all users are asked to follow these rules:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {guidelines.map((guideline, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-white mt-0.5 flex-shrink-0" />
                <p className="text-white">{guideline}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trusted Partners */}
        <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Trusted Partners</h2>
          <p className="text-lg text-gray-600 mb-8 text-center">
            We work with leading organizations across Ethiopia to bring you verified opportunities:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {partners.map((partner, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-gray-800 font-medium">{partner}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gray-100 rounded-2xl p-8 lg:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Join the Dreams Wide Community</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Whether you're a job seeker, employer, or simply someone passionate about Ethiopian culture, 
            you have a place in our community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-green-600 to-yellow-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200">
              Start Your Journey
            </button>
            <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;