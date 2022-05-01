import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createIssue from "app/issues/mutations/createIssue"
import { IssueForm, FORM_ERROR } from "app/issues/components/IssueForm"
import { Typography } from "@mui/material"

const NewIssuePage: BlitzPage = () => {
  const router = useRouter()
  const [createIssueMutation] = useMutation(createIssue)

  return (
    <div>
      <Typography variant="h2">Create New Issue</Typography>

      <IssueForm
        submitText="Create Issue"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateIssue}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const issue = await createIssueMutation(values)
            router.push(Routes.ShowIssuePage({ issueId: issue.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />
    </div>
  )
}

NewIssuePage.getLayout = (page) => <Layout title={"Create New Issue"}>{page}</Layout>

export default NewIssuePage
