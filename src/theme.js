import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#28A745",
    },
    secondary: {
      main: "#EAF7ED",
    },
    borderColor: "rgba(0,0,0,0.1)",
    lightBlackColor: "#6c757d",
    lightGray: "#999",
  },
  typography: {
    fontFamily: "'DM Sans', sans-serif",
    fontWeightBold: 700,
    fontWeightMedium: 500,
    fontWeightRegular: 400,
    fontWeightLight: 300,
  },
  components: {
    MuiTypography: {
      variants: [
        {
          props: { highlight: "true" },
          style: ({ theme, ownerState }) => ({
            "&>span": {
              color: theme.palette.primary.main,
            },
          }),
        },
      ],
    },
    MuiButton: {
      variants: [],
      styleOverrides: {
        root: ({ theme, ownerState }) => ({
          backgroundColor:
            ownerState?.color === "lightBlackColor"
              ? theme.palette.lightBlackColor
              : ownerState?.color,
          color:
            ownerState?.color === "lightBlackColor"
              ? theme.palette.common.white
              : ownerState?.color,
          textTransform: "capitalize",
        }),
        startIcon: ({ theme, ownerState }) => ({
          "&>svg": {
            fill: ownerState?.fill,
            width: 20,
            height: 20,
          },
        }),
        endIcon: ({ theme, ownerState }) => ({
          fill: ownerState?.fill,
        }),
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: ({ theme, ownerState }) => ({
          borderBottom: `1px solid ${theme.palette.borderColor}`,
        }),
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: ({ theme, ownerState }) => ({
          padding: "16px 24px !important",
        }),
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: ({ theme, ownerState }) => ({
          padding: "16px 24px",
          borderTop: `1px solid ${theme.palette.borderColor}`,
          justifyContent: ownerState?.justifycontent || "flex-end",
        }),
      },
    },
  },
});
