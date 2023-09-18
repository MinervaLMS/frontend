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
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertConfig, setAlertConfig] = useState({ message: "", severity: "" });

  // States related to the API Fetch
  const { data: courseData, isLoading: courseIsLoading, error } = useCourse(params.alias, userTokens.access)
  const { isLoading: moduleListIsLoading, } = useModulesList(params.alias, userTokens.access)

  // For routing when user the course fetching fails
  const router = useRouter();

  // Event handlers
  const handleAlertOpen = (status: number) => {
    if (status === API_STATUS_CODE.BAD_REQUEST) {
      setAlertConfig({
        message: "Hubo un error. Intentalo de nuevo más tarde.",
        severity: "error",
      });
      setAlertOpen(true);
    } else if (status === API_STATUS_CODE.NOT_FOUND) {
      setAlertConfig({
        message: "Curso no encontrado.",
        severity: "error",
      });
      setAlertOpen(true);
    } else if (status === API_STATUS_CODE.UNAUTHORIZED) {
      setAlertConfig({
        message:
          "La sesión es inválida o ha expirado: Vuelve a iniciar sesión.",
        severity: "error",
      });
      setAlertOpen(true);
    }
  };

  const handleAlertClose = (event?: React.SyntheticEvent | Event) => {
    router.push("/");
  };

  useEffect(() => {
    if (error) {
      handleAlertOpen(Number(error.message));
    };
  }, [error]);

  if (courseIsLoading || moduleListIsLoading) {
    return <CircularSpinner openBackdrop={true} />;
  }

  if (error) {
    return (
      <CustomSnackbar
        message={alertConfig.message}
        severity={alertConfig.severity}
        vertical="top"
        horizontal="center"
        autoHideDuration={AUTOHIDE_ALERT_DURATION}
        open={alertOpen}
        onClose={handleAlertClose}
      />
    );
  }

  return (
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
  );
}

export default CourseHome;