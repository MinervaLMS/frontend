"use client"

import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

const menus = [
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
		<List>
			{menus.map((text, index) => (
				<ListItem key={text} disablePadding>
				<ListItemButton>
					<ListItemText primary={text} />
				</ListItemButton>
				</ListItem>
			))}
		</List>
	);
}