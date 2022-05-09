import { Suspense } from "react"
import { Image, Link, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import Logo from "app/core/components/LogoIcon"
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material"

const Home: BlitzPage = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Card>
          <CardContent>Problems</CardContent>
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Card>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Issues
            </Typography>
            <Typography variant="h5">Create New Issue</Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Create New</Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
