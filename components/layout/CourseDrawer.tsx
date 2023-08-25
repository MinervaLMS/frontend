import { DRAWER_WIDTH } from "@/config/constants";
import {
  Drawer,
  IconButton,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import React from "react";

// Import icons
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CourseDrawerList from "./CourseDrawerList";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setOpen } from "@/redux/features/drawerSlice";

interface CourseDrawerProps {
  alias: string;
}

export const CourseDrawer = ({ alias }: CourseDrawerProps) => {
  // Redux states
  const dispatch = useAppDispatch();
  const open = useAppSelector(
    (state) => state.persistedReducer.drawerState.open
  );
  const userTokens = useAppSelector(
    (state) => state.persistedReducer.userLoginState.tokens
  );
  const selectedModule = useAppSelector(
    (state) => state.persistedReducer.drawerState.selectedModule
  );

  // Event handler for the drawer
  const handleDrawerOpenClose = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    dispatch(setOpen());
  };

  const handleChangeModule = (moduleID: number) => {
    moduleID;
  };

  // Style for the drawer header
  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));

  // For using the theme predefined styles
  const theme = useTheme();

  return (
    <Drawer
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerOpenClose}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Logo
        </Typography>
      </DrawerHeader>
      <CourseDrawerList
        courseAlias={alias}
        accessToken={userTokens.access}
        selectedModule={selectedModule}
        changeSelectedModule={handleChangeModule}
      />
    </Drawer>
  );
};
