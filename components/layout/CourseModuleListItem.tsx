// Import MaterialUI components
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

// Import styles
import styles from "@/styles/Course.module.css";

// Import icons
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';

// Import redux
import { useAppSelector } from '@/redux/hook'

// Import API
import useModuleProgress from "@/hooks/fetching/useModuleProgress";
import { API_ModuleObject } from "@/config/interfaces";

// This interface defines the types of the props object.
interface CourseModuleListItemProps {
  module: API_ModuleObject
  accessToken: string
  minAssessmentProgress: number
  selectedModuleID: number
  changeSelectedModule: (selectedModuleID: number) => void
}

function CourseModuleListItem({
  module,
  accessToken,
  minAssessmentProgress,
  selectedModuleID,
  changeSelectedModule,
}: CourseModuleListItemProps) {

  // Redux states
  const userId = useAppSelector(
    (state) => state.persistedReducer.userLoginState.id
  );
  
  // States related to the API Fetch
  const { data: moduleProgress } = useModuleProgress(module.id, userId, accessToken)

  // To change de icon depending on the progress
  let Icon = <QuestionMarkIcon color="secondary" />

  if(moduleProgress) {
    const progress = moduleProgress.module_assessment_progress
    if (progress < minAssessmentProgress) {
      Icon = <RadioButtonUncheckedIcon color="secondary" />
    } else if (progress >= minAssessmentProgress && progress < 100) {
      Icon = <CheckCircleOutlineRoundedIcon color="secondary" />
    } else if (progress === 100) {
      Icon = <VerifiedRoundedIcon color="secondary" />
    }
  }

  return (
    <ListItem key={module.id} disablePadding>
      <ListItemButton
        onClick={() => changeSelectedModule(module.id)}
        selected={selectedModuleID === module.id ? true : false}
      >
        {Icon}
        <ListItemText
          className={styles.moduleListItemText}
          disableTypography
        >
          <Typography variant="body2">
            {(module.order + 1).toString() + ". " + module.name}
          </Typography>
        </ListItemText>
      </ListItemButton>
    </ListItem>
  )
}

export default CourseModuleListItem;