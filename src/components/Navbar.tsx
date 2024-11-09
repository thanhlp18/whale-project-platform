import { signIn } from "next-auth/react";
import Image from "next/image";
import Button from "./landingPage/Button";
import { routeMap } from "@/auth/utils/routeMap";
import { env } from "@/env.mjs";

const Navbar = () => {
  const handleWithGoogle = async (e: React.MouseEvent<HTMLButtonElement>) => {
    signIn("google", {
      redirect: true,
      callbackUrl: `${env.NEXT_PUBLIC_APP_URL}${routeMap.login.home}`,
    })
  }

  return (
    <nav className=" flexBetween max-container padding-container relative z-30 py-5">
      <a href={env.NEXT_PUBLIC_APP_URL}>
        <Image src="hilink-logo.svg" alt="logo" width={74} height={29} />
      </a>
      <Button
        onClick={handleWithGoogle}
        type="button"
        title="Login"
        icon="/user.svg"
        variant="btn_dark_green"
      />
    </nav>
  );
};

export default Navbar;
