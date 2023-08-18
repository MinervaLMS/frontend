export interface API_RegisterRequest {
    first_name: string;
    last_name: string;
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
