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

export interface API_CourseObject {
  id: number,
  name: string,
  alias: string,
  description: string | null,
}

export interface API_ModuleObject {
  id: number,
  name: string,
  order: number,
  course_id: string,
}

export interface API_MaterialObject {
  id: number,
  name: string,
  material_type: string,
  is_extra: boolean,
  order: number,
  likes: number,
  dislikes: number,
  total_comments: number,
  module_id: number
}

export interface API_CommentObject {
  id: number,
  content: string,
  fixed: number,
  post_date: string,
  user_name: string,
  parent_comment_id: number,
  replies: Array<API_CommentObject>,
}