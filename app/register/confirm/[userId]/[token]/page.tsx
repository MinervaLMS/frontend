"use client";

import CustomSnackbar from "@/components/common/CustomSnackbar";
import { API_ENDPOINTS, API_STATUS_CODE } from "@/config/api-connections";
import { AUTOHIDE_ALERT_DURATION } from "@/config/constants";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "@/styles/RegisterLogin.module.css";

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

  useEffect(() => {
    try {
      let config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };

      fetch(
        `${API_ENDPOINTS.CONFIRM_ACCOUNT}${params.userId}/${params.token}`,
        config
      ).then((response) => {
        console.log(response);
        handleResponse(response.status);
      });
    } catch (error) {
      setAlertConfig({
        message: "Hubo un error. Intentalo de nuevo más tarde",
        severity: "error",
      });
      setAlertOpen(true);
      console.log(error);
    }
  }, []);

  // Event handlers

  const handleResponse = (status: number) => {
    if (status == API_STATUS_CODE.SUCCESS) {
      setconfirmText(
        <>
          <h1>Gracias por registrate en Minerva LMS</h1>
          <p>
            Tu cuenta ha sido activada exitosamente. Ahora estás listo para
            empezar a aprender.
          </p>
          <Link href="/login">Ingresar</Link>
        </>
      );
    } else {
      setconfirmText(
        <>
          <h1>Hubo un error al activar tu cuenta</h1>
          <p>El token ha fallado. Solicita un nuevo correo de activación.</p>
          <Link href="#">Reenviar correo </Link>
        </>
      );
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

  return (
    <div className={styles.mainContainer}>
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