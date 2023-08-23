"use client";

import React, { useState, useEffect } from "react";

// Import MaterialUI Components
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CourseAppBar from "@/components/layout/CourseAppBar";
import CourseDrawerList from "@/components/layout/CourseDrawerList";

// Import common components
import CircularSpinner from "@/components/common/CircularSpinner";
import CustomSnackbar from "@/components/common/CustomSnackbar";

// Import features
import CourseMaterial from "@/components/features/CourseMaterial";

// Import styles
import { styled, useTheme } from "@mui/material/styles";

// Import icons
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// Import constants
import { DRAWER_WIDTH, AUTOHIDE_ALERT_DURATION } from "@/config/constants";

// Import redux and router
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useRouter } from "next/navigation";

// Import API
import { API_ENDPOINTS, API_STATUS_CODE } from "@/config/api-connections";

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

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function Course({ params }: { params: { alias: string } }) {

  // State related to the drawer
  const [open, setOpen] = useState(true);

  // States related to the alert component
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertConfig, setAlertConfig] = useState({ message: "", severity: "" });

  // States related to the API Fetch
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [courseData, setCourseData] = useState({ id: 0, name: "", alias: "", description: null });

  // For routing when user is not login of the course is not found
  const router = useRouter();
  const isUserLogin =  useAppSelector(state => state.userLoginSlice.login);

  // User token to auth in the API
  const userTokens = useAppSelector(state => state.userLoginSlice.tokens);

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

      let response = await fetch(`${API_ENDPOINTS.COURSE_READ}${params.alias}`, config);
      console.log(response);
      handleAlertOpen(response.status);
      let data = await response.json();
      setCourseData(data);

    } catch (error) {
      setAlertConfig({
        message: "Hubo un error. Intentalo de nuevo más tarde",
        severity: "error",
      });
      setAlertOpen(true);
      console.log(error);
      setError(true);
    }
  }

  useEffect(() => {
    if(!isUserLogin) {
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
        message:
          "Curso no encontrado.",
        severity: "error",
      });
      setAlertOpen(true);
      setError(true);
    }
  };

  const handleDrawerOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(true);
  };

  const handleDrawerClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(false);
  }; 

  const handleAlertClose = (
    event?: React.SyntheticEvent | Event,
  ) => {
    router.push('/');
  };

  if (isLoading) {
    return(
      <CircularSpinner openBackdrop={isLoading} />
    );
  }

  if(isUserLogin && !error) {
    // Render the principal container for the course page.
    return (
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <CourseAppBar open={open} handleDrawerOpen={handleDrawerOpen} />
        <Drawer
          sx={{
            width: DRAWER_WIDTH,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: DRAWER_WIDTH,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <Typography variant="h6" noWrap component="div">
              {courseData.name}
            </Typography>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <CourseDrawerList params={params} />
        </Drawer>
        <Main
          open={open}
          sx={{ padding: { xs: theme.spacing(10, 3), sm: theme.spacing(3) } }}
        >
          <DrawerHeader />
          <Typography component="h4" variant="inherit">
            {courseData?.name}
          </Typography>
          <Typography component="p" variant="inherit">
            {courseData?.description}
          </Typography>
          <CourseMaterial></CourseMaterial>
        </Main>
      </Box>
    );
  } else {
    return(
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

export default Course;