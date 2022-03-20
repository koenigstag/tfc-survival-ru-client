import React, { useContext } from "react";

export const themeContext = React.createContext('light');

export const useTheme = () => {
  const theme = useContext(themeContext);

  return theme;
};

export const ThemeProvider = themeContext.Provider;
