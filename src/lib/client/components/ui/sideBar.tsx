// src/components/sideBar.tsx
import React from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import {
  CameraIcon,
  BookOpenIcon,
  PhotoIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/solid";
import WhaleButton from "@/components/systemDesign/button";

const getActiveTab = (pathName: string) => {
  if (pathName.includes("community")) {
    return "community";
  }
  if (pathName.includes("blogs")) {
    return "blogs";
  }
  return "home";
};

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
        <button className=" rounded" onClick={() => router.push("/home")}>
          <img
            src="/designSystem/keyVisual.svg"
            alt="Site Logo"
            className="w-full"
          />
        </button>
      </div>

      {/* Buttons */}
      <div className="flex flex-col space-y-4">
        <WhaleButton
          variant={activeTab == "home" ? "primary" : "secondary"}
          onClick={() => router.push("/home")}
        >
          <CameraIcon />
        </WhaleButton>
        <WhaleButton
          variant={activeTab == "community" ? "primary" : "secondary"}
          onClick={() => router.push("/community")}
        >
          <PhotoIcon />
        </WhaleButton>
        <WhaleButton
          variant={activeTab == "blogs" ? "primary" : "secondary"}
          onClick={() => router.push("/blogs")}
        >
          <BookOpenIcon />
        </WhaleButton>
      </div>

      {/* User Logo */}
      <div className="flex justify-center mt-8 ">
        <div className="tooltip" data-tip="Logout">
          <WhaleButton
            variant="text"
            onClick={() => {
              signOut({
                callbackUrl: "/",
              });
            }}
          >
            <ArrowLeftStartOnRectangleIcon width={24} />
          </WhaleButton>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
