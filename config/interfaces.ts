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

export interface API_PassworReset {
  password: string;
}

export interface API_Contact {
  sender_email: string;
  sender_name: string;
  subject: string;
  email_body: string;
}

export interface API_MaterialObject {
  id: number,
  name: string,
  material_type: string,
  is_extra: boolean,
  order: number,
  module_id: number
}

export interface API_CourseObject {
  id: number,
  name: string,
  alias: string,
  description: string | null,
  modules?: API_ModuleObject[]
}

export interface API_ModuleObject {
  id: number,
  name: string,
  course_id: string,
  description: string
}