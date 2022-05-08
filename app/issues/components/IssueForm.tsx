import { Form, FormProps } from "app/core/components/Form"
import RichTextEditor from "app/core/components/RichTextEditor"
import { TextField } from "mui-rff"
import { FieldArray } from "react-final-form-arrays"
import arrayMutators from "final-form-arrays"
import { z } from "zod"
import { Button, Typography } from "@mui/material"
import { Box } from "@mui/system"
export { FORM_ERROR } from "app/core/components/Form"
import DeleteForeverSharpIcon from "@mui/icons-material/DeleteForeverSharp"
import { getOrdinal } from "app/core/utils/numberUtils"

export function IssueForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S>
      {...props}
      mutators={{
        // potentially other mutators could be merged here
        ...(props.mutators ?? {}),
        ...arrayMutators,
      }}
    >
      <TextField name="name" label="Name" margin="normal" required />
      <Box sx={{ my: 3 }}>
        <Typography variant="h4" marginBottom={1}>
          What happened?
        </Typography>

        <RichTextEditor name="description" />
      </Box>

      <Box sx={{ my: 3 }}>
        <Typography variant="h4" marginBottom={1}>
          How did you work around it?
        </Typography>
        <FieldArray name="workArounds">
          {({ fields }) => {
            return (
              <Box>
                {fields.map((name, index) => (
                  <Box sx={{ display: "flex" }} key={index}>
                    <TextField
                      name={name}
                      label={getOrdinal(index + 1) + " Wokaround"}
                      multiline
                      required
                      margin="dense"
                    />
                    <Button color="error" sx={{ ml: 1 }} onClick={() => fields.remove(index)}>
                      <DeleteForeverSharpIcon />
                    </Button>
                  </Box>
                ))}
                <Button
                  variant="outlined"
                  sx={{ my: 1 }}
                  onClick={() => fields.push("")}
                  type="button"
                >
                  Add Workaround
                </Button>
              </Box>
            )
          }}
        </FieldArray>
      </Box>
    </Form>
  )
}
