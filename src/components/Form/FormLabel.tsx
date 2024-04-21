import { Typography } from '@mui/material'

export function FormLabel(props: { label: string }) {
  return (
    <Typography
      sx={{
        flexGrow: 1,
        flexShrink: 0,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}
    >
      {props.label}
    </Typography>
  )
}
