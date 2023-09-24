"use client";

import CustomSnackbar from "@/components/common/CustomSnackbar";
import CircularSpinner from "@/components/common/CircularSpinner";
import { API_STATUS_CODE } from "@/config/api-connections";
import useConfirmAccount from "@/hooks/fetching/useConfirmAccount";
import { AUTOHIDE_ALERT_DURATION } from "@/config/constants";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "@/styles/RegisterLogin.module.css";
import { Typography } from "@mui/material";

function AccountConfirmation({
  params,
}: {
  params: { userId: string; token: string };
}) {
  // States related to the alert component
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertConfig, setAlertConfig] = useState({ message: "", severity: "" });
  // States related to the loader component
  const [confirmText, setconfirmText] = useState(<></>);

  // Loader state
  const [openBackdrop, setOpenBackdrop] = useState(false);

  // States related to the API Fetch
  const { data: confirmStatus, isLoading, error } = useConfirmAccount(params.userId, params.token)

  // Event handlers
  const handleAlertClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
  };

  // Loader handlers
  const handleCloseLoader = () => {
    setOpenBackdrop(false);
  };
  const handleOpenLoader = () => {
    setOpenBackdrop(true);
  };

  useEffect(() => {
    if (error) {
      setAlertConfig({
        message: "Hubo un error. Intentalo de nuevo más tarde",
        severity: "error",
      });
      setAlertOpen(true);
      console.log(error);
    };
  }, [error]);

  if (isLoading) {
    handleOpenLoader();
  } else {
    handleCloseLoader();
  }

  if (confirmStatus) {
    if (confirmStatus == API_STATUS_CODE.SUCCESS) {
      setconfirmText(
        <>
          <Typography component="h2" variant="h4" my={2}>
            Gracias por registrate en Minerva LMS
          </Typography>
          <Typography component="p" my={2}>
            Tu cuenta ha sido activada exitosamente. Ahora estás listo para
            empezar a aprender.
          </Typography>
          <Link href="/login">Ingresar →</Link>
        </>
      );
    } else {
      setconfirmText(
        <>
          <Typography component="h2" variant="h4" my={2}>
            Hubo un error al activar tu cuenta
          </Typography>
          <Typography component="p" my={2}>
            El token ha fallado. Solicita un nuevo correo de activación.
          </Typography>
          <Link href="#">Reenviar correo →</Link>
        </>
      );
    }
  }

  return (
    <div className={styles.mainContainer}>
      <CircularSpinner openBackdrop={openBackdrop} />
      <CustomSnackbar
        message={alertConfig.message}
        severity={alertConfig.severity}
        vertical="top"
        horizontal="center"
        autoHideDuration={AUTOHIDE_ALERT_DURATION}
        open={alertOpen}
        onClose={handleAlertClose}
      />
      <Image
        src="/vercel.svg"
        alt="Vercel Logo"
        width={100}
        height={100}
        priority
      />
      {confirmText}
    </div>
  );
}

export default AccountConfirmation;
