export interface API_RegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface API_LoginRequest {
    email: string;
    password: string;
}
  
export interface API_ForgotMyPasswordRequest {
    email: string;
}

export interface API_PassworReset{
    password: string;
}