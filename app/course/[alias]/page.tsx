"use client";

import React, { useState, useEffect } from "react";

// Import MaterialUI Components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// Import own components
import CircularSpinner from "@/components/common/CircularSpinner";
import CustomSnackbar from "@/components/common/CustomSnackbar";

// Import styles
import styles from "@/styles/Course.module.css";

// Import constants
import { AUTOHIDE_ALERT_DURATION } from "@/config/constants";

// Import icons and images
import { AccountCircle } from "@mui/icons-material";
import Image from "next/image";

// Import redux and router
import { useAppSelector } from "@/redux/hook";
import { useRouter } from "next/navigation";

// Import API
import useCourse from "@/hooks/fetching/useCourse";
import useModulesList from "@/hooks/fetching/useModulesList";
import { API_STATUS_CODE } from "@/config/api-connections";

function CourseHome({ params }: { params: { alias: string } }) {

  // Redux states:
  const userTokens = useAppSelector(
    (state) => state.persistedReducer.userLoginState.tokens
  );

  // States related to the alert component
  const [courseAlertOpen, setCourseAlertOpen] = useState(false);
  const [courseAlertConfig, setCourseAlertConfig] = useState({ message: "", severity: "" });
  const [modulesAlertOpen, setModulesAlertOpen] = useState(false);
  const [modulesAlertConfig, setModulesAlertConfig] = useState({ message: "", severity: "" });

  // States related to the API Fetch
  const { data: courseData, isLoading: courseIsLoading, error: courseError } = useCourse(params.alias, userTokens.access)
  const { isLoading: modulesIsLoading, error: modulesError } = useModulesList(params.alias, userTokens.access)

  // For routing when user the course fetching fails
  const router = useRouter();

  // Event handlers
  const handleCourseAlertOpen = (status: number) => {
    if (status === API_STATUS_CODE.UNAUTHORIZED) {
      setCourseAlertConfig({
        message:
          "La sesión es inválida o ha expirado: Vuelve a iniciar sesión.",
        severity: "error",
      });
      setCourseAlertOpen(true);
    } else if (status === API_STATUS_CODE.NOT_FOUND) {
      setCourseAlertConfig({
        message: "Curso no encontrado.",
        severity: "error",
      });
      setCourseAlertOpen(true);
    } else {
      setCourseAlertConfig({
        message: "Hubo un error. Intentalo de nuevo más tarde.",
        severity: "error",
      });
      setCourseAlertOpen(true);
    }
  };

  const handleCourseAlertClose = (event?: React.SyntheticEvent | Event) => {
    router.push("/");
  };

  const handleModulesAlertOpen = (status: number) => {
    if (status === API_STATUS_CODE.NOT_FOUND) {
      setModulesAlertConfig({
        message: "No hay módulos en este curso.",
        severity: "error",
      });
      setModulesAlertOpen(true);
    } else {
      setModulesAlertConfig({
        message: "Hubo un error al intentar acceder a los módulos. Intentalo de nuevo más tarde.",
        severity: "error",
      });
      setModulesAlertOpen(true);
    }
  };

  const handleModulesAlertClose = (
		event?: React.SyntheticEvent | Event,
		reason?: string
  ) => {
			if (reason === "clickaway") {
			return;
		}
    setModulesAlertOpen(false)
  };

  useEffect(() => {
    if (courseError) {
      handleCourseAlertOpen(Number(courseError.message));
    };

    if (modulesError) {
      handleModulesAlertOpen(Number(modulesError.message));
    };
  }, [courseError, modulesError]);

  if (courseIsLoading || modulesIsLoading) {
    return <CircularSpinner openBackdrop={true} />;
  }

  if (courseError) {
    return (
      <CustomSnackbar
          message={courseAlertConfig.message}
          severity={courseAlertConfig.severity}
          vertical="top"
          horizontal="center"
          autoHideDuration={AUTOHIDE_ALERT_DURATION}
          open={courseAlertOpen}
          onClose={handleCourseAlertClose}
        />
    );
  }

  return (
    <>
      <CustomSnackbar
          message={modulesAlertConfig.message}
          severity={modulesAlertConfig.severity}
          vertical="top"
          horizontal="center"
          autoHideDuration={AUTOHIDE_ALERT_DURATION}
          open={modulesAlertOpen}
          onClose={handleModulesAlertClose}
        />
      <Box component="section" className={styles.courseHomeContainer}>
        <Box component="section" className={styles.courseHomeSection}>
          <Box component="div">
            <Image
              src="/assets/images/course-image.png"
              alt="Course image"
              width={800}
              height={400}
              priority
            />
          </Box>
          <Box component="div" paddingTop={2}>
            <Typography component="h1" variant="h4">
              {courseData?.name}
            </Typography>
            <Typography component="p">{courseData?.description}</Typography>
          </Box>
        </Box>

        <Box component="section" className={styles.courseHomeSection}>
          <Box component="div" className={styles.courseDetailsCard}>
            <Typography component="h2" variant="h5">
              Detalles
            </Typography>
            <Box component="div" className={styles.courseOwnerInfo}>
              <Typography component='p'>
                Universidad
              </Typography>
              <Box component="div" display='flex' alignItems='center'>
                <AccountCircle sx={{paddingRight: 1}} />
                <Box component="div">
                  <Typography component="p">Profesor.Nombre</Typography>
                  <Typography component="p">Instructor</Typography>
                </Box>
              </Box>
            </Box>
            <Typography component="p">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse
              et nesciunt dicta saepe at vel! Nesciunt sint facere quos
              ducimus laudantium, ratione exercitationem praesentium ad
              odio, suscipit non consectetur ut!
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default CourseHome;