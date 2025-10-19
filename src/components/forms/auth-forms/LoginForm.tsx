import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface LoginFormProps {
  onSignedIn?: () => void;
  onRegister?: () => void;
  onForgot?: () => void;
}

interface LoginFormData {
  email: string;
  password: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSignedIn, onRegister, onForgot }) => {
  const t = useTranslations("ModalLogin");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setError(t("login_error"));
      } else if (result?.ok) {
        onSignedIn?.();
      }
    } catch {
      setError(t("login_error"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError("");

    try {
      await signIn("google", {
        callbackUrl: window.location.href,
      });
    } catch {
      setError(t("login_error"));
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

      <div className="flex justify-end">
        <button type="button" onClick={onForgot} className="text-sm text-primary hover:underline">
          {t("forgot_password")}
        </button>
      </div>

      <Button type="submit" className="w-full cursor-pointer" disabled={isLoading}>
        {isLoading ? t("logging_in") : t("login")}
      </Button>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500">{t("or_continue_with")}</span>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full bg-white text-black cursor-pointer"
        onClick={handleGoogleLogin}
        disabled={isLoading}
      >
        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        {t("google_login")}
      </Button>

      <div className="text-center text-sm mt-4">
        <span className="text-gray-600">{t("no_account")} </span>
        <button
          type="button"
          onClick={onRegister}
          className="text-primary font-medium hover:underline"
        >
          {t("register_now")}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
