import { blueGrey, red } from "@mui/material/colors"
import { createTheme } from "@mui/material/styles"

// Create a theme instance.
const theme = createTheme({
  palette: {
    // mode: "dark",
    primary: {
      main: blueGrey.A700,
    },
    secondary: {
      main: "#FFFFFF",
    },
  },
})

export default theme
