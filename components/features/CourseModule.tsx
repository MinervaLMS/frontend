
import React, { useState, useEffect, memo } from 'react';

// Import MaterialUI components
import Typography from '@mui/material/Typography'

// Import own components
import CircularSpinner from "@/components/common/CircularSpinner";
import CustomSnackbar from "@/components/common/CustomSnackbar";
import CourseMaterialList from "@/components/layout/CourseMaterialList";

// Import styles
import styles from "@/styles/CourseModule.module.css";

// Import constants
import { AUTOHIDE_ALERT_DURATION } from "@/config/constants";

// Import API
import { API_ENDPOINTS, API_STATUS_CODE } from "@/config/api-connections";
import { API_ModuleObject } from '@/config/interfaces';
import { Box } from '@mui/material';

// This interface defines the types of the props object.
interface CourseModuleProps {
	moduleID: number;
  accessToken: string;
}

const  CourseModule = memo(({
	moduleID,
  accessToken,
}: CourseModuleProps) => {

  // States related to the alert component
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertConfig, setAlertConfig] = useState({ message: "", severity: "" });

  // States related to the API Fetch
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(true);
  const [moduleData, setModuleData] = useState<API_ModuleObject>();

  // Fetch function to obtain the data of the module
  const handleFetch = async () => {
    try {
      let config = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      };

      let responseModule = await fetch(`${API_ENDPOINTS.MODULE}${moduleID}/`, config);
      console.log(responseModule);
      handleAlertOpen(responseModule.status);
      let dataModule = await responseModule.json();
      setModuleData(dataModule);
    } catch (error) {
      setAlertConfig({
        message: "No hay materiales en este módulo o hubo un error. Intentalo de nuevo más tarde",
        severity: "error",
      });
      setAlertOpen(true);
      console.log(error);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    setIsLoading(true);
    handleFetch();
  }, [moduleID, accessToken]);

  // Event handlers

  const handleAlertOpen = (status: number) => {
    if (status === API_STATUS_CODE.SUCCESS) {
      setError(false);
    }
  };

  const handleAlertClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
  };

  if (isLoading) {
    return(
      <CircularSpinner openBackdrop={isLoading} />
    );
  }

  if (error) {
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

  if (moduleID > 0) {
    return (
      <>
        <Box className={styles.title} >
          <Typography component="h5" variant='h5'>
            {moduleData?.name}
          </Typography>
        </Box>
        <Typography>
          En la API los módulos aún no tienen descripción.
        </Typography>
        <Box className={styles.title}>
          <Typography component="h5" variant='h5'>
            Contenidos y evaluaciones
          </Typography>
        </Box>
        <CourseMaterialList moduleID={moduleID} accessToken={accessToken} />
      </>
    );
  } else {
    return <></>;
  }
})

export default CourseModule;