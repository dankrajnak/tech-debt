import { IssueValidation } from "app/core/utils/validations"
import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

export default resolver.pipe(resolver.zod(IssueValidation), async ({ codeExample, ...input }) => {
  const issue = await db.issue.create({
    data: {
      ...input,
      codeExample: {
        createMany: {
          data: codeExample.map((ex) => ({
            code: ex.code,
            languageId: ex.language,
          })),
        },
      },
    },
  })

  return issue
})
