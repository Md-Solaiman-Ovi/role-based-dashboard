// src/components/Input.tsx
import React from "react";

type InputProps = {
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  name?: string;
};

const Input = ({ label, value, onChange, type = "text", name }: InputProps) => (
  <div className="mb-4">
    {label && <label className="block text-sm font-medium mb-1">{label}</label>}
    <input
      type={type}
      name={name}
      placeholder={`Enter ${name}`}
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

export default Input;
