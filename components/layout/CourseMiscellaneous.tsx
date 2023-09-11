import React from "react";

// Import icons
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

import { useRouter } from "next/navigation";

function CourseMiscellaneous() {
  const router = useRouter();

  const COURSE_OPTIONS_ICONS = [
    <StarsIcon color="secondary" />,
    <FactCheckIcon color="secondary" />,
    <TableChartIcon color="secondary" />,
    <QuestionAnswerIcon color="secondary" />,
  ];

  return (
    <div>
      <List>
        {COURSE_OPTIONS.map((item, index) => (
          <ListItem key={`misc-${item.title}`} disablePadding>
            <ListItemButton onClick={() => router.push(item.route)}>
              {COURSE_OPTIONS_ICONS[index]}
              <ListItemText
                className={styles.moduleListItemText}
                disableTypography
              >
                <Typography variant="body2">{item.title}</Typography>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default CourseMiscellaneous;
