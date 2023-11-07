// Import MaterialUI components
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

// Import styles
import styles from "@/styles/Course.module.css";

// Import icons
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';

// Import redux
import { useAppSelector } from '@/redux/hook'

// Import API
import useModuleProgress from "@/hooks/fetching/useModuleProgress";
import { API_ModuleListProgressObject } from "@/config/interfaces";

// This interface defines the types of the props object.
interface CourseModuleListItemProps {
  module: API_ModuleListProgressObject
  minAssessmentProgress: number
  selectedModuleID: number
  changeSelectedModule: (selectedModuleID: number) => void
}

function CourseModuleListItem({
  module,
  minAssessmentProgress,
  selectedModuleID,
  changeSelectedModule,
}: CourseModuleListItemProps) {
  // To change de icon depending on the progress
  let Icon = <HelpOutlineIcon color="secondary" />

  const progress = module.module_assessment_progress
  if (progress < minAssessmentProgress) {
    Icon = <RadioButtonUncheckedIcon color="secondary" />
  } else if (progress >= minAssessmentProgress && progress < 100) {
    Icon = <CheckCircleOutlineRoundedIcon color="secondary" />
  } else if (progress === 100) {
    Icon = <VerifiedRoundedIcon color="secondary" />
  }

  return (
    <ListItem key={module.module_id} disablePadding>
      <ListItemButton
        onClick={() => changeSelectedModule(module.module_id)}
        selected={selectedModuleID === module.module_id ? true : false}
      >
        {Icon}
        <ListItemText
          className={styles.moduleListItemText}
          disableTypography
        >
          <Typography variant="body2">
            {(module.order + 1).toString() + ". " + module.module_name}
          </Typography>
        </ListItemText>
      </ListItemButton>
    </ListItem>
  )
}

export default CourseModuleListItem;