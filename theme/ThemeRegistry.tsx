"use client";

import { createTheme, ThemeOptions, ThemeProvider } from "@mui/material/styles";
import { NextAppDirEmotionCacheProvider } from "./EmotionCache";
import CssBaseline from "@mui/material/CssBaseline";
import components from "./components";
import { green, red, yellow, orange } from "@mui/material/colors";
import typography from "./typography"; 

const darkThemeOptions: ThemeOptions = {
    typography: typography,
    components: components,
    palette: {
        background: {
            default: "rgb(26, 26, 26)", // black
            paper: "rgb(13, 13, 13)", // black
        },
        text: {
            primary: "rgba(255, 255, 255, 0.85)", // white
            secondary: "rgba(255, 255, 255, 0.85)", // white
        },
        primary: {
            main: "rgb(0, 204, 255)", // blue
            light: "rgb(163, 191, 243)", // light blue
            dark: 'rgb(31, 102, 239)', // blue
            contrastText: 'rgb(235, 234, 239)' // grey
        },
        success: {
            main: "rgb(111, 214, 145)",
            light: "rgb(131, 231, 168)",
            dark: green[600],
            contrastText: "rgb(235,234,239)"
        },
        warning: {
            main: 'rgb(242, 175, 87)',
            light: 'rgb(245, 205, 130)',
            dark: orange[600],
            contrastText: 'rgb(235, 234, 239)',
        },
        error: {
            main: 'rgb(237, 103, 98)',
            light: 'rgb(240, 135, 132)',
            dark: red[600],
            contrastText: 'rgb(235, 234, 239)',
        },
        info: {
            main: 'rgb(142, 221, 229)',
            light: 'rgb(183, 238, 242)',
            dark: 'rgb(92, 205, 219)',
            contrastText: 'rgb(235, 234, 239)',
        },
        // customYellow: {
        //     dark: yellow[800],
        //     main: 'rgb(250, 222, 101)',
        //     light: 'rgb(252, 237, 133)',
        // },
        // customTable: {
        //     dark: "rgb(21, 28, 38)",
        //     light: "rgb(30, 32, 36)"
        // },
        divider: 'rgb(85, 89, 110)',
    }
};

export const darkTheme = createTheme(darkThemeOptions);

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
