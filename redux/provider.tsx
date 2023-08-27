"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { ThemeProvider } from "@mui/material";
import lightTheme from "@/styles/themes/LightTheme";
import CssBaseline from '@mui/material/CssBaseline';

const persistor = persistStore(store);

interface ProvidersProps {
  children: React.ReactNode;
}

function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline/>
          {children}
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default Providers;
