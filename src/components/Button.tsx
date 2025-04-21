// src/components/Button.tsx
import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "danger" | "success";
  disabled?: boolean;
};

const Button = ({
  children,
  onClick,
  variant = "primary",
  disabled,
}: ButtonProps) => {
  const base = "px-4 py-2 rounded text-white font-semibold transition";
  const styles = {
    primary: "bg-blue-600 hover:bg-blue-700",
    danger: "bg-red-600 hover:bg-red-700",
    success: "bg-green-600 hover:bg-green-700",
  };

  return (
    <button
      onClick={onClick}
      className={`${base} ${styles[variant]} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
