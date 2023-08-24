
import React, { useState, useEffect, SetStateAction } from 'react';

// Import MaterialUI components
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography'

// Import common components
import CircularSpinner from "@/components/common/CircularSpinner";
import CustomSnackbar from "@/components/common/CustomSnackbar";

// Import features components
import CourseMaterial from './CourseMaterial';

// Import constants
import { AUTOHIDE_ALERT_DURATION } from "@/config/constants";

// Import API
import { API_ENDPOINTS, API_STATUS_CODE } from "@/config/api-connections";
import { API_ModuleObject, API_MaterialObject } from '@/config/interfaces';

// This interface defines the types of the props object.
interface CourseModuleProps {
	moduleID: number;
  accessToken: string;
}

function CourseModule({
	moduleID,
  accessToken,
}: CourseModuleProps) {

  // States related to the alert component
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertConfig, setAlertConfig] = useState({ message: "", severity: "" });

  // States related to the API Fetch
  const [isLoading, setIsLoading] = useState(true);
  const [moduleData, setModuleData] = useState<API_ModuleObject>();
  const [materialsList, setMaterialsList] = useState<Array<API_MaterialObject>>([]);

  // Fetch function to obtain the data of the module
  const handleModuleFetch = async () => {
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
        message: "Hubo un error. Intentalo de nuevo más tarde",
        severity: "error",
      });
      setAlertOpen(true);
      console.log(error);
    }
  }

  // Fetch function to obtain the materials of the module
  const handleMaterialsFetch = async () => {
    try {
      let config = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      };

      let responseMaterials = await fetch(`${API_ENDPOINTS.MODULE}${moduleID}${API_ENDPOINTS.MATERIALS}`, config);
      console.log(responseMaterials);
      handleAlertOpen(responseMaterials.status);
      let dataMaterials = await responseMaterials.json();
      // Order the list of materials according to their order property.
      dataMaterials.sort((a: API_MaterialObject, b: API_MaterialObject) => (a.order > b.order) ? 1 : -1); 
      setMaterialsList(dataMaterials);
    } catch (error) {
      setAlertConfig({
        message: "Hubo un error. Intentalo de nuevo más tarde",
        severity: "error",
      });
      setAlertOpen(true);
      console.log(error);
    }
  }

  useEffect(() => {
    handleModuleFetch();
    handleMaterialsFetch();
    setIsLoading(false);
  }, []);

  // Event handlers

  const handleAlertOpen = (status: number) => {
    if (status === API_STATUS_CODE.NOT_FOUND) {
      setAlertConfig({
        message:
          "No hay materiales en este módulo.",
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
    setAlertOpen(false);
  };

  if (isLoading) {
    return(
      <CircularSpinner openBackdrop={isLoading} />
    );
  }

  const testModule: API_ModuleObject = {
    id: 2,
    name: 'Módulo 2: Tablas Hash',
    course_id: "EDD",
    order: 2
  }

  return(
    <>
      <CustomSnackbar
        message={alertConfig.message}
        severity={alertConfig.severity}
        vertical="top"
        horizontal="center"
        autoHideDuration={AUTOHIDE_ALERT_DURATION}
        open={alertOpen}
        onClose={handleAlertClose}
      />
      <Typography 
        component="h4" 
        variant='inherit'
        sx={{ marginY: 4 }}
      >
        {moduleData?.name}
      </Typography>
      <Container 
        disableGutters 
        sx={{
            marginY: 4,
        }}
      >
        <Typography>
            En la API los módulos no tienen descripción. Luego se comenta en la reunión.
        </Typography>
      </Container>
      <CourseMaterial />
    </>
  )
}

export default CourseModule;