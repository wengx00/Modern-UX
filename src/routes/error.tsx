import { useRouteError } from '@modern-js/runtime/router'
import { ErrorOutline } from '@mui/icons-material'
import { Stack, Typography } from '@mui/material'

export default function () {
  const error = useRouteError() as Error
  console.error(error)

  return (
    <Stack
      width="100%"
      height="100vh"
      justifyContent="center"
      alignItems="center"
      spacing={1}
    >
      <Typography>页面崩溃了</Typography>
      <ErrorOutline color="error" sx={{ fontSize: 32 }} />
    </Stack>
  )
}
