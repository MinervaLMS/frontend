import React, { MouseEventHandler, useState, useEffect } from "react";

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
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";

// Import styles
import { common } from "@mui/material/colors";
import styles from "@/styles/CourseMaterial.module.css";

// Import API
import { API_ENDPOINTS, API_STATUS_CODE } from "@/config/api-connections";
import { API_MaterialObject } from "@/config/interfaces";

// Import redux
import { useAppSelector } from "@/redux/hook";
import { get } from "http";

// This interface defines the types of the props object.
interface CourseMaterialProps {
	material: API_MaterialObject;
  onSelected: () => undefined
}

function CourseMaterial({
	material,
  onSelected
}: CourseMaterialProps) {

  const [materialData, setMaterialData] = useState(material);
  const [reaction, setReaction] = useState<any>(null);
  const [access, setAccess] = useState<any>(null);

  const userTokens = useAppSelector(
    (state) => state.persistedReducer.userLoginState.tokens
  );

  const userID = useAppSelector(
    (state) => state.persistedReducer.userLoginState.id
  );

  const createAccess = async () => {
    try {
      let config = {
        method: "POST",
        headers: {
          Authorization: "Bearer " + userTokens.access,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({"material_id": material.id, "user_id": userID}),
      };

      let response = await fetch(
        `${API_ENDPOINTS.ACCESS}create/`,
        config
      );
      let data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const getAccess = async () => {
    try {
      let config = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + userTokens.access,
        },
      };

      let response = await fetch(
        `${API_ENDPOINTS.ACCESS}${material.id}/${userID}/`,
        config
      );

      if (response.status == API_STATUS_CODE.NOT_FOUND) {
        const access = await createAccess();
        return access;
      }

      let data = await response.json();
      setAccess(data)
      setReaction(data.like);
      return data;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const likeMaterial = async (materialId: number) => {
    console.log("Like material with id: " + materialId);

    // Make api call to update likes
    try{
      let config = {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + userTokens.access,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({"material_id": material.id, "user_id": userID}),
      };

      let response = await fetch(
        `${API_ENDPOINTS.ACCESS}update/like/`,
        config
      );

      // Update visual likes/dislikes counter
      if (access.like == null) { // There was no previous reaction
        setMaterialData({...materialData, likes: materialData.likes + 1})
        setAccess({...access, like: true})
        setReaction(true);
      } else if (access.like == false) { // Previous reaction was dislike -> Delete dislike and add like
        setAccess({...access, like: true})
        setMaterialData({...materialData, likes: materialData.likes + 1, dislikes: materialData.dislikes - 1})
        setReaction(true);
      } else { // Previous reaction was like -> Delete like
        setAccess({...access, like: null})
        setMaterialData({...materialData, likes: materialData.likes - 1})
        setReaction(null);
      }

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  const dislikeMaterial = async (materialId: number) => {
    console.log("Dislike material with id: " + materialId);

    // Make api call to update dislikes
    try{
      let config = {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + userTokens.access,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({"material_id": material.id, "user_id": userID}),
      };

      let response = await fetch(
        `${API_ENDPOINTS.ACCESS}update/dislike/`,
        config
      );

      // Update visual likes/dislikes counter
      if (access.like == null) { // There was no previous reaction
        setAccess({...access, like: false})
        setMaterialData({...materialData, dislikes: materialData.dislikes + 1})
        setReaction(false);
      } else if (access.like == true) { // Previous reaction was dislike -> Add dislike and delete like
        setAccess({...access, like: false})
        setMaterialData({...materialData, dislikes: materialData.dislikes + 1, likes: materialData.likes - 1})
        setReaction(false);
      } else { // Previous reaction was dislike -> Delete dislike
        setAccess({...access, like: null})
        setMaterialData({...materialData, dislikes: materialData.dislikes - 1})
        setReaction(null);
      }

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  useEffect(() => {getAccess()},[])

  return (
    <Card
      sx={{
        width: "70%",
        height: "120px",
        bgcolor: "#E6E6E6",
      }}
    >
      <CardActionArea
        // onClick={onSelected}
        onClick={() => console.log("Material with id: " + materialData.id + " selected")}
      >
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
              <Typography sx={{ typography: {sm: 'body1', md: 'h6'}}}>{materialData.name}</Typography>
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
                    gap: "0.25rem",
                  }}
                  disableGutters
                >
                  <ModeCommentOutlinedIcon />
                  <Typography variant="body1"> {materialData.total_comments} </Typography>
                </Container>
                <Container
                  sx={{
                    display: "flex",
                    direction: "wrap",
                    gap: "0.25rem",
                  }}
                  disableGutters
                  onClick={() => likeMaterial(material.id)}
                >
                  {reaction == true ? <ThumbUpIcon color="secondary" /> : <ThumbUpOutlinedIcon color="secondary" />}
                  <Typography variant="body1" color="secondary"> {materialData.likes} </Typography>
                </Container>
                <Container
                  sx={{
                    display: "flex",
                    direction: "wrap",
                    gap: "0.25rem",
                  }}
                  disableGutters
                  onClick={() => dislikeMaterial(material.id)}
                >
                  {reaction == false ? <ThumbDownIcon color="primary" /> : <ThumbDownOutlinedIcon color="primary" />}
                  <Typography variant="body1" color="primary"> {materialData.dislikes} </Typography>
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