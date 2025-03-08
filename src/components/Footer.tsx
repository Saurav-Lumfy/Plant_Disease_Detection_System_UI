import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white shadow-lg mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy-policy" className="text-gray-600 hover:text-green-600">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="text-gray-600 hover:text-green-600">Terms of Service</Link></li>
              <li><Link to="/how-it-works" className="text-gray-600 hover:text-green-600">How it Works</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:sauravvarshney0411@gmail.com" className="flex items-center text-gray-600 hover:text-green-600">
                  <Mail className="h-5 w-5 mr-2" />
                  Email
                </a>
              </li>
              <li>
                <a href="https://github.com/Saurav-Lumfy" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-600 hover:text-green-600">
                  <Github className="h-5 w-5 mr-2" />
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/saurav-varshney/" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-600 hover:text-green-600">
                  <Linkedin className="h-5 w-5 mr-2" />
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">About AgroDoc</h3>
            <p className="text-gray-600">
              Your AI-Powered Plant Doctor for instant disease identification and treatment recommendations.
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-600">
            © {new Date().getFullYear()} AgroDoc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer