import { createTheme } from '@mui/material'
import { zhCN } from '@mui/material/locale'

const theme = createTheme(
  {
    breakpoints: {
      values: {
        xs: 0,
        sm: 390,
        md: 720,
        lg: 960,
        xl: 1080,
      },
    },
  },
  zhCN,
)

export default theme
