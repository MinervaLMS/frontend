"use client";

import MainHeader from "@/components/global/MainHeader";
import React, { use } from "react";
import styles from "@/styles/Contact.module.css";
import { Box, IconButton, Typography } from "@mui/material";
import { Facebook, Instagram } from "@mui/icons-material";

function page() {
  return (
    <>
      <main>
        <MainHeader />
        <Box component="section" className={styles.mainContainer}>
          <Box
            component="div"
            className={`${styles.contactSection} ${styles.contactFormSection}`}
          >
            <Typography component="h1">Contáctanos</Typography>
          </Box>
          <Box
            component="div"
            className={`${styles.contactSection} ${styles.contactInfoSection}`}
          >
            <Typography component="h1">Siguenos</Typography>
            <Box component='div'>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                href="#"
                target="_blank"
              >
                <Facebook />
              </IconButton>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                href="#"
                target="_blank"
              >
                <Instagram />
              </IconButton>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                href="#"
                target="_blank"
              >
                <Instagram />
              </IconButton>
            </Box>
            <Box component='div'>
              <Typography component="h1">Preguntas frecuentes</Typography>
            </Box>
          </Box>
        </Box>
      </main>
    </>
  );
}

export default page;
