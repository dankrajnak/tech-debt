import "react-quill/dist/quill.snow.css"
import { useField, UseFieldConfig } from "react-final-form"
import { dynamic } from "blitz"
import { Skeleton, Typography } from "@mui/material"
import { useId } from "react"
import theme from "../styles/theme"

type Props = {
  name: string
  fieldProps?: UseFieldConfig<string>
}

const QUILL_HEIGHT = 200

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <Skeleton height={QUILL_HEIGHT + 45} />,
})

const RichTextEditor = ({ name, fieldProps }: Props) => {
  const {
    input,
    meta: { error, submitError },
  } = useField(name, fieldProps)

  const normalizedError = (Array.isArray(error) ? error.join(", ") : error) || submitError
  const showError = !!normalizedError

  return (
    <div>
      <div className="container">
        <ReactQuill defaultValue={input.value} onChange={(content) => input.onChange(content)}>
          <div style={{ height: QUILL_HEIGHT }} />
        </ReactQuill>
      </div>
      {showError && (
        <Typography variant="caption" color={theme.palette.error.main}>
          {normalizedError}
        </Typography>
      )}
      {showError && (
        <style jsx>{`
          .container {
            border: 1px solid ${theme.palette.error.main} !important;
          }
        `}</style>
      )}
    </div>
  )
}

export default RichTextEditor
