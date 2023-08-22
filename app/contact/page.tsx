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
      <Box component="main" width={"100vw"} height={"100vh"}>
        <MainHeader />
        <Box component="section" className={styles.mainSection}>
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
            <Box component="div">
              <Typography component="h1" marginBottom={"1rem"}>
                Preguntas frecuentes
              </Typography>
              <FrequentlyAskedQuestions FAQs={FAQS} />
            </Box>
            <Box component="div">
              <Typography component="h1">Síguenos</Typography>
              <IconButton size="medium" color="inherit" href="#" target="_blank">
                <GitHub />
              </IconButton>
              <IconButton size="medium" color="inherit" href="#" target="_blank">
                <Facebook />
              </IconButton>
              <IconButton size="medium" color="inherit" href="#" target="_blank">
                <Instagram />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default page;
