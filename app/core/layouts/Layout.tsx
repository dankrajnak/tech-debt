import { Container } from "@mui/material"
import { Box } from "@mui/system"
import { Head, BlitzLayout } from "blitz"

const Layout: BlitzLayout<{ title?: string; children?: React.ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <>
      <Head>
        <title>{title || "tech-debt"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container sx={{ mt: 2 }}>{children}</Container>
    </>
  )
}

export default Layout
