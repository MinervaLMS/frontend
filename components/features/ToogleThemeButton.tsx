// SomeOtherComponent.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '@/redux/features/themeSlice';
import { RootState } from '@/redux/store';
import { IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';


const ToggleThemeButton = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state.persistedReducer.theme.isDarkMode);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const getThemeIcon = () => {
    const theme = useTheme();
    const iconColor = theme.palette.primary.contrastText;
    const themeIcon = isDarkMode ? <Brightness7Icon sx={{color: iconColor}}/> : <Brightness4Icon sx={{color: iconColor}}/>;
    return themeIcon;
  };

  return (
    <IconButton sx={{ mr: 2 }} onClick={handleToggleTheme}>
      {getThemeIcon()}
    </IconButton>
  );
};

export default ToggleThemeButton;