import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#d35400", // Change primary color
      customGray: "#777",
    },
    secondary: {
      main: "#d35400", // Change secondary color
    },
    // You can define other colors like error, warning, info, and success here
  },
  components: {
    typography: {
      fontFamily: `"Lato", sans-serif`,
      fontSize: 14,
    },
    MuiCard: {
      defaultProps: {
        variant: "outlined",
      },
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...{
            padding: theme.spacing(2),
            borderWidth: "1.5px",
          },
        }),
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: "md",
      },
    },
  },
});

export default theme;
