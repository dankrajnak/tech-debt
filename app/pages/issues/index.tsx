import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getIssues from "app/issues/queries/getIssues"
import {
  AppBar,
  Button,
  CircularProgress,
  Link as MaterialLink,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material"
import { formatDate } from "app/core/utils/utils"

const ITEMS_PER_PAGE = 20

export const IssuesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ issues, hasMore, count }] = usePaginatedQuery(getIssues, {
    orderBy: { createdAt: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })
  const numPages = Math.ceil(count / ITEMS_PER_PAGE)

  const goToPage = (page: number) => router.push({ query: { page } })

  return (
    <div>
      <Typography variant="h3" marginBottom={3}>
        Issues ({count})
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {issues.map((issue) => (
              <TableRow key={issue.id}>
                <TableCell>
                  <Link href={Routes.ShowIssuePage({ issueId: issue.id })}>
                    <MaterialLink href="">{issue.name}</MaterialLink>
                  </Link>
                </TableCell>
                <TableCell>{formatDate(issue.createdAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ul></ul>

      {numPages > 1 && (
        <Pagination
          onChange={(_, page) => goToPage(page - 1)}
          count={numPages}
          hidePrevButton={page === 0}
          hideNextButton={!hasMore}
        />
      )}
    </div>
  )
}

const IssuesPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Issues</title>
      </Head>

      <div>
        <Suspense fallback={<CircularProgress />}>
          <IssuesList />
        </Suspense>
      </div>
    </>
  )
}

IssuesPage.getLayout = (page) => (
  <Layout
    toolbar={
      <AppBar color="secondary" position="static" sx={{ mb: 5 }}>
        <Toolbar>
          <Link href={Routes.NewIssuePage()}>
            <Button>Create</Button>
          </Link>
        </Toolbar>
      </AppBar>
    }
  >
    {page}
  </Layout>
)

export default IssuesPage
