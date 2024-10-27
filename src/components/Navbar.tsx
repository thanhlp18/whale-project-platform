import { signIn } from "next-auth/react";
import Image from "next/image";
import Button from "./Button";

const Navbar = () => {
  const handleWithGoogle = async (e: React.MouseEvent<HTMLButtonElement>) => {
    signIn("google", {
      redirect: false,
      callbackUrl: 'http://localhost:3000/'
    })
  }

  return (
    <nav className=" flexBetween max-container padding-container relative z-30 py-5">
      <a href="http://localhost:3000/">
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
