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
import { styled } from "@mui/material/styles";
import styles from "@/styles/Course.module.css";

// Import constants
import { DRAWER_WIDTH, AUTOHIDE_ALERT_DURATION } from "@/config/constants";

// Import redux and router
import { useAppSelector } from "@/redux/hook";
import { useRouter, useParams } from "next/navigation";

// Import API
import { API_ENDPOINTS, API_STATUS_CODE } from "@/config/api-connections";
import { API_MaterialObject } from "@/config/interfaces";
import PdfMaterial from "@/components/materials/PdfMaterial";
import VideoMaterial from "@/components/materials/VideoMaterial";
import MarkDownMaterial from "@/components/materials/MarkDownMaterial";
import ExerciseMaterial from "@/components/materials/ExerciseMaterial";
import { Link } from "@mui/material";

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

const views: any = {
  PDF: PdfMaterial,
  HTM: MarkDownMaterial,
  VID: VideoMaterial,
  IOC: ExerciseMaterial,
};

const initialMaterial: API_MaterialObject = {
    id: 0,
    name: "",
    material_type: "",
    is_extra: false,
    order: 0,
    module_id: 0,
    likes: 0,
    dislikes: 0,
    total_comments: 0,
};

function Material() {
  // States related to the alert component
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertConfig, setAlertConfig] = useState({ message: "", severity: "" });

  // States related to the API Fetch
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(true);
  const [material, setMaterial] = useState<API_MaterialObject>(initialMaterial);

  // For routing when user is not login or the material is not found
  const router = useRouter();
  const { alias, moduleID, materialId } = useParams();
  console.log(alias, moduleID, materialId);

  // Redux states:
  const isUserLogged = useAppSelector(
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

  useEffect(() => {
    setIsLoading(true);
    handleFetch();
  }, []);

  // Fetch function to obtain the data of the material
  const handleFetch = async () => {
    try {
      let config = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + userTokens.access,
        },
      };

      let apiResponse = await fetch(
        `${API_ENDPOINTS.MATERIAL}${materialId}/`,
        config
      );

      handleAlertOpen(apiResponse.status);
      let dataMaterial = await apiResponse.json();
      console.log(dataMaterial);

      if (dataMaterial.message) {
        setAlertConfig({
          message: dataMaterial.message,
          severity: "error",
        });
        setAlertOpen(true);
      } else {
        setMaterial(dataMaterial);
      }
    } catch (error) {
      setAlertConfig({
        message:
          "No hay información de este material o hubo un error. Intentalo de nuevo más tarde",
        severity: "error",
      });
      setAlertOpen(true);
      console.log(error);
    }
    setIsLoading(false);
  };

  const handleAlertOpen = (status: number) => {
    if (status === API_STATUS_CODE.SUCCESS) {
      setError(false);
    }
  };

  const handleAlertClose = () => {
    router.push("/");
  };

  const CurrentView = views[material.material_type];

  if (isLoading) {
    return <CircularSpinner openBackdrop={isLoading} />;
  }

  if (isUserLogged && !error) {
    // Render the principal container for the course page.
    return (
      <Box className={styles.course}>
        <CssBaseline />
        <CourseAppBar userName={userName} />
        <CourseDrawer courseAlias={alias.toString()} />
        <Main open={drawerOpen}>
          <DrawerHeader />
          <Box component="section" style={{ height: "calc(100vh - 130px)" }}>
            <Link
              onClick={() => router.push(`/course/${alias}/${moduleID}`)}
              sx={{ cursor: "pointer" }}
              underline="hover"
              color={""}
              variant="body1"
            >
              ← Volver
            </Link>
            <Typography component="h1" variant="h4">
              {material?.name}
            </Typography>
            <CurrentView />
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

export default Material;
