"use client";

import React, { useState, useEffect } from "react";

// Import MaterialUI components
import List from "@mui/material/List";

// Import own components
import CustomSnackbar from "@/components/common/CustomSnackbar";
import CourseModuleListItem from "./CourseModuleListItem";

// Import constants
import { AUTOHIDE_ALERT_DURATION } from "@/config/constants";

// Import redux
import { useAppSelector } from '@/redux/hook'

// Import API
import useModulesListProgress from "@/hooks/fetching/useModulesListProgress";
import useCourse from "@/hooks/fetching/useCourse";
import { API_STATUS_CODE } from "@/config/api-connections";
import { API_ModuleListProgressObject } from "@/config/interfaces";

// This interface defines the types of the props object.
interface CourseModulesListProps {
  courseAlias: string;
  moduleID: number;
  changeSelectedModule: (moduleID: number) => void;
}

function CourseModulesList({
  courseAlias,
  moduleID,
  changeSelectedModule,
}: CourseModulesListProps) {
  // States related to the alert component
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertConfig, setAlertConfig] = useState({ message: "", severity: "" });

  // Redux states
  const userTokens = useAppSelector(
    (state) => state.persistedReducer.userLoginState.tokens
  )
  const userId = useAppSelector(
    (state) => state.persistedReducer.userLoginState.id
  )

  // States related to the API Fetch
  const { data: modulesList, isLoading, error } = useModulesListProgress(userId, courseAlias, userTokens.access)
  const { data: courseData } = useCourse(courseAlias, userTokens.access)

  // Event handlers
  const handleAlertOpen = (status: number) => {
    if (status === API_STATUS_CODE.UNAUTHORIZED) {
      setAlertConfig({
        message: "La sesión es inválida o ha expirado: Vuelve a iniciar sesión.",
        severity: "error",
      });
      setAlertOpen(true);
    } else if (status === API_STATUS_CODE.NOT_FOUND) {
      setAlertConfig({
        message: "No hay módulos en este curso.",
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
    setAlertOpen(false);
  };

  useEffect(() => {
    if (error) {
      handleAlertOpen(Number(error.message));
    };
  }, [error]);

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

  if(!isLoading && !error) {
    return (
      <List>
        {modulesList.map((module: API_ModuleListProgressObject) => (
          <CourseModuleListItem 
            key={module.module_id}
            module={module}
            minAssessmentProgress={courseData?.min_assessment_progress}
            selectedModuleID={moduleID}
            changeSelectedModule={changeSelectedModule}
          />
        ))}
      </List>
    );
  }
}

export default CourseModulesList;