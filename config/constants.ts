// Objective: Constants for the application.

// Constant for api conection.
export const API_URL: string = "https://minerva-api-4t0g.onrender.com";

export const API_ENDPOINTS = {
  REGISTER: `${API_URL}/register/`,
  LOGIN: `${API_URL}/login/`,
  FORGOT_MY_PASSWORD: `${API_URL}/forgot-my-password/`,
};

// Constants for user registration.
export const PASSWORD_MIN_LENGTH: number = 8;

// Constants for user roles.
export enum ROLES {
  ADMIN = "admin",
  USER = "user",
}

export interface API_LoginRequest {
  email: string;
  password: string;
}

export interface API_ForgotMyPasswordRequest {
  email: string;
}