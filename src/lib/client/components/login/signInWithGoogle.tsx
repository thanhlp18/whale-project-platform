import WhaleButton from "@/lib/client/components/systemDesign/button";
import { signIn } from "next-auth/react";
import React from "react";
import { FaGoogle } from "react-icons/fa";

type Props = {
  callbackUrl: string;
  handleSignIn?: () => void;
};

export default function SignInWithGoogle({ callbackUrl, handleSignIn }: Props) {
  const handleWithGoogle = () => {
    handleSignIn && handleSignIn();
    signIn("google", {
      redirect: false,
      callbackUrl,
    });
  };

  return (
    <WhaleButton
    variant="primary"
      className="flex px-4 py-1 justify-center items-center gap-3 w-full rounded-full"
      onClick={() => {
        handleWithGoogle();
      }}
    >
      <FaGoogle />
      <p className="text-center font-sans text-base font-semibold leading-5">
        Continue with Google
      </p>
    </WhaleButton>
  );
}
