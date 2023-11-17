"use client";

import React, { useState, useEffect } from "react";

// Import MaterialUI Components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';

// Import own components
import CircularSpinner from "@/components/common/CircularSpinner";
import CustomSnackbar from "@/components/common/CustomSnackbar";
import ModulesAccordion from "@/components/layout/ModulesAccordion";

// Import styles
import styles from "@/styles/Course.module.css";

// Import constants
import { AUTOHIDE_ALERT_DURATION } from "@/config/constants";

// Import icons and images
import AccountCircle from "@mui/icons-material/AccountCircle";
import StarRateIcon from '@mui/icons-material/StarRate';
import CommentIcon from '@mui/icons-material/Comment';
import Image from "next/image";

// Import redux and router
import { useAppSelector } from "@/redux/hook";
import { useRouter } from "next/navigation";

// Import API
import useCourse from "@/hooks/fetching/useCourse";
import useModulesList from "@/hooks/fetching/useModulesList";
import { API_STATUS_CODE } from "@/config/api-connections";
import { Container } from "@mui/material";

function CourseHome({ params }: { params: { alias: string } }) {

  // Redux states:
  const userTokens = useAppSelector(
    (state) => state.persistedReducer.userLoginState.tokens
  );

  // States related to the alert component
  const [courseAlertOpen, setCourseAlertOpen] = useState(false);
  const [courseAlertConfig, setCourseAlertConfig] = useState({ message: "", severity: "" });
  const [modulesAlertOpen, setModulesAlertOpen] = useState(false);
  const [modulesAlertConfig, setModulesAlertConfig] = useState({ message: "", severity: "" });

  // States related to the API Fetch
  const { data: courseData, isLoading: courseIsLoading, error: courseError } = useCourse(params.alias, userTokens.access)
  const { isLoading: modulesIsLoading, error: modulesError } = useModulesList(params.alias, userTokens.access)

  // For routing when user the course fetching fails
  const router = useRouter();

  // Event handlers
  const handleCourseAlertOpen = (status: number) => {
    if (status === API_STATUS_CODE.UNAUTHORIZED) {
      setCourseAlertConfig({
        message:
          "La sesión es inválida o ha expirado: Vuelve a iniciar sesión.",
        severity: "error",
      });
      setCourseAlertOpen(true);
    } else if (status === API_STATUS_CODE.NOT_FOUND) {
      setCourseAlertConfig({
        message: "Curso no encontrado.",
        severity: "error",
      });
      setCourseAlertOpen(true);
    } else {
      setCourseAlertConfig({
        message: "Hubo un error. Intentalo de nuevo más tarde.",
        severity: "error",
      });
      setCourseAlertOpen(true);
    }
  };

  const handleCourseAlertClose = (event?: React.SyntheticEvent | Event) => {
    router.push("/");
  };

  const handleModulesAlertOpen = (status: number) => {
    if (status === API_STATUS_CODE.NOT_FOUND) {
      setModulesAlertConfig({
        message: "No hay módulos en este curso.",
        severity: "error",
      });
      setModulesAlertOpen(true);
    } else {
      setModulesAlertConfig({
        message: "Hubo un error al intentar acceder a los módulos. Intentalo de nuevo más tarde.",
        severity: "error",
      });
      setModulesAlertOpen(true);
    }
  };

  const handleModulesAlertClose = (
		event?: React.SyntheticEvent | Event,
		reason?: string
  ) => {
			if (reason === "clickaway") {
			return;
		}
    setModulesAlertOpen(false)
  };

  useEffect(() => {
    if (courseError) {
      handleCourseAlertOpen(Number(courseError.message));
    };

    if (modulesError) {
      handleModulesAlertOpen(Number(modulesError.message));
    };
  }, [courseError, modulesError]);

  if (courseIsLoading || modulesIsLoading) {
    return <CircularSpinner openBackdrop={true} />;
  }

  if (courseError) {
    return (
      <CustomSnackbar
        message={courseAlertConfig.message}
        severity={courseAlertConfig.severity}
        vertical="top"
        horizontal="center"
        autoHideDuration={AUTOHIDE_ALERT_DURATION}
        open={courseAlertOpen}
        onClose={handleCourseAlertClose}
      />
    );
  }

  return (
    <Container>
      
      <CustomSnackbar
        message={modulesAlertConfig.message}
        severity={modulesAlertConfig.severity}
        vertical="top"
        horizontal="center"
        autoHideDuration={AUTOHIDE_ALERT_DURATION}
        open={modulesAlertOpen}
        onClose={handleModulesAlertClose}
      />

      <Typography component="h1" variant="h4">
        {courseData?.name}
      </Typography>

      <Box component="section" id="course_details" className={styles.separation}>
        <Grid container justifyContent="space-between" spacing={2}>
          <Grid item sm={12} md={7}>
            <Typography align="justify" paragraph>
              {courseData?.description}
            </Typography>
            <Typography component="h3" variant="h6">
              Ofrecido por:
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={4}>
                <Box className={styles.courseImage}>
                  <img src="/assets/images/institution-image.png" alt="Institution image" />
                </Box>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Typography component="p" variant="h6">
                  {courseData?.institution.name}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={12} md={5}>
            <Box className={styles.courseImage}>
              <img src="/assets/images/course-image.png" alt="Course image" />
            </Box>
          </Grid>
        </Grid>
      </Box>
      
      <Box component="section" id="course_social" className={styles.separation}>
        <Grid container justifyContent="space-between" spacing={4}>
          <Grid item sm={12} md={6}>
            <Card raised>
              <CardContent>
                <Typography component="h3" variant="h6">
                  Valoraciones del curso
                </Typography>
                <Stack direction="row" alignItems="center" spacing={4} pt={2}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <StarRateIcon sx={{color: (t) => t.palette.warning.main }} />
                    <Typography component="p" variant="body1">
                      {courseData?.average_stars
                        ? `${courseData?.average_stars} (${courseData?.appraisals} calificaciones)`
                        : `${courseData?.appraisals} calificaciones`
                      }
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <CommentIcon sx={{color: (t) => t.palette.info.main }} />
                    <Typography component="p" variant="body1">
                      {`${courseData?.comments} comentarios`}
                    </Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item sm={12} md={6}>
            <Card raised>
              <CardContent>
                <Typography component="h3" variant="h6">
                  Criterios de aprobación
                </Typography>
                <Stack direction="row" alignItems="center" spacing={4} pt={2}>
                  <Typography component="p" variant="body1">
                    {`${courseData?.min_assessment_progress}% de los materiales de aprobación en cada módulo.`}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Box component="section" id="course_instructors" className={styles.separation}>
        <Typography component="h3" variant="h6">
          Docentes
        </Typography>
        <Grid container justifyContent="space-between" spacing={2} pt={2}>
          {courseData?.instructors?.length != 0 ? 
            courseData?.instructors.map((intructor: string) => (
              <Grid item xs={12} sm={6} md={3}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar alt={intructor} src=".jpg" />
                  <Typography component="p" variant="body1">
                    <strong>{intructor}</strong>
                  </Typography>
                </Stack>
              </Grid>
            )) :
            <Grid item xs={12} sm={6} md={3}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar alt="Julián Moreno" src=".jpg" />
                <Typography component="p" variant="body1">
                  <strong>Julián Moreno</strong>
                </Typography>
              </Stack>
            </Grid>
          }
        </Grid>
      </Box>

      <Box component="section" id="course_modules_description" className={styles.separation}>
        <Typography component="h2" variant="h5">
          Contenido detallado
        </Typography>
        <ModulesAccordion courseAlias={params.alias} accessToken={userTokens.access} />
      </Box>

    </Container>
  );
}

export default CourseHome;