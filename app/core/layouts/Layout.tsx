import { AppBar, Button, Container, IconButton, Toolbar } from "@mui/material"
import { Head, BlitzLayout, Link, Routes, useRouter } from "blitz"
import type { ReactNode } from "react"
import Logo from "../components/LogoIcon"
import SecondaryNav from "../components/SecondaryNav"

const Layout: BlitzLayout<{
  title?: string
  children?: React.ReactNode
  toolbar?: ReactNode[]
}> = ({ title, toolbar, children }) => {
  const { pathname } = useRouter()
  return (
    <>
      <Head>
        <title>{title || "tech-debt"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppBar position="static" sx={{ mb: toolbar ? 0 : 5 }}>
        <Toolbar variant="dense">
          <Link href={Routes.Home()}>
            <IconButton color="inherit">
              <Logo />
            </IconButton>
          </Link>
          <Link href={Routes.IssuesPage()}>
            <Button
              variant={pathname.includes("problem") ? "contained" : undefined}
              color="inherit"
            >
              Problems
            </Button>
          </Link>
          <Link href={Routes.IssuesPage()}>
            <Button
              size="medium"
              variant={pathname.includes("issue") ? "outlined" : "text"}
              color="inherit"
            >
              Issues
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
      {toolbar && <SecondaryNav actions={toolbar} />}
      <Container sx={{ mt: 2, mb: 15 }}>{children}</Container>
    </>
  )
}

export default Layout
