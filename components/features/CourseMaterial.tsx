import React from "react";

// Import MaterialUI components
import { Box } from "@mui/material";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card/Card";
import Checkbox from "@mui/material/Checkbox";
import CardActionArea from "@mui/material/CardActionArea/CardActionArea";
import Typography from "@mui/material/Typography";

// Import icons
import PlayCircleOutlinedIcon from "@mui/icons-material/PlayCircleOutlined";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";

// Import styles
import { common } from "@mui/material/colors";
import styles from "@/styles/CourseMaterial.module.css";

// Import API
import { API_MaterialObject } from "@/config/interfaces";

// This interface defines the types of the props object.
interface CourseMaterialProps {
	material: API_MaterialObject;
}

function CourseMaterial({
	material,
}: CourseMaterialProps) {

  return (
    <Card
      sx={{
        width: "70%",
        height: "120px",
        bgcolor: "#E6E6E6",
      }}
    >
      <CardActionArea>
        <Box 
          className={styles.materialInformation}
        >
          <Box
            className={styles.typeOfMaterial}
          >
            <PlayCircleOutlinedIcon
              color="primary"
              sx={{
                width: "95%",
                height: "95%",
              }}
            />
          </Box>
          <Container>
            <Box
              className={styles.materialName}
            >
              <Typography variant="h6">{material.name}</Typography>
              <Checkbox
                sx={{
                  color: common["black"],
                  "&.Mui-checked": {
                    color: common["black"],
                  },
                }}
                defaultChecked={false}
              />
            </Box>
            <Box
              className={styles.materialDetails}
            >
              <Container
                sx={{
                  display: "flex",
                  direction: "wrap",
                }}
                disableGutters
              >
                <TimerOutlinedIcon color="primary" />
                <Typography color="primary" variant="body1">8m, 45s</Typography>
              </Container>
              <Box
                className={styles.materialReactions}
              >
                {/* Lo siguiente lo dejo con estilos inline porque de igual forma se va a tener que cambiar */}
                <Container
                  sx={{
                    display: "flex",
                    direction: "wrap",
                  }}
                  disableGutters
                >
                  <ModeCommentOutlinedIcon color="primary" />
                  <Typography variant="body1" color="primary" > 32 </Typography>
                </Container>
                <Container
                  sx={{
                    display: "flex",
                    direction: "wrap",
                  }}
                  disableGutters
                >
                  <ThumbUpOutlinedIcon color="secondary" />
                  <Typography variant="body1" color="secondary"> 32 </Typography>
                </Container>
                <Container
                  sx={{
                    display: "flex",
                    direction: "wrap",
                  }}
                  disableGutters
                >
                  <ThumbDownOutlinedIcon />
                  <Typography variant="body1"> 32 </Typography>
                </Container>
              </Box>
            </Box>
          </Container>
        </Box>
      </CardActionArea>
    </Card>
  );
}

export default CourseMaterial;