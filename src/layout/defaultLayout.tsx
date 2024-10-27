// src/components/Layout.tsx
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import React from 'react';

type LayoutProps = {
    children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
    console.log("run")
    return (
        <div >
            <Navbar />
            <main className="relative overflow-hidden">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;