// src/components/sideBar.tsx
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import UploadPicture from '@/components/home/uploadPicture';

const Sidebar: React.FC = () => {
    const router = useRouter();

    const handleLogout = () => {
        // Add your logout logic here
        console.log('Logging out...');
        // For example, you can redirect to the login page
        router.push('/login');
    };

    return (
        <div className="fixed top-0 left-0 h-screen w-48 p-4 bg-gray-800 text-white flex flex-col justify-between">
            {/* Site Logo */}
            <div className="flex justify-center mb-8">

            <button
                    className="py-2 px-4 bg-blue-500 hover:bg-blue-700 rounded"
                    onClick={() => router.push('/home')}
                >
                                    <Image src="/hilink-logo.svg" alt="Site Logo" width={100} height={50} />

                </button>

            </div>

            {/* Buttons */}
            <div className="flex flex-col space-y-4">
                <button
                    className="py-2 px-4 bg-blue-500 hover:bg-blue-700 rounded"
                    onClick={() => router.push('/community')}
                >
                    Gallery
                </button>
                <button
                    className="py-2 px-4 bg-green-500 hover:bg-green-700 rounded"
                    onClick={() => router.push('/blog')}
                >
                    Blog
                </button>
            </div>

            {/* User Logo */}
            <div className="flex justify-center mt-8">
                <button onClick={handleLogout}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>

                </button>
            </div>
        </div>
    );
};

export default Sidebar;