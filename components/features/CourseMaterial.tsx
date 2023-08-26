import React from "react";

// Import MaterialUI components
import Container from "@mui/material/Container";
import Card from "@mui/material/Card/Card";
import Checkbox from "@mui/material/Checkbox";
import CardActionArea from "@mui/material/CardActionArea/CardActionArea";
import Typography from "@mui/material/Typography/Typography";

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
        maxWidth: 700,
        height: "100px",
        bgcolor: "#E6E6E6",
      }}
    >
      <CardActionArea>
        <Container className={styles.materialInformation}>
          <Container
            sx={{
              bgcolor: "white",
              width: "18%",
              borderRadius: 4,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            disableGutters
          >
            <PlayCircleOutlinedIcon
              sx={{
                width: "95%",
                height: "95%",
              }}
            />
          </Container>
          <Container>
            <Container
              sx={{
                display: "flex",
                direction: "wrap",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              disableGutters
            >
              <Typography component="h4">{material.name}</Typography>
              <Checkbox
                sx={{
                  color: common["black"],
                  "&.Mui-checked": {
                    color: common["black"],
                  },
                }}
                defaultChecked={false}
              />
            </Container>
            <Container
              sx={{
                display: "flex",
                direction: "wrap",
                justifyContent: "space-between",
              }}
              disableGutters
            >
              <Container
                sx={{
                  display: "flex",
                  direction: "wrap",
                }}
                disableGutters
              >
                <TimerOutlinedIcon />
                <Typography component="p">8m, 45s</Typography>
              </Container>
              <Container
                sx={{
                  display: "flex",
                  direction: "wrap",
                  width: "70%",
                }}
                disableGutters
              >
                <Container
                  sx={{
                    display: "flex",
                    direction: "wrap",
                  }}
                  disableGutters
                >
                  <ModeCommentOutlinedIcon />
                  <Typography component="p"> 32 </Typography>
                </Container>
                <Container
                  sx={{
                    display: "flex",
                    direction: "wrap",
                  }}
                  disableGutters
                >
                  <ThumbUpOutlinedIcon />
                  <Typography component="p"> 32 </Typography>
                </Container>
                <Container
                  sx={{
                    display: "flex",
                    direction: "wrap",
                  }}
                  disableGutters
                >
                  <ThumbDownOutlinedIcon />
                  <Typography component="p"> 32 </Typography>
                </Container>
              </Container>
            </Container>
          </Container>
        </Container>
      </CardActionArea>
    </Card>
  );
}

export default CourseMaterial;