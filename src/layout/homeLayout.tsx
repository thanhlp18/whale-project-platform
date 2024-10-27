// src/components/Layout.tsx
import Footer from '@/components/landingPage/Footer';
import Navbar from '@/components/landingPage/Navbar';
import Sidebar from '@/components/ui/sideBar'; // Import the Sidebar component
import React from 'react';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-grow">
        {/* Sidebar */}
        <Sidebar />
        {/* Main Content */}
        <div className="flex-grow max-w-7xl mx-auto p-4 ml-48">
          <main className="relative overflow-hidden">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;