"use client";

import React, { useState, useEffect } from "react";

// Import MaterialUI Components
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

// Import own components
import CircularSpinner from "@/components/common/CircularSpinner";
import CustomSnackbar from "@/components/common/CustomSnackbar";
import CourseAppBar from "@/components/layout/CourseAppBar";
import { CourseDrawer, DrawerHeader } from "@/components/layout/CourseDrawer";

// Import styles
import { styled } from "@mui/material/styles";
import styles from "@/styles/Course.module.css";

// Import constants
import { DRAWER_WIDTH, AUTOHIDE_ALERT_DURATION } from "@/config/constants";

// Import redux and router
import { useAppSelector } from "@/redux/hook";
import { useRouter } from "next/navigation";

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

function CourseLayout({ children, params
}: {
  children: React.ReactNode,
  params: { alias: string }
}) {
  // States related to the alert component
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertConfig, setAlertConfig] = useState({ message: "", severity: "" });

  // States related to the API Fetch
  const [isLoading, setIsLoading] = useState(true);
  
  // For routing when user is not login of the course is not found
  const router = useRouter();

  // Redux states:
  const isUserLogin = useAppSelector(
    (state) => state.persistedReducer.userLoginState.login
  );

  const userName = useAppSelector(
    (state) => state.persistedReducer.userLoginState.first_name
  );

  const drawerOpen = useAppSelector(
    (state) => state.persistedReducer.drawerState.open
  );

  useEffect(() => {
    if (!isUserLogin) {
      setAlertConfig({
        message: "Para acceder al curso debes iniciar sesión.",
        severity: "error",
      });
      setAlertOpen(true);
    }
    setIsLoading(false);
  }, [params.alias]);

  const handleAlertClose = (event?: React.SyntheticEvent | Event) => {
    router.push("/login");
  };

  if (isLoading) {
    return <CircularSpinner openBackdrop={isLoading} />;
  }

  if (isUserLogin) {
    // Render the principal container for the course page.
    return (
      <Box className={styles.course}>
        <CssBaseline />
        <CourseAppBar userName={userName} />
        <CourseDrawer courseAlias={params.alias} />
        <Main open={drawerOpen}>
          <DrawerHeader />
          {children}
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

export default CourseLayout;