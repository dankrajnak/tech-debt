import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getIssue from "app/issues/queries/getIssue"
import deleteIssue from "app/issues/mutations/deleteIssue"

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
        <h1>Issue {issue.id}</h1>
        <pre>{JSON.stringify(issue, null, 2)}</pre>

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
      </div>
    </>
  )
}

const ShowIssuePage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.IssuesPage()}>
          <a>Issues</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Issue />
      </Suspense>
    </div>
  )
}

ShowIssuePage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowIssuePage
