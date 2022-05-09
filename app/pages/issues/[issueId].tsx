import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getIssue from "app/issues/queries/getIssue"
import deleteIssue from "app/issues/mutations/deleteIssue"
import { Button, Card, CardContent, CircularProgress, Stack, Typography } from "@mui/material"
import { Box } from "@mui/system"
import sanitizeHtml from "sanitize-html"

const Label = ({ children }: { children: string }) => (
  <Box sx={{ fontWeight: "bold" }}>{children}</Box>
)

export const Issue = () => {
  const router = useRouter()
  const issueId = useParam("issueId", "number")
  const [deleteIssueMutation] = useMutation(deleteIssue)
  const [issue] = useQuery(getIssue, { id: issueId })

  return (
    <>
      <Head>
        <title>Issue {issue.id}</title>
      </Head>

      <div>
        <Link href={Routes.EditIssuePage({ issueId: issue.id })}>
          <a>Edit</a>
        </Link>
        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteIssueMutation({ id: issue.id })
              router.push(Routes.IssuesPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>

        <Typography variant="h3" gutterBottom>
          {issue.name}
        </Typography>

        <Stack spacing={4}>
          <div>
            <Label>Name</Label>
            {issue.name}
          </div>
          <div>
            <div>
              <Label>Description</Label>
              <Card variant="outlined">
                <CardContent>
                  <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(issue.description) }} />
                </CardContent>
              </Card>
            </div>
          </div>
          {issue.workArounds && issue.workArounds.length > 0 && (
            <div>
              <Label>Workarounds</Label>
              {issue.workArounds.map((workaround, i) => (
                <div key={i}>{workaround}</div>
              ))}
            </div>
          )}
        </Stack>
      </div>
    </>
  )
}

const ShowIssuePage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<CircularProgress />}>
        <Issue />
      </Suspense>
    </div>
  )
}

ShowIssuePage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowIssuePage
