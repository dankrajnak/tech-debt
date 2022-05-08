import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getIssue from "app/issues/queries/getIssue"
import updateIssue from "app/issues/mutations/updateIssue"
import { IssueForm, FORM_ERROR } from "app/issues/components/IssueForm"
import { CreateIssueValidation } from "app/core/utils/validations"
import { CircularProgress, Typography } from "@mui/material"

export const EditIssue = () => {
  const router = useRouter()
  const issueId = useParam("issueId", "number")
  const [issue, { setQueryData }] = useQuery(
    getIssue,
    { id: issueId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateIssueMutation] = useMutation(updateIssue)

  return (
    <>
      <Head>
        <title>Edit {issue.name}</title>
      </Head>

      <div>
        <Typography variant="h2" mb={3}>
          Edit {issue.name}
        </Typography>

        <IssueForm
          submitText="Update"
          schema={CreateIssueValidation}
          initialValues={issue}
          onSubmit={async (values) => {
            try {
              const updated = await updateIssueMutation({
                id: issue.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowIssuePage({ issueId: updated.id }))
            } catch (error: any) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditIssuePage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<CircularProgress />}>
        <EditIssue />
      </Suspense>

      <p>
        <Link href={Routes.IssuesPage()}>
          <a>Issues</a>
        </Link>
      </p>
    </div>
  )
}

EditIssuePage.getLayout = (page) => <Layout>{page}</Layout>

export default EditIssuePage
