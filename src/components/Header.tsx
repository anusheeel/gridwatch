import React from 'react';
import { Bell, Settings, User } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-slate-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">Grid Monitor</h1>
          <nav className="hidden md:flex space-x-6">
            <a href="#dashboard" className="hover:text-blue-300">Dashboard</a>
            <a href="#map" className="hover:text-blue-300">Map View</a>
            <a href="#assets" className="hover:text-blue-300">Assets</a>
            <a href="#analytics" className="hover:text-blue-300">Analytics</a>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-slate-700 rounded-full relative">
            <Bell className="w-6 h-6" />
            <span className="absolute top-0 right-0 bg-red-500 text-xs rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </button>
          <button className="p-2 hover:bg-slate-700 rounded-full">
            <Settings className="w-6 h-6" />
          </button>
          <button className="p-2 hover:bg-slate-700 rounded-full">
            <User className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
}