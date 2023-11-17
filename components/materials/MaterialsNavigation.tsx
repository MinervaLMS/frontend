import { Box, Breadcrumbs, Button, ButtonGroup, Link, Tooltip, Typography } from "@mui/material";
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

import { useRouter } from "next/navigation";

// Import styles
import styles from '@/styles/CourseMaterial.module.css';

interface MaterialsNavigation {
  materialNavigationInfo: {
    courseAlias?: string;
    moduleId?: number;
    moduleOrder?: number;
    moduleName?: string;
    materialOrder?: number;
  };
}

export default function MaterialsNavigation({ materialNavigationInfo }: MaterialsNavigation) {

  const { 
    courseAlias = '', 
    moduleId = 0, 
    moduleOrder = 0, 
    moduleName = '', 
    materialOrder = 0 
  } = materialNavigationInfo ?? {};

  const router = useRouter();

  return (
    <Box id="materials_navigation" className={styles.materials_navigation_box}>

      <Breadcrumbs sx={{paddingTop: 1 }}>

        <Link
            onClick={() => {
              router.push(`/course/${courseAlias}/${moduleId}`)
            }}
            sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            color='inherit'
            variant='body1'
          >
            <KeyboardDoubleArrowLeftIcon sx={{ mr: 0.5 }}/>
            Módulo {moduleOrder + 1}{moduleName != "" ? ":" : ""} {moduleName}
        </Link>
        
        <Typography>
          
          Material {materialOrder + 1}
        
        </Typography>

      </Breadcrumbs>

      {/* The next lines are for navigation through materials */}
      {/* The managing of this is not completed */}
      <ButtonGroup aria-label='navigation through materials'>
        
        <Tooltip title="Anterior material">
          <Button aria-label='back to previous material'>
            <ChevronLeftIcon />
          </Button>
        </Tooltip>

        <Tooltip title="Siguiente material">
          <Button aria-label='go to next material'>
            <ChevronRightIcon />
          </Button>
        </Tooltip>
      
      </ButtonGroup>

    </Box>
  );
}