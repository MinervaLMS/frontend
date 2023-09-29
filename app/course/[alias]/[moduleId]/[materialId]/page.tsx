"use client";

import React, { useState, useEffect } from "react";

// Import MaterialUI Components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "@mui/material";

// Import own components
import CircularSpinner from "@/components/common/CircularSpinner";
import CustomSnackbar from "@/components/common/CustomSnackbar";
import PdfMaterial from "@/components/materials/PdfMaterial";
import VideoMaterial from "@/components/materials/VideoMaterial";
import MarkDownMaterial from "@/components/materials/MarkDownMaterial";
import ExerciseMaterial from "@/components/materials/ExerciseMaterial";
import CommentSection from "@/components/materials/CommentSection";

// Import styles
import styles from "@/styles/Course.module.css";

// Import constants
import { AUTOHIDE_ALERT_DURATION } from "@/config/constants";

// Import redux and router
import { useAppSelector } from "@/redux/hook";
import { useRouter, useParams } from "next/navigation";

// Import API
import useCourseMaterial from "@/hooks/fetching/useCourseMaterial";
import useComments from "@/hooks/fetching/useComments";
import { API_STATUS_CODE } from "@/config/api-connections";
import { API_MaterialObject } from "@/config/interfaces";

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

function Materials() {

  // Redux states:
  const userTokens = useAppSelector(
    (state) => state.persistedReducer.userLoginState.tokens
  );

  // States related to the alert component
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertConfig, setAlertConfig] = useState({ message: "", severity: "" });

  // States related to the API Fetch
  const { alias, moduleID, materialId } = useParams();
  console.log(alias, moduleID, materialId);
  const { data: materialData, isLoading: materialIsLoading, error } = useCourseMaterial(String(materialId), userTokens.access)
  const { isLoading: commentsIsLoading } = useComments(String(materialId), userTokens.access)
  
  // For routing when user is not login or the material is not found
  const router = useRouter();
  
  // Event handlers
  const handleAlertOpen = (status: number) => {
    setAlertConfig({
      message:
        "No hay información de este material o hubo un error. Intentalo de nuevo más tarde",
      severity: "error",
    });
    setAlertOpen(true);
    console.log(error);
  };

  const handleAlertClose = () => {
    router.push(`/course/${alias}/`);
  };

  useEffect(() => {
    if (error) {
      handleAlertOpen(Number(error.message));
    };
  }, [error]);

  if (materialIsLoading || commentsIsLoading) {
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

  const CurrentView = views[materialData.material_type];

  // Render the principal container for the course page.
  return (
    <Box component="section" style={{ height: "calc(100vh - 130px)" }}>
        <Box sx={{
          width: 1,
          height: '90%'
        }} >
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
            {materialData?.name}
          </Typography>
          <CurrentView />
        </Box>
        <CommentSection
          material={materialData}
        />
      </Box>
  );
}

export default Materials;