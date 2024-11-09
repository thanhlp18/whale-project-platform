// src/components/sideBar.tsx
import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { CameraIcon, BookOpenIcon, PhotoIcon, UserIcon } from "@heroicons/react/24/solid";
import WhaleButton from "@/components/systemDesign/button";

const getActiveTab = (pathName: string) => {
    if (pathName.includes("community")) {
        return "community";
    }
    if(pathName.includes("blog")) {
        return "blog";
    }
    return "home";
}

const Sidebar: React.FC = () => {
    const router = useRouter();
    const activeTab = getActiveTab(router.pathname);

  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logging out...");
    // For example, you can redirect to the login page
    router.push("/login");
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-24 p-4 flex flex-col justify-between bg-white border-2 border-gray-100">
      {/* Site Logo */}
      <div className="flex justify-start mb-8">
          <button
            className="py-2 px-4 bg-blue-500 hover:bg-blue-700 rounded"
            onClick={() => router.push("/home")}
          >
            <Image
              src="/hilink-logo.svg"
              alt="Site Logo"
              width={50}
              height={25}
            />
          </button>
        </div>

      {/* Buttons */}
      <div className="flex flex-col space-y-4">
        
        <WhaleButton
          variant={activeTab=="home" ? "primary" : "secondary"}
          onClick={() => router.push("/home")}
        >
          <CameraIcon />
        </WhaleButton>
        <WhaleButton
          variant={activeTab=="community" ? "primary" : "secondary"}
          onClick={() => router.push("/community")}
        >
          <PhotoIcon />
        </WhaleButton>
        <WhaleButton variant={activeTab=="blog" ? "primary" : "secondary"} onClick={() => router.push("/blog")}>
          <BookOpenIcon />
        </WhaleButton>
      </div>

      {/* User Logo */}
      <div className="flex justify-center mt-8">

        <WhaleButton variant="text" onClick={() => router.push("/blog")}>
       <UserIcon width={24}/>
        </WhaleButton>
      </div>
    </div>
  );
};

export default Sidebar;
