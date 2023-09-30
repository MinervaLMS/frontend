"use client";

import React, { useState, useEffect } from "react";

// Import MaterialUI Components
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

// Import own components
import CircularSpinner from "@/components/common/CircularSpinner";
import CustomSnackbar from "@/components/common/CustomSnackbar";
import MainAppBar from "@/components/layout/MainAppBar";
import { CourseDrawer, DrawerHeader } from "@/components/layout/CourseDrawer";

// Import styles
import { styled } from "@mui/material/styles";
import styles from "@/styles/Course.module.css";

// Import constants
import { DRAWER_WIDTH, AUTOHIDE_ALERT_DURATION } from "@/config/constants";

// Import redux and router
import { useAppSelector } from "@/redux/hook";
import { useRouter } from "next/navigation";

// Import API
import useCourse from "@/hooks/fetching/useCourse";
import { API_STATUS_CODE } from "@/config/api-connections";

// This functional component is the layout of the pages for the /course rute.
// It contains the MaineAppBar and CourseDrawer components.

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

function CourseLayout({ children, params
}: {
  children: React.ReactNode,
  params: { alias: string }
}) {
  // Redux states:
  const isUserLogin = useAppSelector(
    (state) => state.persistedReducer.userLoginState.login
  );

  const userName = useAppSelector(
    (state) => state.persistedReducer.userLoginState.first_name
  );

  const userTokens = useAppSelector(
    (state) => state.persistedReducer.userLoginState.tokens
  );

  const drawerOpen = useAppSelector(
    (state) => state.persistedReducer.drawerState.open
  );
  
  // States related to the alert component
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertConfig, setAlertConfig] = useState({ message: "", severity: "" });

  // States related to the API Fetch
  const { isLoading, error } = useCourse(params.alias, userTokens.access)
  
  // For routing when user is not login or the credentials are invalid
  const router = useRouter();

  // Event handlers
  const handleAlertOpen = (status: number) => {
    if (status === API_STATUS_CODE.UNAUTHORIZED) {
      setAlertConfig({
        message:
          "La sesión es inválida o ha expirado: Vuelve a iniciar sesión.",
        severity: "error",
      });
      setAlertOpen(true);
    } else if (status === API_STATUS_CODE.NOT_FOUND) {
      setAlertConfig({
        message: "Curso no encontrado.",
        severity: "error",
      });
      setAlertOpen(true);
    } else {
      setAlertConfig({
        message: "Hubo un error. Intentalo de nuevo más tarde.",
        severity: "error",
      });
      setAlertOpen(true);
    }
  };

  const handleAlertClose = (
    event?: React.SyntheticEvent | Event, 
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    router.push("/login");
  };

  useEffect(() => {
    if (!isUserLogin) {
      setAlertConfig({
        message: "Para acceder al curso debes iniciar sesión.",
        severity: "error",
      });
      setAlertOpen(true);
    } else if (error) {
      handleAlertOpen(Number(error.message));
    };
  }, [params.alias, error]);

  if (isLoading) {
    return <CircularSpinner openBackdrop={isLoading} />;
  }

  if (error || !isUserLogin) {
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

  // Render the principal container for the course page.
  return (
    <Box className={styles.course}>
      <CssBaseline />
      <MainAppBar />
      <CourseDrawer courseAlias={params.alias} />
      <Main open={drawerOpen}>
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  );
}

export default CourseLayout;