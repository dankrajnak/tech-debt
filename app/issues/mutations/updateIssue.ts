import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateIssue = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(resolver.zod(UpdateIssue), async ({ id, ...data }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const issue = await db.issue.update({ where: { id }, data })

  return issue
})
