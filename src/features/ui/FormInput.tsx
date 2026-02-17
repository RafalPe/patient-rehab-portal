import React, { InputHTMLAttributes } from "react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string[] | string;
  variant?: "default" | "auth" | "authPurple";
}

const variantStyles = {
  default:
    "rounded-md border border-slate-300 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500",
  auth: "rounded-lg border border-slate-300 py-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20",
  authPurple:
    "rounded-lg border border-slate-300 py-2.5 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20",
};

export const FormInput = ({
  label,
  error,
  variant = "default",
  className = "",
  id,
  ...props
}: FormInputProps) => {
  const baseInputStyles =
    "w-full px-3 text-slate-800 shadow-sm placeholder:text-slate-400 focus:outline-none";

  const combinedClassName =
    `${baseInputStyles} ${variantStyles[variant]} ${className}`.trim();

  const inputId = id || props.name;

  return (
    <div className="w-full">
      <label
        htmlFor={inputId}
        className="mb-1 block text-sm font-medium text-slate-700"
      >
        {label}
      </label>
      <input id={inputId} className={combinedClassName} {...props} />
      {error && (
        <p className="mt-1 text-xs text-red-500">
          {Array.isArray(error) ? error[0] : error}
        </p>
      )}
    </div>
  );
};
