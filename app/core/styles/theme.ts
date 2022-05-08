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
})

export default theme
