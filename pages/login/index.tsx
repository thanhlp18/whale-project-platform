import { routeMap } from "@/auth/utils/routeMap";
import { env } from "@/env.mjs";
import LoginLayout from "@/layout/loginLayout";
import { VerifyEmailIllustration } from "@/lib/client/components/illustration/verifyEmailIllustration";
import SignInWithEmail from "@/lib/client/components/login/signInWithEmail";
import SignInWithGoogle from "@/lib/client/components/login/signInWithGoogle";
import { signIn } from "next-auth/react";
import { useState } from "react";

const callbackUrl = `${env.NEXT_PUBLIC_APP_URL}${routeMap.login.home}`;

export default function SignInStep() {
  const [signInType, setSignInType] = useState<string | null>(null);

  return (
    <LoginLayout>
      <div className="flex flex-col items-center justify-center gap-9 px-6 h-screen bg-white">
        <div className="flex flex-col items-center gap-6 w-full">
          <img 
          src="/designSystem/keyVisual.svg"
          width={100}
          height={100}
          />
          <span className="text-center text-gray-900 text-2xl font-semibold leading-8 w-full">
            Sign in to Whale Project
          </span>
        </div>
        <div className="flex flex-col justify-center items-center gap-6 max-w-md">
          {signInType !== "ON_VERIFY_EMAIL" && (
            <div className="flex flex-col gap-3  w-80">
              <SignInWithGoogle
                callbackUrl={callbackUrl}
                handleSignIn={() => {
                  setSignInType("GOOGLE");
                  signIn("google", {
                    redirect: false,
                    callbackUrl,
                  });
                }}
              />
            </div>
          )}

          {signInType !== "ON_VERIFY_EMAIL" && (
            <div className="flex justify-center items-center gap-2 h-5 w-80">
              <div className="flex w-36 h-px bg-gray-300"></div>
              <p className="text-center text-gray-500 text-base font-normal leading-5">
                or
              </p>
              <div className="flex w-36 h-px bg-gray-300"></div>
            </div>
          )}

          <SignInWithEmail
            callbackUrl={callbackUrl}
            handleSignIn={() => {
              setSignInType("ON_VERIFY_EMAIL");
            }}
            handleBack={() => setSignInType(null)}
          />
        </div>
        <div className="flex justify-center items-center gap-2 w-120 pt-3 border-t border-dashed border-gray-400">
          <p className="text-center text-gray-500 text-xs font-normal leading-4">
            By joining in, you agree with our Terms of Service and Privacy
            Policy
          </p>
        </div>
      </div>
    </LoginLayout>
  );
}
