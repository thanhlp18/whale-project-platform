// src/components/WhaleButton.tsx
import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "outline" | "disabled" | "text" | "secondary";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
};

const WhaleButton: React.FC<ButtonProps> = ({
  children,
  type = "button",
  variant = "primary",
  onClick,
  className = "",
  disabled
}) => {
  const baseStyles =
    "py-2 px-4 rounded-lg font-semibold focus:outline-none transition duration-200";
  const primaryStyles =
    "pointer bg-primary-100 text-white hover:bg-primary-80 active:bg-primary-100";
  const outlineStyles =
    "border-2 border-primary-100 text-primary-100 hover:bg-primary-100 hover:text-white active:bg-primary-200 active:text-white";
  const disabledStyles =
    "bg-gray-100 border-2 border-gray-200 text-gray-400 hover:bg-primary-80 active:bg-primary-100 active:text-white hover:border-primary-100 hover:text-white active:border-primary-100";
  const textStyles =
    "pointer bg-transparent  text-gray-400  hover:text-primary-80 active:text-primary-100";
  const secondaryStyles =
    "cursor-pointer bg-white w-full py-2 px-4 border-2 border-gray-200 rounded-lg text-primary-80 hover:text-primary-100 active:text-primary-100 font-semibold focus-visible:outline-primary-40";

  const styles = `${baseStyles} ${
    variant === "primary"
      ? primaryStyles
      : variant === "outline"
      ? outlineStyles
      : variant === "disabled"
      ? disabledStyles
      : variant === "secondary"
      ? secondaryStyles
      : textStyles
  } ${className}`;

  return (
    <button type={type} onClick={onClick} className={styles} disabled={disabled}>
      {children}
    </button>
  );
};

export default WhaleButton;