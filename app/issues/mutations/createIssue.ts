import { CreateIssueValidation } from "app/core/utils/validations"
import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

export default resolver.pipe(resolver.zod(CreateIssueValidation), async ({ ...input }) => {
  const issue = await db.issue.create({
    data: {
      ...input,
    },
  })

  return issue
})
