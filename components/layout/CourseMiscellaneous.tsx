import React from "react";

// Import icons
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import StarsIcon from "@mui/icons-material/Stars";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import TableChartIcon from "@mui/icons-material/TableChart";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";

// Import MaterialUI components
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

// Import styles
import styles from "@/styles/Course.module.css";

import { COURSE_OPTIONS } from "@/config/constants";

function CourseMiscellaneous() {
  const COURSE_OPTIONS_ICONS = [
    <StarsIcon color="secondary" />,
    <FactCheckIcon color="secondary" />,
    <TableChartIcon color="secondary" />,
    <QuestionAnswerIcon color="secondary" />,
  ];

  return (
    <div>
      <List>
        {COURSE_OPTIONS.map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              {COURSE_OPTIONS_ICONS[index]}
              <ListItemText
                className={styles.moduleListItemText}
                disableTypography
              >
                <Typography variant="body2">{text}</Typography>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default CourseMiscellaneous;
