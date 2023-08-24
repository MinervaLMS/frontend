import { Container, Typography } from '@mui/material';
import React from 'react';
import CourseMaterial from './CourseMaterial';
import { API_ModuleObject } from '@/config/interfaces';

export default function CourseModule() {
    const testModule: API_ModuleObject = {
        id: 2,
        name: 'Módulo 2: Tablas Hash',
        course_id: "EDD",
        description: "Esta es una description de prueba"
    }

    return(
        <>
            <Typography 
                component="h4" 
                variant='inherit'
                sx={{ marginY: 4 }}
            >
                {testModule.name}
            </Typography>
            <Container 
                disableGutters 
                sx={{
                    marginY: 4,
                }}
            >
                <Typography>
                    {testModule.description}
                </Typography>
            </Container>
            <CourseMaterial></CourseMaterial>
        </>
    )
}