import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getIssue from "app/issues/queries/getIssue"
import updateIssue from "app/issues/mutations/updateIssue"
import { IssueForm, FORM_ERROR } from "app/issues/components/IssueForm"

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
        <title>Edit Issue {issue.id}</title>
      </Head>

      <div>
        <h1>Edit Issue {issue.id}</h1>
        <pre>{JSON.stringify(issue, null, 2)}</pre>

        <IssueForm
          submitText="Update Issue"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateIssue}
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
      <Suspense fallback={<div>Loading...</div>}>
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

EditIssuePage.authenticate = true
EditIssuePage.getLayout = (page) => <Layout>{page}</Layout>

export default EditIssuePage
