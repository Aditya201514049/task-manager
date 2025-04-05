import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-white transition-colors duration-200 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-center">
          <div className="flex flex-wrap gap-6 justify-center">
            <Link 
              to="/about" 
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              About
            </Link>
            <Link 
              to="/faqs" 
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              FAQs
            </Link>
            <Link 
              to="/terms" 
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              Terms
            </Link>
            <Link 
              to="/privacy" 
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
        
        <div className="border-t border-gray-700 dark:border-gray-800 mt-4 pt-4 text-center text-sm text-gray-400">
          <p>&copy; {currentYear} Task Manager. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 