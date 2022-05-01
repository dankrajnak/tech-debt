import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetIssue = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetIssue), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const issue = await db.issue.findFirst({ where: { id } })

  if (!issue) throw new NotFoundError()

  return issue
})
