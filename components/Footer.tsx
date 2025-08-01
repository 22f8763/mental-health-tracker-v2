 'use client'

import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-gradient-to-r from-white via-indigo-50 to-white py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Logo + Tagline */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-indigo-600">Mental Health Tracker</h2>
          <p className="text-sm text-gray-500 mt-1">Empowering your mind, one journal at a time.</p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 text-gray-600 text-sm font-medium">
          <a href="/journal" className="hover:text-indigo-700 transition">Journal</a>
          <a href="/stats" className="hover:text-indigo-700 transition">Stats</a>
          <a href="/blog" className="hover:text-indigo-700 transition">Blog</a>
          <a href="/contact" className="hover:text-indigo-700 transition">Contact</a>
          <a href="/privacy" className="hover:text-indigo-700 transition">Privacy</a>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4 text-gray-500">
          <a href="https://github.com" target="_blank" className="hover:text-black transition-transform hover:scale-110">
            <FaGithub className="w-5 h-5" />
          </a>
          <a href="https://linkedin.com" target="_blank" className="hover:text-blue-700 transition-transform hover:scale-110">
            <FaLinkedin className="w-5 h-5" />
          </a>
          <a href="https://instagram.com" target="_blank" className="hover:text-pink-500 transition-transform hover:scale-110">
            <FaInstagram className="w-5 h-5" />
          </a>
        </div>

      </div>

      {/* Bottom Text */}
      <div className="mt-8 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} Mental Health Tracker. All rights reserved.
      </div>
    </footer>
  );
}
