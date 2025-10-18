import { get, post, put } from "@/lib/api/fetcher";
import { User as UserData } from "next-auth";
import type { AxiosRequestConfig } from "axios";

interface LoginResponse {
  user_id: number;
  access_token: string;
  role: {
    id: number;
    name: "ROLE_NORMAL_USER";
    newRolePermissions: [];
  };
  email: null;
  username: string;
}

interface PayloadRegister {
  password: string;
  confirmPassword: string;
  name: string;
  email: string;
  isRunner?: boolean;
  passwordValid?: boolean;
  confirmPasswordMatch?: boolean;
}

interface UserUpdatePayload {
  name?: string;
  email?: string;
  phone?: string;
  [key: string]: unknown;
}

interface UserByEmailResponse {
  id: number;
  email: string;
  name: string;
  [key: string]: unknown;
}

// config is for axios config
export function login(data: { email: string; password: string }, configs?: AxiosRequestConfig) {
  return post<LoginResponse>("/login", data, configs);
}

export function loginWithGoogle(token: string) {
  return post<LoginResponse>(`/auth/google/login`, null, { params: { token } });
}

export function register(payload: PayloadRegister, configs?: AxiosRequestConfig) {
  return post("/register", payload, configs);
}

export function getUserInfo(config?: AxiosRequestConfig) {
  return get<UserData>("/users/user-info", config);
}

export function updateUserInfo(
  userId: number,
  payload: UserUpdatePayload,
  config?: AxiosRequestConfig
) {
  return put<UserData>(`/users/${userId}`, payload, config);
}

export function logout(config?: AxiosRequestConfig) {
  return post<{ message: string }>("/logout", undefined, config);
}

export function forgot(email: string) {
  return post<{ message: string }>("/forgot", null, { params: { email } });
}

export function reset(payload: {
  otp: string;
  email: string;
  new_password: string;
  new_password_confirm: string;
}) {
  return post<{ message: string }>("/reset", payload);
}

export function getUserByEmail(email: string) {
  return get<UserByEmailResponse>(`/partner/user/find`, { params: { email } });
}
