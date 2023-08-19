"use client";

import MainHeader from "@/components/layout/MainHeader";
import React from "react";
import styles from "@/styles/Contact.module.css";
import { Box, IconButton, Typography } from "@mui/material";
import { Facebook, GitHub, Instagram } from "@mui/icons-material";
import ContactForm from "@/components/features/ContactForm";
import FrequentlyAskedQuestions from "@/components/common/FrequentlyAskedQuestions";
import { FAQS } from "@/config/constants";

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
            <Typography component="p">
              Escribenos y cuentanos cuál es tu dificultad
            </Typography>
            <Box component="div" className={styles.formBox}>
              <ContactForm />
            </Box>
          </Box>

          <Box
            component="div"
            className={`${styles.contactSection} ${styles.contactInfoSection}`}
          >
            <Typography component="h1">Preguntas frecuentes</Typography>
            <Box component="div">
              <FrequentlyAskedQuestions FAQs={FAQS}/>
            </Box>
            <Typography component="h1">Siguenos</Typography>
            <Box component="div">
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
                <GitHub />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </main>
    </>
  );
}

export default page;
