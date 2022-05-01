import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteIssue = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteIssue), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const issue = await db.issue.deleteMany({ where: { id } })

  return issue
})
