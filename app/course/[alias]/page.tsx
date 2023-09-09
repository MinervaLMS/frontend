"use client";

import React, { useState, useEffect } from "react";

// Import MaterialUI Components
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";

// Import own components
import CircularSpinner from "@/components/common/CircularSpinner";
import CustomSnackbar from "@/components/common/CustomSnackbar";
import CourseAppBar from "@/components/layout/CourseAppBar";
import { CourseDrawer, DrawerHeader } from "@/components/layout/CourseDrawer";

// Import styles
import { styled, useTheme } from "@mui/material/styles";
import styles from "@/styles/Course.module.css";

// Import constants
import { DRAWER_WIDTH, AUTOHIDE_ALERT_DURATION } from "@/config/constants";

// Import redux and router
import { useAppSelector } from "@/redux/hook";
import { useRouter } from "next/navigation";

// Import API
import { API_ENDPOINTS, API_STATUS_CODE } from "@/config/api-connections";
import { API_CourseObject } from "@/config/interfaces";
import { AccountCircle } from "@mui/icons-material";
import Image from "next/image";

// This functional component is the index page for the /course rute.
// It contains the CourseAppBar and CourseDrawerList components.

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${DRAWER_WIDTH}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

function CourseHome({ params }: { params: { alias: string } }) {
  // States related to the alert component
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertConfig, setAlertConfig] = useState({ message: "", severity: "" });

  // States related to the API Fetch
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(true);
  const [courseData, setCourseData] = useState<API_CourseObject>();

  // For routing when user is not login of the course is not found
  const router = useRouter();

  // Redux states:
  const isUserLogin = useAppSelector(
    (state) => state.persistedReducer.userLoginState.login
  );

  const userTokens = useAppSelector(
    (state) => state.persistedReducer.userLoginState.tokens
  );

  const userName = useAppSelector(
    (state) => state.persistedReducer.userLoginState.first_name
  );

  const drawerOpen = useAppSelector(
    (state) => state.persistedReducer.drawerState.open
  );

  const selectedModule = useAppSelector(
    (state) => state.persistedReducer.drawerState.selectedModule
  );

  // For using the theme predefined styles
  const theme = useTheme();

  const handleFetch = async () => {
    try {
      let config = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + userTokens.access,
        },
      };

      let response = await fetch(
        `${API_ENDPOINTS.COURSE}${params.alias}`,
        config
      );
      console.log(response);
      handleAlertOpen(response.status);
      let data = await response.json();
      console.log(data);
      setCourseData(data);
    } catch (error) {
      setAlertConfig({
        message: "Hubo un error. Intentalo de nuevo más tarde",
        severity: "error",
      });
      setAlertOpen(true);
      console.log(error);
    }
  };

  useEffect(() => {
    if (!isUserLogin) {
      setAlertConfig({
        message: "Para acceder al curso debes iniciar sesión.",
        severity: "error",
      });
      setAlertOpen(true);
    } else {
      handleFetch();
    }
    setIsLoading(false);
  }, []);

  // Event handlers

  const handleAlertOpen = (status: number) => {
    if (status === API_STATUS_CODE.NOT_FOUND) {
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
    } else if (status === API_STATUS_CODE.SUCCESS) {
      setError(false);
    }
  };

  const handleAlertClose = (event?: React.SyntheticEvent | Event) => {
    router.push("/");
  };

  if (isLoading) {
    return <CircularSpinner openBackdrop={isLoading} />;
  }

  if (isUserLogin && !error) {
    // Render the principal container for the course page.
    return (
      <Box className={styles.course}>
        <CssBaseline />
        <CourseAppBar userName={userName} />
        <CourseDrawer courseAlias={params.alias} />
        <Main open={drawerOpen}>
          <DrawerHeader />
          <Box component="section">
            <Box component="div">
              <Typography component="h1" variant="h4">
                {courseData?.name}
              </Typography>
              <Typography component="p">{courseData?.description}</Typography>
            </Box>
            <Box component="div">
              <Typography component="h2" variant="h6">
                Universidad
              </Typography>
              <Box component="div">
                <AccountCircle />
                <Typography component="p">Profesor.Nombre</Typography>
                <Typography component="caption">Instructor</Typography>
              </Box>
              <Box component="div">
                <Image
                  src="@/public/assets/images/course-image.png"
                  alt="Course image"
                  width={100}
                  height={100}
                  priority
                />
              </Box>
            </Box>
          </Box>
          <Box component="section">
            <Box component="div">
              <Typography component="h2" variant="h6">
                Detalles
              </Typography>
              <Typography component="p">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse
                et nesciunt dicta saepe at vel! Nesciunt sint facere quos
                ducimus laudantium, ratione exercitationem praesentium ad odio,
                suscipit non consectetur ut!
              </Typography>
            </Box>
          </Box>
        </Main>
      </Box>
    );
  } else {
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
}

export default CourseHome;
