// src/components/Layout.tsx
import Footer from "@/components/landingPage/Footer";
import Navbar from "@/components/landingPage/Navbar";
import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  console.log("run");
  return (
    <div>
      <main className="relative overflow-hidden">{children}</main>
    </div>
  );
};

export default Layout;
