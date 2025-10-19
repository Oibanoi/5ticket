"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { forgot, reset } from "@/services/user";

interface ResetPasswordFormProps {
  onReseted?: () => void;
  onBack?: () => void;
}

interface ForgotFormData {
  email: string;
}

interface ResetFormData {
  otp: string;
  newPassword: string;
  confirmPassword: string;
}

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ onReseted, onBack }) => {
  const t = useTranslations("ModalLogin");
  const [step, setStep] = useState<"forgot" | "reset">("forgot");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const {
    register: registerForgot,
    handleSubmit: handleSubmitForgot,
    formState: { errors: forgotErrors },
  } = useForm<ForgotFormData>();

  const {
    register: registerReset,
    handleSubmit: handleSubmitReset,
    watch,
    formState: { errors: resetErrors },
  } = useForm<ResetFormData>();

  const newPassword = watch("newPassword");

  const onSubmitForgot = async (data: ForgotFormData) => {
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const result = await forgot(data.email);

      if (result.success) {
        setEmail(data.email);
        setSuccess(t("reset_email_sent"));
        setStep("reset");
      } else {
        setError(result.message || t("forgot_error"));
      }
    } catch (err: unknown) {
      const error = err as Error;
      setError(error.message || t("forgot_error"));
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitReset = async (data: ResetFormData) => {
    setIsLoading(true);
    setError("");

    try {
      const result = await reset({
        email,
        otp: data.otp,
        new_password: data.newPassword,
        new_password_confirm: data.confirmPassword,
      });

      if (result.success) {
        setSuccess(t("reset_success"));
        setTimeout(() => {
          onReseted?.();
        }, 1500);
      } else {
        setError(result.message || t("reset_error"));
      }
    } catch (err: unknown) {
      const error = err as Error;
      setError(error.message || t("reset_error"));
    } finally {
      setIsLoading(false);
    }
  };

  if (step === "forgot") {
    return (
      <div>
        <div className="mb-6">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t("back_to_login")}
          </button>
          <h2 className="text-2xl font-bold">{t("forgot_password")}</h2>
          <p className="text-gray-600 mt-2">{t("forgot_password_desc")}</p>
        </div>

        <form onSubmit={handleSubmitForgot(onSubmitForgot)} className="space-y-4">
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
              {error}
            </div>
          )}

          {success && (
            <div className="p-3 text-sm text-green-600 bg-green-50 border border-green-200 rounded-md">
              {success}
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
              {...registerForgot("email", {
                required: t("email_required"),
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: t("email_invalid"),
                },
              })}
              className={cn(forgotErrors.email && "border-red-500")}
              disabled={isLoading}
            />
            {forgotErrors.email && (
              <p className="text-sm text-red-600">{forgotErrors.email.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? t("sending") : t("send_reset_code")}
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <button
          type="button"
          onClick={() => setStep("forgot")}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t("back")}
        </button>
        <h2 className="text-2xl font-bold">{t("reset_password")}</h2>
        <p className="text-gray-600 mt-2">
          {t("reset_password_desc")} <strong>{email}</strong>
        </p>
      </div>

      <form onSubmit={handleSubmitReset(onSubmitReset)} className="space-y-4">
        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
            {error}
          </div>
        )}

        {success && (
          <div className="p-3 text-sm text-green-600 bg-green-50 border border-green-200 rounded-md">
            {success}
          </div>
        )}

        <div className="space-y-2">
          <label htmlFor="otp" className="block text-sm font-medium">
            {t("verification_code")}
          </label>
          <Input
            id="otp"
            type="text"
            placeholder={t("verification_code_placeholder")}
            {...registerReset("otp", {
              required: t("otp_required"),
              minLength: {
                value: 6,
                message: t("otp_min_length"),
              },
            })}
            className={cn(resetErrors.otp && "border-red-500")}
            disabled={isLoading}
          />
          {resetErrors.otp && <p className="text-sm text-red-600">{resetErrors.otp.message}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="newPassword" className="block text-sm font-medium">
            {t("new_password")}
          </label>
          <div className="relative">
            <Input
              id="newPassword"
              type={showPassword ? "text" : "password"}
              placeholder={t("password_placeholder")}
              {...registerReset("newPassword", {
                required: t("password_required"),
                minLength: {
                  value: 6,
                  message: t("password_min_length"),
                },
              })}
              className={cn(resetErrors.newPassword && "border-red-500", "pr-10")}
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
          {resetErrors.newPassword && (
            <p className="text-sm text-red-600">{resetErrors.newPassword.message}</p>
          )}
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
              {...registerReset("confirmPassword", {
                required: t("confirm_password_required"),
                validate: (value) => value === newPassword || t("password_not_match"),
              })}
              className={cn(resetErrors.confirmPassword && "border-red-500", "pr-10")}
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
          {resetErrors.confirmPassword && (
            <p className="text-sm text-red-600">{resetErrors.confirmPassword.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? t("resetting") : t("reset_password_submit")}
        </Button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
