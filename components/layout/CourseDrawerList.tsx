"use client"

import React, { useState } from 'react';

// Import MaterialUI components
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

// Import icons
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import StarsIcon from '@mui/icons-material/Stars';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import TableChartIcon from '@mui/icons-material/TableChart';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

const modulos = [
	'Módulo 1',
	'Módulo 2',
	'Módulo 3',
	'Módulo 4',
	'Módulo 5',
	'Módulo 6',
	'Módulo 7',
	'Módulo 8',
	'Módulo 9',
	'Módulo 10',
	'Módulo 11',
	'Módulo 12',
]

const general = [
	'Posiciones',
	'Calificaciones',
	'Syllabus',
	'Mensajes',
]

export default function CourseDrawerList({
	params,
}: {
	params: { alias: string };
}) {
	return(
		<>
			<List>
				{modulos.map((text, index) => (
					<ListItem key={text}>
            <RadioButtonUncheckedIcon />
						<ListItemButton>
							<ListItemText primary={text} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
			<Divider />
			<List>
				<ListItem key='posiciones'>
          <StarsIcon />
          <ListItemButton>
            <ListItemText primary='Posiciones' />
          </ListItemButton>
				</ListItem>

        <ListItem key='calificaciones'>
          <FactCheckIcon />
          <ListItemButton>
            <ListItemText primary='Calificaciones' />
          </ListItemButton>
				</ListItem>

        <ListItem key='syllabus'>
          <TableChartIcon />
          <ListItemButton>
            <ListItemText primary='Syllabus' />
          </ListItemButton>
				</ListItem>

        <ListItem key='mensajes'>
          <QuestionAnswerIcon />
          <ListItemButton>
            <ListItemText primary='Mensajes' />
          </ListItemButton>
				</ListItem>
			</List>
		</>
	);
}