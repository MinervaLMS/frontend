// Constant for api conection.
export const API_URL: string = "https://minerva-api-4t0g.onrender.com";

export const API_ENDPOINTS = {
  REGISTER: `${API_URL}/register/`,
  LOGIN: `${API_URL}/login/`,
  FORGOT_MY_PASSWORD: `${API_URL}/forgot-my-password/`,
  PASSWORD_RESET: `${API_URL}/password-reset/`,
  CONFIRM_ACCOUNT: `${API_URL}/register/confirm/`,
  CONTACT: `${API_URL}/contact/`,
};

export const API_STATUS_CODE = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
};
