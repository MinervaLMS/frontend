export interface API_RegisterRequest {
    firstName: string;
    lastName: string;
    password: string;
    email: string;
}

export interface API_LoginRequest {
    email: string;
    password: string;
}
  
export interface API_ForgotMyPasswordRequest {
    email: string;
}