'use client';
import React, { useEffect, useState } from "react";
import MainAppBar from "@/components/layout/MainAppBar"
import Box from "@mui/material/Box/Box"
import Typography from "@mui/material/Typography/Typography"
import styles from "@/styles/ModuleProgress.module.css"
import { DataGrid, GridColDef, GridColumnHeaderParams, GridValueFormatterParams, GridValueGetterParams } from '@mui/x-data-grid';
import { useAppSelector } from "@/redux/hook";
import CustomSnackbar from "@/components/common/CustomSnackbar";
import { AUTOHIDE_ALERT_DURATION } from "@/config/constants";
import { API_ModuleProgressObject } from "@/config/interfaces";
import { API_ENDPOINTS } from "@/config/api-connections";

const columns: GridColDef[] = [
    { 
        field: 'module_name', 
        renderHeader: (params: GridColumnHeaderParams) => (
            <strong>
              {'Nombre del módulo'}
            </strong>
        ), 
        flex: 1,
        headerClassName: 'header-cells-color',
    },
    { 
        field: 'module_assessment_progress', 
        renderHeader: (params: GridColumnHeaderParams) => (
            <strong>
              {'Avance'}
            </strong>
        ),
        flex: 0.3,
        valueFormatter: (params: GridValueFormatterParams<number>) => {
            if (params.value == null) {
                return '';
            }
            return `${params.value.toLocaleString()} %`;
        },
        headerClassName: 'header-cells-color',
    },
    { 
        field: 'approved', 
        renderHeader: (params: GridColumnHeaderParams) => (
            <strong>
              {'¿Aprueba?'}
            </strong>
        ),
        width: 150,
        valueGetter: (params: GridValueGetterParams) =>
        `${params.row.module_assessment_progress > 70 ? "Sí" : "No"}`,
        headerClassName: 'header-cells-color',
    }
  ];

let rows: API_ModuleProgressObject[] = []

function ModulesProgress() {
    // Redux states:
    const userTokens = useAppSelector(
        (state) => state.persistedReducer.userLoginState.tokens
    );
    const userId = useAppSelector(
        (state) => state.persistedReducer.userLoginState.id
    );

    const [loading, setLoading] = useState(true)
    const [alertConfig, setAlertConfig] = useState({ message: '', severity: '' })
    const [alertOpen, setAlertOpen] = useState(false);
    const handleAlertClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === 'clickaway') {
          return
        }
        setAlertOpen(false)
    }

    function getRowId(row: API_ModuleProgressObject) {
        return row.module_id
    }

    async function getModulesProgress() {
        setLoading(true)
        try {
            let config = {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + userTokens.access,
                    "Content-Type": "application/json",
                },
            };
            let response = await fetch(`${API_ENDPOINTS.MODULE}progress/${userId}`, config)
            rows = await response.json()
            console.log(
                rows
            );
            setLoading(false)
        } catch (error) {
            setAlertConfig({
                message: 'Hubo un error. Intentalo de nuevo más tarde',
                severity: 'error'
              })
            setAlertOpen(true)
            setLoading(false)
        }
    }

    useEffect(() => {
        getModulesProgress();
    }, [userId])
    return(
        <>
            <MainAppBar />
            <CustomSnackbar
                message={alertConfig.message}
                severity={alertConfig.severity}
                vertical='top'
                horizontal='center'
                autoHideDuration={AUTOHIDE_ALERT_DURATION}
                open={alertOpen}
                onClose={handleAlertClose}
            />
            <Box className={styles.contentContainer} >
                <Box className={styles.titleContainer} >
                    <Typography component="h1" variant="h2" sx={{ fontWeight: 'bold' }} >
                        Mis cursos
                    </Typography>
                </Box>
                <Box 
                    className={styles.tableContainer}
                    sx={{
                        width: '100%',
                        '& .header-cells-color': {
                            backgroundColor: 'aliceblue;'
                        }
                    }} 
                >
                    <DataGrid
                        getRowId={getRowId}
                        rows={rows}
                        columns={columns}
                        disableColumnMenu
                        hideFooterPagination
                        rowSelection={false}
                        hideFooterSelectedRowCount
                        hideFooter
                        loading={loading}
                    />
                </Box>
            </Box>
        </>
    )
}

export default ModulesProgress