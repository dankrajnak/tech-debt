import { TextField } from "@mui/material"
import { forwardRef, ComponentPropsWithoutRef, PropsWithoutRef } from "react"
import { Field, useField, UseFieldConfig } from "react-final-form"

export interface LabeledTextFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: "text" | "password" | "email" | "number"
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  labelProps?: ComponentPropsWithoutRef<"label">
  fieldProps?: UseFieldConfig<string>
}

export const LabeledTextField = forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  ({ name, label, outerProps, fieldProps, labelProps, ...props }, ref) => {
    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField(name, {
      validate: (value) => (value ? undefined : "This field is required"),
      parse:
        props.type === "number"
          ? (Number as any)
          : // Converting `""` to `null` ensures empty values will be set to null in the DB
            (v) => (v === "" ? null : v),
      ...fieldProps,
    })

    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError
    const showError = !!(touched && normalizedError)

    return (
      <div {...outerProps}>
        {/* <Field /> */}
        <TextField
          ref={ref}
          label={label}
          multiline
          fullWidth
          minRows={4}
          placeholder={props.placeholder}
          {...input}
          disabled={submitting}
          error={showError}
          helperText={showError && normalizedError}
        />
      </div>
    )
  }
)

export default LabeledTextField
