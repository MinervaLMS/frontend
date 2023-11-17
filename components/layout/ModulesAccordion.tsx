"use client";
import React, { useState } from "react";

// Import MaterialUI Components
import Box from "@mui/material/Box";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";
import Stack from '@mui/material/Stack';

// Import icons
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SubjectIcon from '@mui/icons-material/Subject';
import FactCheckIcon from '@mui/icons-material/FactCheck';

// Import API
import useModulesList from "@/hooks/fetching/useModulesList";
import { API_ModuleObject } from "@/config/interfaces";

// This interface defines the types of the props object.
interface CourseModulesListProps {
  courseAlias: string;
  accessToken: string;
}

function ModulesAccordion({
  courseAlias,
  accessToken
}: CourseModulesListProps) {
  // States related to the API Fetch
  const { data: modulesList, isLoading, error } = useModulesList(courseAlias, accessToken)

  // Actual expanded accordion
  const [expanded, setExpanded] = useState<string | false>(false);

  // Event handler to expand the accordion
  const handleChange = (panel: string) => (
    event: React.SyntheticEvent, 
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? panel : false);
  };

  if(!isLoading && !error) {
    return(
      <Box pt={2}>
        {modulesList.map((module: API_ModuleObject) => (
          <Accordion expanded={expanded === `panel${module.id}`} onChange={handleChange(`panel${module.id}`)}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id={`panel${module.id}-header`}
            > 
              <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                  <strong>
                    {`Módulo ${(module.order + 1).toString()}`}
                  </strong>
                </Grid>
                <Grid item xs={12} md={9}>
                  <strong>
                    {module.name}
                  </strong>
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                  <Stack spacing={2}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <SubjectIcon sx={{color: (t) => t.palette.info.main }}  />
                      <Typography component="p" variant="body1">
                        {`${module.module_instructional_materials} materiales`}
                      </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <FactCheckIcon sx={{color: (t) => t.palette.success.main }}  />
                      <Typography component="p" variant="body1">
                        {`${module.module_assessment_materials} evaluaciones`}
                      </Typography>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={9}>
                  <Typography align="justify" paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    In varius ligula vel turpis tincidunt dignissim. 
                    Donec rutrum ut dolor in consequat. 
                    Nullam fringilla tincidunt metus vitae rutrum. 
                    Suspendisse ligula lorem, sodales sed tellus at, lobortis maximus neque. 
                    Nam lobortis ante nec laoreet efficitur. 
                    Integer sed imperdiet nibh, id dapibus tortor. 
                    Morbi eu facilisis tortor, quis eleifend ligula. 
                    Sed nunc lectus, luctus sed justo vitae, vehicula iaculis nisi. 
                    In sodales vulputate magna in tincidunt.
                  </Typography>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        ))}
        
      </Box>
    )
  }
}

export default ModulesAccordion;