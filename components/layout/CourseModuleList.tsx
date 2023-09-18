"use client";

import React, { useState, useEffect } from "react";

// Import MaterialUI components
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

// Import own components
import CircularSpinner from "@/components/common/CircularSpinner";
import CustomSnackbar from "@/components/common/CustomSnackbar";

// Import styles
import styles from "@/styles/Course.module.css";

// Import icons
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

// Import constants
import { AUTOHIDE_ALERT_DURATION, COURSE_OPTIONS } from "@/config/constants";

// Import API
import useModulesList from "@/hooks/fetching/useModulesList";
import { API_STATUS_CODE } from "@/config/api-connections";
import { API_ModuleObject } from "@/config/interfaces";

// This interface defines the types of the props object.
interface CourseDrawerListProps {
  courseAlias: string;
  accessToken: string;
  moduleID: number;
  changeSelectedModule: (moduleID: number) => void;
}

function CourseDrawerList({
  courseAlias,
  accessToken,
  moduleID,
  changeSelectedModule,
}: CourseDrawerListProps) {
  // States related to the alert component
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertConfig, setAlertConfig] = useState({ message: "", severity: "" });

  // States related to the API Fetch
  const { modulesList, isLoading, error } = useModulesList(courseAlias, accessToken)

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
        message: "No hay módulos en este curso.",
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

  useEffect(() => {
    if (error) {
      handleAlertOpen(Number(error.message));
    };
  }, [error]);

  if (isLoading) {
    return <CircularSpinner openBackdrop={isLoading} />;
  }

  if (error) {
    <CustomSnackbar
        message={alertConfig.message}
        severity={alertConfig.severity}
        vertical="top"
        horizontal="center"
        autoHideDuration={AUTOHIDE_ALERT_DURATION}
        open={alertOpen}
        onClose={handleAlertClose}
      />
  }

  return (
    <List>
      {modulesList.map((module: API_ModuleObject) => (
        <ListItem key={module.id} disablePadding>
          <ListItemButton
            onClick={() => changeSelectedModule(module.id)}
            selected={moduleID === module.id ? true : false}
          >
            <RadioButtonUncheckedIcon color="secondary" />
            <ListItemText
              className={styles.moduleListItemText}
              disableTypography
            >
              <Typography variant="body2">
                {(module.order + 1).toString() + ". " + module.name}
              </Typography>
            </ListItemText>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}

export default CourseDrawerList;
