import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateIssue = z.object({
  name: z.string(),
})

export default resolver.pipe(resolver.zod(CreateIssue), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const issue = await db.issue.create({ data: input })

  return issue
})
