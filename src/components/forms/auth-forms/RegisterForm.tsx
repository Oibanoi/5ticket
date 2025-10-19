"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { register as registerUser } from "@/services/user";

interface RegisterFormProps {
  onRegisted?: (email: string) => void;
  onLogin?: () => void;
}

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onRegisted, onLogin }) => {
  const t = useTranslations("ModalLogin");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const password = watch("password");

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError("");

    try {
      const result = await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });

      if (result.success) {
        onRegisted?.(data.email);
      } else {
        setError(result.message || t("register_error"));
      }
    } catch (err: unknown) {
      const error = err as Error;
      setError(error.message || t("register_error"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
      {error && (
        <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium">
          {t("full_name")}
        </label>
        <Input
          id="name"
          type="text"
          placeholder={t("full_name_placeholder")}
          {...register("name", {
            required: t("name_required"),
            minLength: {
              value: 2,
              message: t("name_min_length"),
            },
          })}
          className={cn(errors.name && "border-red-500")}
          disabled={isLoading}
        />
        {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium">
          {t("email")}
        </label>
        <Input
          id="email"
          type="email"
          placeholder={t("email_placeholder")}
          {...register("email", {
            required: t("email_required"),
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: t("email_invalid"),
            },
          })}
          className={cn(errors.email && "border-red-500")}
          disabled={isLoading}
        />
        {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-medium">
          {t("password")}
        </label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder={t("password_placeholder")}
            {...register("password", {
              required: t("password_required"),
              minLength: {
                value: 6,
                message: t("password_min_length"),
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                message: t("password_pattern"),
              },
            })}
            className={cn(errors.password && "border-red-500", "pr-10")}
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="confirmPassword" className="block text-sm font-medium">
          {t("confirm_password")}
        </label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder={t("confirm_password_placeholder")}
            {...register("confirmPassword", {
              required: t("confirm_password_required"),
              validate: (value) => value === password || t("password_not_match"),
            })}
            className={cn(errors.confirmPassword && "border-red-500", "pr-10")}
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            tabIndex={-1}
          >
            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? t("registering") : t("register")}
      </Button>

      <div className="text-center text-sm mt-4">
        <span className="text-gray-600">{t("have_account")} </span>
        <button
          type="button"
          onClick={onLogin}
          className="text-primary font-medium hover:underline"
        >
          {t("login_now")}
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
