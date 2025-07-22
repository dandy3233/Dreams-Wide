import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-gradient-to-r from-green-600 to-yellow-500 p-2 rounded-xl">
                <Star className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Dreams Wide</h3>
                <p className="text-gray-400">Your Daily Digest of Work and Wisdom</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Ethiopia's go-to source for verified jobs and vibrant culture. Connecting ambition with opportunity through trusted listings and inspiring cultural content.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/jobs" className="text-gray-400 hover:text-green-400 transition-colors">Job Listings</Link></li>
              <li><Link to="/culture" className="text-gray-400 hover:text-green-400 transition-colors">Cultural Content</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-green-400 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-green-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-green-400" />
                <span className="text-gray-400">Addis Ababa, Ethiopia</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-green-400" />
                <span className="text-gray-400">info@dreamswide.et</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-green-400" />
                <span className="text-gray-400">+251 11 xxx xxxx</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Dreams Wide. All rights reserved. Built with pride for Ethiopia.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;