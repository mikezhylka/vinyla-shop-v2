import { useState } from "react";
import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

interface InputProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  register: UseFormRegister<T>;
  required?: boolean;
  type?: string;
  placeholder?: string;
  error?: FieldError;
}

export default function Input<T extends FieldValues>({
  name,
  label,
  register,
  required,
  type = "text",
  placeholder = " ",
  error,
}: InputProps<T>) {
  const [showPassword, setShowPassword] = useState(false);
  const currentType = type === "password" && showPassword ? "text" : type;

  return (
    <div className="flex flex-col gap-1">
      <label className="px-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-outline">
        {label}
      </label>

      <div className="relative">
        <input
          {...register(name, { required })}
          type={currentType}
          placeholder={placeholder}
          className={`input peer w-full pr-10 ${error ? "border-red-500" : ""}`}
        />

        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-opacity duration-200 opacity-0 peer-focus:opacity-100 peer-[:not(:placeholder-shown)]:opacity-100"
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                <line x1="2" y1="2" x2="22" y2="22" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        )}
      </div>

      {error && <span className="text-red-500 text-xs">{error.message}</span>}
    </div>
  );
}
