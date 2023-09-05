"use client"

import React, { useState, useEffect, SetStateAction } from 'react';

// Import MaterialUI components
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';

// Import own components
import CircularSpinner from "@/components/common/CircularSpinner";
import CustomSnackbar from "@/components/common/CustomSnackbar";
import CourseMaterial from "@/components/features/CourseMaterial";

// Import constants
import { AUTOHIDE_ALERT_DURATION } from "@/config/constants";

// Import API
import { API_ENDPOINTS, API_STATUS_CODE } from "@/config/api-connections";
import { API_MaterialObject } from "@/config/interfaces";

// Import router
import { useRouter, usePathname } from "next/navigation";

// This interface defines the types of the props object.
interface CourseMaterialListProps {
	moduleID: number;
  accessToken: string;
}

function CourseMaterialList({
	moduleID,
  accessToken,
}: CourseMaterialListProps) {
  const router = useRouter();
  const currentPath: string = usePathname();

  // States related to the alert component
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertConfig, setAlertConfig] = useState({ message: "", severity: "" });

  // States related to the API Fetch
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(true);
  const [materialsList, setMaterialsList] = useState<Array<API_MaterialObject>>([]);

  // Fetch function to obtain the materials of the module
  const handleFetch = async () => {
    try {
      let config = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      };

      let response = await fetch(`${API_ENDPOINTS.MODULE}${moduleID}${API_ENDPOINTS.MATERIALS}`, config);
      console.log(response);
      handleAlertOpen(response.status);
      let data = await response.json();
      // Order the list of materials according to their order property.
      data.sort((a: API_MaterialObject, b: API_MaterialObject) => (a.order > b.order) ? 1 : -1); 
      setMaterialsList(data);
    } catch (error) {
      setAlertConfig({
        message: "No hay materiales en este módulo o hubo un error. Inténtalo de nuevo más tarde",
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
    if (status === API_STATUS_CODE.NOT_FOUND) {
      setAlertConfig({
        message:
          "Materiales no encontrados.",
        severity: "error",
      });
      setAlertOpen(true);
    } else if (status === API_STATUS_CODE.SUCCESS) {
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

  const goToSelectedMaterial = (materialId: number) => {
    router.push(`${currentPath}/${materialId}`)
    return undefined
  }

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

	return(
    <List>
      {materialsList.map((material: API_MaterialObject) => (
        <ListItem key={material.id}>
          <CourseMaterial onSelected={() => goToSelectedMaterial(material.id)} material={material} />
        </ListItem>
      ))}
    </List>
	);
}

export default CourseMaterialList;