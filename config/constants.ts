// Constants for user registration.
export const PASSWORD_MIN_LENGTH: number = 8;

// Constants for alert messages.
export const AUTOHIDE_ALERT_DURATION: number = 3000;

// Constants for FAQs.
export const FAQS: {
  question: string;
  answer: string;
}[] = [
  {
    question: "¿Qué debo hacer si olvidé mi contraseña?",
    answer:
      "Si olvidaste tu contraseña, puedes restablecerla fácilmente haciendo clic en el enlace 'Olvide mi contraseña' en la página de inicio de sesión. Te proporcionaremos instrucciones para restablecer tu contraseña a través del correo electrónico asociado a tu cuenta.",
  },
  {
    question: "¿Cómo soluciono problemas de carga de contenido del curso?",
    answer:
      "Si estás experimentando problemas al cargar el contenido del curso, asegúrate de tener una conexión a internet estable. También puedes intentar borrar la caché y las cookies de tu navegador. Si el problema persiste, ponte en contacto con nuestro equipo de soporte técnico.",
  },
  {
    question: "¿Por qué no puedo ver los videos del curso?",
    answer:
      "Si los videos del curso no se están reproduciendo correctamente, asegúrate de tener la última versión de Adobe Flash Player instalada en tu navegador. Si el problema persiste, intenta utilizar un navegador diferente o verificar si hay bloqueadores de anuncios o extensiones que puedan estar interfiriendo con la reproducción de video.",
  },
  {
    question: " ¿Cómo resuelvo problemas con las evaluaciones en línea?",
    answer:
      "Si estás teniendo dificultades al completar las evaluaciones en línea, asegúrate de seguir las instrucciones proporcionadas en el curso.Intenta actualizar la página o usar un navegador diferente. Si los problemas persisten, comunica al instructor o ponte en contacto con el soporte técnico para obtener ayuda adicional.",
  },
];

// Constants for user settings menu
export const USER_SETTINGS: Array<string> = ["Cuenta"];

// Constants for course navigation
export const DRAWER_WIDTH: number = 240;

export const COURSE_OPTIONS: Array<{ title: string; route: string }> = [
  { title: "Posiciones", route: "/positions" },
  { title: "Calificaciones", route: "/grades" },
  { title: "Syllabus", route: "/syllabus" },
  { title: "Foro", route: "/forum" },
];
