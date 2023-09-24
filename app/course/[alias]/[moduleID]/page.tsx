"use client";

import React, { useState, useEffect } from "react";

// Import MaterialUI Components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// Import own components
import CircularSpinner from "@/components/common/CircularSpinner";
import CustomSnackbar from "@/components/common/CustomSnackbar";
import CourseModule from "@/components/features/CourseModule";

// Import styles
import styles from "@/styles/Course.module.css";

// Import constants
import { AUTOHIDE_ALERT_DURATION } from "@/config/constants";

// Import redux and router
import { useAppSelector } from "@/redux/hook";
import { useRouter } from "next/navigation";

// Import API
import useCourse from "@/hooks/fetching/useCourse";
import useCourseModule from "@/hooks/fetching/useCourseModule";
import useMaterialList from "@/hooks/fetching/useMaterialList";
import { API_STATUS_CODE } from "@/config/api-connections";

function Modules({ params }: { params: { alias: string , moduleID: number} }) {

  // Redux states:
  const userTokens = useAppSelector(
    (state) => state.persistedReducer.userLoginState.tokens
  );

  const userID = useAppSelector(
    (state) => state.persistedReducer.userLoginState.id
  );

  // States related to the alert component
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertConfig, setAlertConfig] = useState({ message: "", severity: "" });

  // States related to the API Fetch
  const { data: courseData, isLoading: courseIsLoading, error } = useCourse(params.alias, userTokens.access)
  const { isLoading: moduleIsLoading } = useCourseModule(params.moduleID, userTokens.access)
  const { isLoading: materialsIsLoading } = useMaterialList(params.moduleID, userTokens.access)

  // For routing when user is not login of the course is not found
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
    router.push(`/course/${params.alias}/`);
  };

  useEffect(() => {
    if (error) {
      handleAlertOpen(Number(error.message));
    };
  }, [error]);

  if (courseIsLoading || moduleIsLoading || materialsIsLoading) {
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

  // Render the principal container for the course page.
  return (
    <Box component="section">
      <Typography component="h1" variant="h4">
        {courseData?.name}
      </Typography>
      <CourseModule moduleID={params.moduleID} accessToken={userTokens.access} />
    </Box>
  );
}

export default Modules;