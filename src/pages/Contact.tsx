import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Users, FileText } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'general'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Address',
      details: ['Addis Ababa, Ethiopia', 'Bole Sub-City'],
      color: 'text-blue-600'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@dreamswide.et', 'support@dreamswide.et'],
      color: 'text-green-600'
    },
    {
      icon: Phone,
      title: 'Phone',
      details: ['+251 11 xxx xxxx', '+251 91 xxx xxxx'],
      color: 'text-purple-600'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Mon - Fri: 8:00 AM - 6:00 PM', 'Sat: 9:00 AM - 4:00 PM'],
      color: 'text-orange-600'
    }
  ];

  const contactTypes = [
    {
      value: 'general',
      label: 'General Inquiry',
      icon: MessageCircle,
      description: 'General questions about our platform'
    },
    {
      value: 'job',
      label: 'Job Posting',
      icon: FileText,
      description: 'Submit a job listing or verify postings'
    },
    {
      value: 'partnership',
      label: 'Partnership',
      icon: Users,
      description: 'Explore partnership opportunities'
    },
    {
      value: 'support',
      label: 'Technical Support',
      icon: Send,
      description: 'Get help with technical issues'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Get in Touch</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions about job listings, cultural content, or partnerships? 
            We're here to help you succeed.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-md text-center">
              <div className={`w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4`}>
                <info.icon className={`h-6 w-6 ${info.color}`} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{info.title}</h3>
              {info.details.map((detail, idx) => (
                <p key={idx} className="text-gray-600 text-sm">{detail}</p>
              ))}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Send us a Message</h2>
              
              {/* Contact Type Selection */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-4">What can we help you with?</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {contactTypes.map((type) => (
                    <div key={type.value} className="relative">
                      <input
                        type="radio"
                        id={type.value}
                        name="type"
                        value={type.value}
                        checked={formData.type === type.value}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <label
                        htmlFor={type.value}
                        className={`block p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          formData.type === type.value
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <type.icon className={`h-5 w-5 ${formData.type === type.value ? 'text-green-600' : 'text-gray-400'}`} />
                          <div>
                            <p className={`font-medium ${formData.type === type.value ? 'text-green-900' : 'text-gray-900'}`}>
                              {type.label}
                            </p>
                            <p className={`text-sm ${formData.type === type.value ? 'text-green-700' : 'text-gray-500'}`}>
                              {type.description}
                            </p>
                          </div>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Brief description of your inquiry"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-yellow-500 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Send className="h-5 w-5" />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </div>

          {/* Additional Information */}
          <div className="lg:col-span-1">
            <div className="space-y-8">
              {/* FAQ */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">How do I post a job?</h4>
                    <p className="text-sm text-gray-600">Contact us with your job requirements and we'll verify and post it for you.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Are all jobs verified?</h4>
                    <p className="text-sm text-gray-600">Yes, we verify all job postings with the respective organizations.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">How often are jobs updated?</h4>
                    <p className="text-sm text-gray-600">We update job listings daily to ensure fresh opportunities.</p>
                  </div>
                </div>
              </div>

              {/* Response Time */}
              <div className="bg-gradient-to-r from-green-600 to-yellow-500 rounded-xl p-6 text-white">
                <Clock className="h-8 w-8 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Response Time</h3>
                <p className="text-sm">We typically respond to inquiries within 24 hours during business days.</p>
              </div>

              {/* Emergency Contact */}
              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-red-900 mb-2">Urgent Matters</h3>
                <p className="text-sm text-red-700 mb-3">
                  For urgent technical issues or fraudulent job postings:
                </p>
                <p className="text-sm font-medium text-red-900">emergency@dreamswide.et</p>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section (Placeholder) */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Visit Our Office</h3>
          <div className="bg-gray-200 h-64 rounded-xl flex items-center justify-center">
            <p className="text-gray-600">Interactive map would be displayed here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;