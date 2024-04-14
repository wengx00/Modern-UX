import { createTheme } from '@mui/material'
import { zhCN } from '@mui/material/locale'

const theme = createTheme(
  {
    breakpoints: {
      values: {
        xs: 0,
        sm: 480,
        md: 768,
        lg: 834,
        xl: 1024,
      },
    },
  },
  zhCN,
)

export default theme
