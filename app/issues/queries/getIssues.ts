import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetIssuesInput
  extends Pick<Prisma.IssueFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(async ({ where, orderBy, skip = 0, take = 100 }: GetIssuesInput) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const {
    items: issues,
    hasMore,
    nextPage,
    count,
  } = await paginate({
    skip,
    take,
    count: () => db.issue.count({ where }),
    query: (paginateArgs) => db.issue.findMany({ ...paginateArgs, where, orderBy }),
  })

  return {
    issues,
    nextPage,
    hasMore,
    count,
  }
})
