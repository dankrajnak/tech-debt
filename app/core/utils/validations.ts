import { z } from "zod"

const IssueCodeExample = z.object({
  code: z.string(),
  language: z.number(),
})

export const CreateIssueValidation = z.object({
  name: z.string().nonempty(),
  description: z.string(),
  workArounds: z.array(z.string().nonempty()).optional(),
  codeExample: z.array(IssueCodeExample).optional(),
})
