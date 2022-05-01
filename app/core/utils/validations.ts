import { z } from "zod"

const IssueCodeExample = z.object({
  code: z.string(),
  language: z.number(),
})

export const IssueValidation = z.object({
  description: z.string(),
  workAround: z.array(z.string()),
  codeExample: z.array(IssueCodeExample),
})
