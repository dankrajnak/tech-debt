import { ReactNode, PropsWithoutRef } from "react"
import { Form as FinalForm, FormProps as FinalFormProps } from "react-final-form"
import { z } from "zod"
import { validateZodSchema } from "blitz"
import { Alert } from "@mui/material"
export { FORM_ERROR } from "final-form"
import LoadingButton from "@mui/lab/LoadingButton"

export interface FormProps<S extends z.ZodType<any, any>>
  extends Omit<PropsWithoutRef<JSX.IntrinsicElements["form"]>, "onSubmit"> {
  /** All your form fields */
  children?: ReactNode
  /** Text to display in the submit button */
  submitText?: string
  schema?: S
  onSubmit: FinalFormProps<z.infer<S>>["onSubmit"]
  initialValues?: FinalFormProps<z.infer<S>>["initialValues"]
  mutators?: FinalFormProps<z.infer<S>>["mutators"]
}

export function Form<S extends z.ZodType<any, any>>({
  children,
  submitText,
  schema,
  initialValues,
  onSubmit,
  mutators,
  ...props
}: FormProps<S>) {
  return (
    <FinalForm
      initialValues={initialValues}
      validate={validateZodSchema(schema)}
      onSubmit={onSubmit}
      mutators={mutators}
      render={({ handleSubmit, submitting, submitError }) => (
        <form onSubmit={handleSubmit} className="form" {...props}>
          {/* Form fields supplied as children are rendered here */}
          {children}

          {submitError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {" "}
              {submitError}
            </Alert>
          )}

          {submitText && (
            <LoadingButton sx={{ mt: 2 }} type="submit" variant="contained" loading={!!submitting}>
              {submitText}
            </LoadingButton>
          )}
        </form>
      )}
    />
  )
}

export default Form
