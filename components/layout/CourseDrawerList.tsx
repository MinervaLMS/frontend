"use client"

import React, { useState, useEffect } from 'react';

// Import MaterialUI components
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography'

// Import own components
import CircularSpinner from "@/components/common/CircularSpinner";
import CustomSnackbar from "@/components/common/CustomSnackbar";

// Import styles
import styles from "@/styles/DrawerList.module.css";

// Import icons
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import StarsIcon from '@mui/icons-material/Stars';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import TableChartIcon from '@mui/icons-material/TableChart';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

// Import constants
import { AUTOHIDE_ALERT_DURATION } from "@/config/constants";

// Import API
import { API_ENDPOINTS, API_STATUS_CODE } from "@/config/api-connections";
import { API_ModuleObject } from "@/config/interfaces";

// This interface defines the types of the props object.
interface CourseDrawerListProps {
	courseAlias: string;
  accessToken: string;
  selectedModule: number;
	changeSelectedModule: (moduleID: number) => void;
}

function CourseDrawerList({
	courseAlias,
  accessToken,
  selectedModule,
  changeSelectedModule,
}: CourseDrawerListProps) {

  // States related to the alert component
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertConfig, setAlertConfig] = useState({ message: "", severity: "" });

  // States related to the API Fetch
  const [isLoading, setIsLoading] = useState(true);
  const [modulesList, setModulesList] = useState<Array<API_ModuleObject>>([]);

  // Fetch function
  const handleFetch = async () => {
    try {
      let config = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      };

      let response = await fetch(`${API_ENDPOINTS.COURSE}${courseAlias}${API_ENDPOINTS.MODULES}`, config);
      handleAlertOpen(response.status);
      const data = await response.json();
      // Order the list of modules according to their order property.
      data.sort((a: API_ModuleObject, b: API_ModuleObject) => (a.order > b.order) ? 1 : -1);
      setModulesList(data);
      changeSelectedModule(data[0].id)
    } catch (error) {
      setAlertConfig({
        message: "No hay módulos en este curso o hubo un error. Inténtalo de nuevo más tarde",
        severity: "error",
      });
      setAlertOpen(true);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    handleFetch();
  }, [accessToken]);

  // Event handlers

  const handleAlertOpen = (status: number) => {
    if (status === API_STATUS_CODE.NOT_FOUND) {
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

  if (isLoading) {
    return(
      <CircularSpinner openBackdrop={isLoading} />
    );
  }

  const options = [
    "Posiciones",
    "Calificaciones",
    "Syllabus",
    "Mensajes"
  ];

  const optionsIcons = [
    <StarsIcon/>,
    <FactCheckIcon/>,
    <TableChartIcon/>,
    <QuestionAnswerIcon/>
  ];

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
			<List>
				{modulesList.map((module: API_ModuleObject) => (
					<ListItem key={module.id} disablePadding>
						<ListItemButton 
              onClick={() => changeSelectedModule(module.id)} 
              selected={selectedModule === module.id ? true : false}
            >
              <RadioButtonUncheckedIcon />
							<ListItemText className={styles.listItemText} disableTypography>
                <Typography variant="body2">
                  {(module.order + 1).toString() + ". " + module.name}
                </Typography>
              </ListItemText>
						</ListItemButton>
					</ListItem>
				))}
			</List>
			<Divider />
			<List>
        {options.map((text, index) => (
				<ListItem key={text} disablePadding>
          <ListItemButton>
            {optionsIcons[index]}
            <ListItemText className={styles.listItemText} disableTypography>
              <Typography variant="body2">
                {text}
              </Typography>
            </ListItemText>
          </ListItemButton>
				</ListItem>
        ))}
			</List>
		</>
	);
}

export default CourseDrawerList;