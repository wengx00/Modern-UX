import { Outlet, useNavigate } from '@modern-js/runtime/router'
import { useEffect } from 'react'
import { Provider } from 'react-redux'
import { SnackbarProvider } from 'notistack'
import { Helmet } from '@modern-js/runtime/head'
import { ThemeProvider } from '@mui/material'
import { store } from '@/data/store'
import constants from '@/utils/constants'
import theme from '@/utils/theme'

export default function Layout() {
  const navigate = useNavigate()

  useEffect(() => {
    const navigateEventHandler = (e: CustomEvent) => {
      const { path, replace } = e.detail
      navigate(path, { replace })
    }
    window.addEventListener('custom-navigate', navigateEventHandler as any)
    return () => {
      window.removeEventListener('custom-navigate', navigateEventHandler as any)
    }
  })
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Helmet>
          <title>{`${constants.APP_TITLE}`}</title>
          <meta name="author" content={`${constants.APP_AUTHOR}`} />
          <meta name="version" content={`${constants.APP_VERSION}`} />
          <meta name="description" content={`${constants.APP_DESCRIPTION}`} />
          <link
            rel="icon"
            type="image/x-icon"
            href="https://lf3-static.bytednsdoc.com/obj/eden-cn/uhbfnupenuhf/favicon.ico"
          />
        </Helmet>
        <SnackbarProvider />
        <Outlet />
      </Provider>
    </ThemeProvider>
  )
}
