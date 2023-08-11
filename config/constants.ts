// Objective: Constants for the application.

// Constant for api conection.
export const API_URL: string = "https://minerva-api-4t0g.onrender.com";

export const API_ENDPOINTS = {
  REGISTER: `${API_URL}/register/`,
};

// Constants for user registration.
export const PASSWORD_MIN_LENGTH: number = 8;

// Constants for user roles.
export enum ROLES {
  ADMIN = "admin",
  USER = "user",
}
