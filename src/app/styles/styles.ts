import { createTheme } from "@mui/material";

const Colors = {
  primary: "#000",
  secondary: "#000042",
  hover: "#000042",
  active: "#000042",
  inherit: "#fff",
};

const theme = createTheme({
  palette: {
    primary: {
      main: Colors.primary,
    },
    secondary: {
      main: Colors.secondary,
    },
  },

  typography: {
    body1: {
      color: "#000",
    },
    body2: {
      color: "#013220",
    },
    h2: {
      color: "#013220",
    },
    h3: {
      color: "#013220",
    },
    h4: {
      color: "#013220",
    },
    h5: {
      color: "#000042",
    },
    h6: {
      color: "#000042",
    },
  },
  components: {
    MuiTypography: {
      defaultProps: {
        padding: 1,
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          color: Colors.inherit,
          padding: 4,
          width: 100,
          margin: 2,
          // border:'2px solid red',
          justifyContent: "center",
          "&:hover": {
            // boxShadow: `0px 0px 0px 8px ${alpha('#000', 0.16)}`,
            backgroundColor: Colors.active,
          },
          "&.active": {
            backgroundColor: Colors.hover,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: Colors.inherit,
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: Colors.secondary,
          fontSize: "2rem",
        },
      },
    },
    // MuiContainer:{
    //   styleOverrides: {
    //     root: {
    //       // alignSelf:'center',
    //       border:'5px solid red'
    //     },
    //   },
    // },
    // MuiCard: {
    //   styleOverrides: {
    //     root: {
    //       "&:hover": {
    //         boxShadow: '0 0 20px 20px #dfdfdf',
    //         // boxShadow: `0px 0px 0px 8px ${alpha('#000', 0.16)}`, // theme.shadows[20]
    //       },
    //     },
    //   },
    // },
  },
});

export default theme;
