
import { Link } from 'react-router-dom';
import {  MapPin, Phone, Mail } from 'lucide-react';
import { bodyCheckLogoLight } from '../assets/images';

export function Footer() {
  return (
    <footer className="bg-cloud-burst ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
             <img style={{width:'250px'}} src={bodyCheckLogoLight} alt="" />
            </div>
            <p className="text-white mb-4 max-w-md">
            AI opportunistic screening and care coordination for Cardiovascular and Metabolic diseases
            </p>
            {/* <div className="space-y-2 text-sm text-white ">
              <div className="flex items-center space-x-2 hover:text-bright-turquoise">
                <MapPin className="w-4 h-4" />
                <span>123 Medical Center Drive, San Francisco, CA 94110</span>
              </div>
              <div className="flex items-center space-x-2 hover:text-bright-turquoise">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 hover:text-bright-turquoise">
                <Mail className="w-4 h-4" />
                <span>contact@bodycheck</span>
              </div>
            </div> */}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-turquoise">Quick Links</h3>
            <ul className="space-y-2 text-sm text-white">
              <li><Link to="/demo-dashboard" className="hover:text-bright-turquoise transition-colors">Demo Dashboard</Link></li>
              <li><Link to="/sample-report" className="hover:text-bright-turquoise transition-colors">Sample Report</Link></li>
              {/* <li><Link to="/ai-pipeline" className="hover:text-bright-turquoise transition-colors">AI Pipeline</Link></li>
              <li><Link to="/documentation" className="hover:text-bright-turquoise transition-colors">Documentation</Link></li> */}
              <li><Link to="/contact" className="hover:text-bright-turquoise transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4 text-turquoise">Legal</h3>
            <ul className="space-y-2 text-sm text-white">
              {/* <li><Link to="/privacy" className="hover:text-bright-turquoise transition-colors">Privacy Policy</Link></li> */}
              <li><Link to="/terms" className="hover:text-bright-turquoise transition-colors">Terms of Use</Link></li>
              {/* <li><Link to="/disclaimer" className="hover:text-bright-turquoise transition-colors">AI Disclaimer</Link></li> */}
            </ul>
          </div>
        </div>

        {/* <div className="border-t border-jacarta mt-8 pt-8 text-center text-sm text-turquoise">
          <p>&copy; 2024 BodyCheck . All rights reserved. This platform is for research and educational purposes only. Not for diagnostic use.</p>
        </div> */}
      </div>
    </footer>
  );
}