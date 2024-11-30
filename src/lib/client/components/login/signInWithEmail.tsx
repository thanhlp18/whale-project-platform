import { env } from "@/env.mjs";
import WhaleButton from "@/lib/client/components/systemDesign/button";
import { EmailProvider, useEmail } from "@/lib/client/context/emailContext";
import { Button, Form, Input, Spin, Typography, message } from "antd";
import { useForm, useWatch } from "antd/es/form/Form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function SignInWithEmail({
  callbackUrl,
  handleSignIn,
  handleBack,
}: {
  callbackUrl: string;
  handleSignIn?: () => void;
  handleBack?: () => void;
}) {
  const [step, setStep] = useState(0);

  return (
    <EmailProvider>
      {step == 0 ? (
        <InputEmailForm
          callbackUrl={callbackUrl}
          onNextStep={() => {
            handleSignIn && handleSignIn();
            setStep(2);
          }}
        />
      ) : (
        <VerifyEmailForm
          callbackUrl={callbackUrl}
          onBackPreviousStep={() => {
            handleBack && handleBack();
            setStep(0);
          }}
        />
      )}
    </EmailProvider>
  );
}

const InputEmailForm = ({
  callbackUrl,
  onNextStep,
}: {
  callbackUrl: string;
  onNextStep: () => void;
}) => {
  const router = useRouter();
  const { setEmail } = useEmail();

  const [formInputEmail] = useForm<{ email: string }>();
  const { error } = router.query;
  const [initialError, setInitialError] = useState(error);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignInWithEmail = async ({ email }: { email: string }) => {
    setIsLoading(true);
    const result: any = await signIn("email", {
      email: email,
      redirect: false,
      callbackUrl,
    });

    if (!!result.ok && result.error === null) {
      setIsLoading(false);
      onNextStep();
      setEmail(email);
    } else {
      message.error("There was an error during login process");
    }
  };

  const checkEmail = async (_: any, email: string) => {
    const expression = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const result = expression.test(email);

    if (!result && (initialError === undefined || initialError === "")) {
      return Promise.reject(new Error("Invalid email format"));
    }

    if (typeof initialError !== "undefined" && initialError !== "") {
      return Promise.reject(
        new Error("Cannot verify your email to login. Please try again.")
      );
    }

    return Promise.resolve();
  };

  return (
    <Form
      name="loginForm"
      form={formInputEmail}
      className="flex flex-col items-center gap-3 w-full"
      onFinish={handleSignInWithEmail}
      initialValues={{
        email: "",
      }}
    >
      <div className="flex flex-col items-center gap-1 w-full">
        <div className="flex flex-col items-start  w-80">
          <div
            className="flex flex-col items-start gap-2 w-full"
            onMouseLeave={() => {
              if (!!formInputEmail.getFieldValue("email")) {
                formInputEmail.validateFields(["email"]);
              }
            }}
          >
            <Form.Item
              id="email"
              name="email"
              className="w-full mb-0 gap-3"
              rules={[
                {
                  validator: checkEmail,
                  validateTrigger: ["onBlur"],
                },
              ]}
            >
              <Input
                type="text"
                name="email"
                placeholder="Enter your email"
                className="flex h-10 px-3 py-2 w-full text-lg font-sans"
                allowClear
              />
            </Form.Item>
          </div>
        </div>
      </div>
      <WhaleButton
        type="submit"
        disabled={isLoading}
        variant={isLoading ? "disabled" : "primary"}
        className={`flex  w-80 px-4 py-1 justify-center items-center gap-2 w-full rounded-full`}
      >
        <>
          {isLoading && (
            <span className="loading loading-spinner loading-sm"></span>
          )}
          <p className={`text-center text-base font-bold leading-5 `}>
            Continue
          </p>
        </>
      </WhaleButton>
    </Form>
  );
};

const VerifyEmailForm = ({
  callbackUrl,
  onBackPreviousStep,
}: {
  callbackUrl: string;
  onBackPreviousStep: () => void;
}) => {
  const { email } = useEmail();
  const [formVerify] = useForm<{ email: string; code: string }>();
  const expression: RegExp = /^[0-9]{4}$/i;

  const checkCode = async (_: any, code: string) => {
    const result: boolean = expression.test(code);
    if (!result) return Promise.reject(new Error("invalid code format"));
    return Promise.resolve();
  };

  const onFinish = async ({ code }: { code: string }) => {
    if (typeof window !== "undefined" && email) {
      await fetch(
        `${
          env.NEXT_PUBLIC_APP_URL
        }/api/auth/callback/email?callbackUrl=${encodeURIComponent(
          callbackUrl
        )}&token=${code}&email=${encodeURIComponent(email)}`,
        {
          headers: {
            "ptp-user-type": "candidate",
          },
        }
      )
        .then((res) => {
          if (res.url) {
            if (res.url.includes("error")) {
              formVerify.setFields([
                {
                  name: "code",
                  errors: ["Invalid verification code"],
                },
              ]);
            } else {
              window.location.href = res.url;
            }
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  };

  const [isResendDisabled, setIsResendDisabled] = useState(false);

  useEffect(() => {
    if (isResendDisabled) {
      const timer = setTimeout(() => {
        setIsResendDisabled(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isResendDisabled]);

  const onResendEmail = async () => {
    const result: any = await signIn("email", {
      email: email,
      redirect: false,
      callbackUrl,
    });

    if (!!result.ok && result.error === null) {
      message.success("Email sent");
    } else {
      message.error("There was an error during login process");
    }
  };

  const isInputCode = expression.test(useWatch("code", formVerify));

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-9 w-full px-6 max-w-lg">
        <div className="flex flex-col items-center gap-3 w-120">
          <div className="flex flex-col justify-center items-center">
            <span className="text-center text-gray-500 text-base font-normal leading-5">
              Verification code sent to your inbox
            </span>
            <span className="text-center text-gray-700 text-base font-bold leading-5">
              {email}
            </span>
          </div>

          <WhaleButton
            onClick={() => {
              onResendEmail();
              setIsResendDisabled(true);
            }}
            variant="text"
            disabled={isResendDisabled}
            className="flex   w-80 px-4 justify-center items-center gap-2 h-5 text-bg-primary-80"
          >
            <p
              className={`text-center text-base font-bold leading-5 ${
                false ? "text-gray-400!" : "text-bg-primary-80!"
              }`}
            >
              Resend
            </p>
          </WhaleButton>
          <span className="text-center text-gray-400 text-base font-normal leading-5">
            (If you don't see the code, check Spam folder)
          </span>
        </div>
        <Form
          form={formVerify}
          className="flex  w-80 flex-col items-start gap-3 w-60"
          onFinish={onFinish}
          initialValues={{ email, code: "" }}
        >
          <div className="flex flex-col items-center w-full">
            <div className="flex flex-col items-start w-full">
              <div
                className="flex flex-col items-start gap-2 w-full"
                onMouseLeave={() => {
                  if (!!formVerify.getFieldValue("code")) {
                    formVerify.validateFields(["code"]);
                  }
                }}
              >
                <Form.Item
                  id="code"
                  name="code"
                  className="w-full mb-0 gap-3"
                  rules={[
                  {
                    validator: checkCode,
                    message: (
                    <div className="flex justify-center items-end w-full">
                      <p className="h-6 flex-1 text-red-500 text-base font-normal leading-5">
                      Invalid verification code
                      </p>
                    </div>
                    ),
                    validateTrigger: ["onBlur"],
                  },
                  ]}
                >
                  <Input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  name="code"
                  placeholder="Enter 4-digit code"
                  className="flex h-10 px-3 py-2 w-full rounded-lg text-lg leading-6 font-sans focus-visible:outline-primary-80"
                  allowClear
                  />
                </Form.Item>
              </div>
            </div>
          </div>

          <WhaleButton
            disabled={!isInputCode}
            variant={isInputCode ? "primary" : "disabled"}
            className={`flex w-full h-8 px-4 py-1 justify-center items-center gap-2 rounded-full ${
              !isInputCode ? "bg-gray-300 border-none" : ""
            }`}
            type="submit"
          >
            <p
              className={`text-center text-base font-bold leading-5 ${
                !isInputCode ? "text-gray-400" : ""
              }`}
            >
              Sign in
            </p>
          </WhaleButton>
        </Form>
      </div>
      <div className="flex justify-center">
        <WhaleButton
          variant="text"
          onClick={() => {
            onBackPreviousStep();
          }}
          className="text-gray-400  w-80 text-center text-sm font-bold leading-4 h-6 px-4"
        >
          Back
        </WhaleButton>
      </div>
    </>
  );
};
