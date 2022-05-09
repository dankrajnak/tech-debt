import { AppBar, Toolbar } from "@mui/material"
import { ReactNode } from "react"

const SecondaryNav = ({ actions }: { actions: ReactNode[] }) => (
  <AppBar color="secondary" position="static" sx={{ mb: 5 }}>
    <Toolbar variant="dense">{actions}</Toolbar>
  </AppBar>
)

export default SecondaryNav
