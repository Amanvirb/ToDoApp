import theme from "../../styles/styles";

export const commonStyles = {
  btnStyle: {
    m: '1px auto',
    bgcolor: "#5097A4",
    color: "#ffffff",
    "&:hover": {
      bgcolor: "#2a4d63",   
    },
  },

  tableRowStyles: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  },

  paperstyle: {
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    padding: theme.spacing(1),
    textAlign: "center",
    height: 280,
    color: theme.palette.text.secondary,
  },
  footerContainer: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: 40,
  },
  footerAddr: {
    maxWidth: 400,
    height: "100%",
    backgroundColor: "#d1d2d4",
  },
};
