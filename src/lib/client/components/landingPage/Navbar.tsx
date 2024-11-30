import { signIn } from "next-auth/react";
import Image from "next/image";
import Button from "./Button";
import { env } from "@/env.mjs";
import { routeMap } from "@/auth/utils/routeMap";
import WhaleButton from "@/lib/client/components/systemDesign/button";
import { useAuthContext } from "@/lib/client/context/authContext";
import { useRouter } from "next/router";

const Navbar = () => {
  const { authenticated } = useAuthContext();
  const router = useRouter();

  return (
    <header className="fixed w-full z-10 shadow-sm">
      <nav className="bg-white border-gray-200 py-2.5 className=">
        <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
          <a href="#" className="flex items-center">
            <img
              src="/designSystem/keyVisual.svg"
              className="h-6 mr-1 sm:h-9"
              alt="Landwind Logo"
            />
            <span className="self-center mt-2 text-md tracking-tighter	 font-bold whitespace-nowrap">
              WHALE PROJECT
            </span>
          </a>
          <div className="flex items-center lg:order-2">
            <WhaleButton
              onClick={() => {
                router.push(
                  authenticated ? routeMap.login.home : routeMap.login.loginPage
                );
              }}
            >
              {authenticated ? "Start" : "Login"}
            </WhaleButton>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
