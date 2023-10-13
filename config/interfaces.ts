import { MATERIAL_TYPES } from './enums'

export interface API_RegisterRequest {
  first_name: string
  last_name: string
  email: string
  password: string
}

export interface API_LoginRequest {
  email: string
  password: string
}

export interface API_ForgotMyPasswordRequest {
  email: string
}

export interface API_PassworReset {
  password: string
}

export interface API_Contact {
  sender_email: string
  sender_name: string
  subject: string
  email_body: string
}

export interface API_CourseObject {
  id: number
  name: string
  alias: string
  description: string | null
}

export interface API_ModuleObject {

  id: number,
  name: string,
  order: number,
  module_total_materials: number,
  module_instructional_materials: number,
  module_assessment_materials: number,
  module_extra_materials: number,
  course_id: string,
  parent_module_id: undefined | number,
}

export interface API_MaterialObject {
  id: number
  name: string
  material_type: MATERIAL_TYPES
  is_extra: boolean
  order: number
  likes: number
  dislikes: number
  total_comments: number
  module_id: number
  attempts: number
  correct_attempts: number
  isCompleted: boolean
}

export interface API_CommentObject {
  id: number
  content: string
  fixed: number
  post_date: string
  user_name: string
  parent_comment_id: number
  replies: Array<API_CommentObject>
}

export interface API_ModuleProgressObject {
  id: number
  user_id: string
  module_id: number
  module_instructional_progress: number
  module_assessment_progress: number
}
