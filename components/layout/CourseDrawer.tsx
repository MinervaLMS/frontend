import React from "react";

// Import MaterialUI Components
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

// Import styles
import { styled, useTheme } from "@mui/material/styles";

// Import own components
import CourseDrawerList from "./CourseDrawerList";

// Import icons
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// Import images
import Image from "next/image";

// Import constants
import { DRAWER_WIDTH } from "@/config/constants";

// Import redux
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setOpen, setSelectedModule } from "@/redux/features/drawerSlice";

interface CourseDrawerProps {
  courseAlias: string;
}

// Style for the drawer header
export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "center",
}));

export const CourseDrawer = ({ courseAlias }: CourseDrawerProps) => {

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
    dispatch(setSelectedModule(moduleID));;
  };

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
        <Image
          src="/vercel.svg"
          alt="Vercel Logo"
          width={100}
          height={50}
          priority
        />
      </DrawerHeader>
      <CourseDrawerList
        courseAlias={courseAlias}
        accessToken={userTokens.access}
        selectedModule={selectedModule}
        changeSelectedModule={handleChangeModule}
      />
    </Drawer>
  );
};
