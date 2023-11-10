"use client";

import { Provider, useSelector } from "react-redux";
import { RootState, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import CssBaseline from '@mui/material/CssBaseline';

import { ThemeProvider } from "@mui/material";
import lightTheme from "@/styles/themes/LightTheme";
import darkTheme from "@/styles/themes/DarkTheme";

const persistor = persistStore(store);

interface ProvidersProps {
  children: React.ReactNode;
}

function Theme({ children }: { children: React.ReactNode }) {
  const isDarkMode = useSelector((state: RootState) => state.persistedReducer.theme.isDarkMode);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline/>
      {children}
    </ThemeProvider>
  );
}

function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Theme>
          {children}
        </Theme>
      </PersistGate>
    </Provider>
  );
}

export default Providers;
