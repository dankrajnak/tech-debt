import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createIssue from "app/issues/mutations/createIssue"
import { IssueForm, FORM_ERROR } from "app/issues/components/IssueForm"
import { Button, Typography } from "@mui/material"
import { CreateIssueValidation } from "app/core/utils/validations"

const NewIssuePage: BlitzPage = () => {
  const router = useRouter()
  const [createIssueMutation] = useMutation(createIssue)

  return (
    <div>
      <Typography variant="h2" mb={3}>
        Create New Issue
      </Typography>

      <IssueForm
        submitText="Save"
        schema={CreateIssueValidation}
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

NewIssuePage.getLayout = (page) => (
  <Layout
    title="Create New Issue"
    toolbar={[
      <Link key={0} href={Routes.IssuesPage()}>
        <Button>Back</Button>
      </Link>,
    ]}
  >
    {page}
  </Layout>
)

export default NewIssuePage
