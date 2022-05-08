import { Container } from "@mui/material"
import { Box } from "@mui/system"
import { Head, BlitzLayout } from "blitz"
import type { ReactNode } from "react"

const Layout: BlitzLayout<{ title?: string; children?: React.ReactNode; toolbar?: ReactNode }> = ({
  title,
  toolbar,
  children,
}) => {
  return (
    <>
      <Head>
        <title>{title || "tech-debt"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {toolbar}
      <Container sx={{ mt: 2 }}>{children}</Container>
    </>
  )
}

export default Layout
