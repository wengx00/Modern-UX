import { ComponentType } from 'react'
import localforage from 'localforage'
import { store } from './data/store'
import { userActions } from './data/features/user'
import constants from './utils/constants'
import { systemActions } from './data/features/system'
import { ux } from './utils/ux'
import './styles/global.css'

export default (App: ComponentType, bootstrap: () => void) => {
  // 初始化
  if (process.env.MODERN_TARGET === 'browser') {
    initialize().finally(() => bootstrap())
    return
  }
  bootstrap()
}

async function initialize() {
  localforage.setDriver([localforage.LOCALSTORAGE])
  store.dispatch(
    userActions.setToken(await localforage.getItem(constants.LOCAL_TOKEN)),
  )
  store.dispatch(
    userActions.setUserInfo(
      await localforage.getItem(constants.LOCAL_USER_INFO),
    ),
  )
  store.dispatch(systemActions.flush())

  const updateSize = () => {
    store.dispatch(systemActions.flush())
    document.body.style.setProperty(
      '--vw',
      `${store.getState().system.size.width / 100}px`,
    )
    document.body.style.setProperty(
      '--vh',
      `${store.getState().system.size.height / 100}px`,
    )
  }

  /** 注册改变窗口事件 */
  window.onresize = ux.debounce(
    () => {
      updateSize()
    },
    50,
    ux.DebounceType.POST,
  )

  const themeMedia = window.matchMedia('(prefers-color-scheme: light)')
  themeMedia.addEventListener('change', ({ matches }) => {
    ux.toggleTheme(matches ? ux.Theme.LIGHT : ux.Theme.DARK)
    store.dispatch(systemActions.flushMediaTheme())
  })

  /** 初始化应用主题 */
  if (themeMedia.matches) {
    ux.toggleTheme(ux.Theme.LIGHT)
  } else {
    ux.toggleTheme(ux.Theme.DARK)
  }

  updateSize()
}
