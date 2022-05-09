import { blueGrey, grey, red } from "@mui/material/colors"
import { createTheme } from "@mui/material/styles"

// Create a theme instance.
const theme = createTheme({
  palette: {
    // mode: "dark",
    primary: {
      main: blueGrey.A700,
    },
    secondary: {
      main: grey.A100,
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
})

export default theme
