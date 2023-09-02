"use client";

import React, { useState, useEffect } from "react";

// Import MaterialUI Components
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";

// Import own components
import CircularSpinner from "@/components/common/CircularSpinner";
import CustomSnackbar from "@/components/common/CustomSnackbar";
import CourseAppBar from "@/components/layout/CourseAppBar";
import { CourseDrawer, DrawerHeader } from "@/components/layout/CourseDrawer";
import CourseModule from "@/components/features/CourseModule";

// Import styles
import { styled, useTheme } from "@mui/material/styles";
import styles from "@/styles/Course.module.css";

// Import constants
import { DRAWER_WIDTH, AUTOHIDE_ALERT_DURATION } from "@/config/constants";

// Import redux and router
import { useAppSelector } from "@/redux/hook";
import { useRouter } from "next/navigation";

// Import API
import { API_ENDPOINTS, API_STATUS_CODE } from "@/config/api-connections";
import { API_CourseObject, API_MaterialObject } from "@/config/interfaces";

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
}),
    marginLeft: `-${DRAWER_WIDTH}px`,
    ...(open && {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));

// interface MaterialModuleProps {
//     id: number,
//     accessToken: string
// }

function Material({ params }: { params: { id: number } }) {
    // States related to the alert component
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertConfig, setAlertConfig] = useState({ message: "", severity: "" });

    // States related to the API Fetch
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(true);
    const [materialData, setMaterialData] = useState<API_MaterialObject>();

    // For routing when user is not login or the material is not found
    const router = useRouter();

    // Redux states:
    const isUserLogin = useAppSelector(
        (state) => state.persistedReducer.userLoginState.login
    );

    const userTokens = useAppSelector(
        (state) => state.persistedReducer.userLoginState.tokens
    );

    const userName = useAppSelector(
        (state) => state.persistedReducer.userLoginState.first_name
    );

    const drawerOpen = useAppSelector(
        (state) => state.persistedReducer.drawerState.open
    );

    const selectedModule = useAppSelector(
        (state) => state.persistedReducer.drawerState.selectedModule
    );

    useEffect(() => {
        setIsLoading(true);
        handleFetch();
    }, []);

    // Fetch function to obtain the data of the material
    const handleFetch = async () => {
        try {
        let config = {
            method: "GET",
            headers: {
            Authorization: "Bearer " + userTokens.access,
            },
        };

        let responseMaterial = await fetch(
            `${API_ENDPOINTS.MATERIAL}${params.id}/`,
            config
        );

        handleAlertOpen(responseMaterial.status);
        let dataMaterial = await responseMaterial.json();
        setMaterialData(dataMaterial);
        } catch (error) {
            setAlertConfig({
                message: "No hay información de este material o hubo un error. Intentalo de nuevo más tarde",
                severity: "error",
            });
            setAlertOpen(true);
            console.log(error);
        }
        setIsLoading(false);
    };

    const handleAlertOpen = (status: number) => {
        if (status === API_STATUS_CODE.SUCCESS) {
        setError(false);
        }
    };

    const handleAlertClose = () => {
        router.push("/");
    };

    if (isLoading) {
        return <CircularSpinner openBackdrop={isLoading} />;
    }

    if (isUserLogin && !error) {
        // Render the principal container for the course page.
        return (
            <Box className={styles.course}>
            <CssBaseline />
            <CourseAppBar userName={userName} />
            <CourseDrawer courseAlias="testing have to change" />
            <Main open={drawerOpen}>
                <DrawerHeader />
                <Box component="section">
                <Typography component="h1" variant="h4">
                    {materialData?.name}
                </Typography>
                <CourseModule moduleID={selectedModule} accessToken={userTokens.access} />
                </Box>
            </Main>
            </Box>
        );
    } else {
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
}

export default Material;