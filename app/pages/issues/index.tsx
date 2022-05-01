import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getIssues from "app/issues/queries/getIssues"

const ITEMS_PER_PAGE = 100

export const IssuesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ issues, hasMore }] = usePaginatedQuery(getIssues, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {issues.map((issue) => (
          <li key={issue.id}>
            <Link href={Routes.ShowIssuePage({ issueId: issue.id })}>
              <a>{issue.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
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
        <p>
          <Link href={Routes.NewIssuePage()}>
            <a>Create Issue</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <IssuesList />
        </Suspense>
      </div>
    </>
  )
}

IssuesPage.getLayout = (page) => <Layout>{page}</Layout>

export default IssuesPage
