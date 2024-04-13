/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import { enqueueSnackbar } from 'notistack'
import { Root, createRoot } from 'react-dom/client'
import request, {
  UxRequest,
  UxResponse,
  UxResponseError,
  toIdentify,
} from './request'
import { Dialog, DialogProps } from '@/components/Dialog/Dialog'
import { GlobalLoading } from '@/components/Loading/GlobalLoading'
import { userActions } from '@/data/features/user'
import { store } from '@/data/store'

const dialogSingleton = singleton(Dialog)
const loadingSingleton = singleton(GlobalLoading)

function singleton<T = any>(Component: React.FC<T>) {
  let root: HTMLElement | null
  let container: Root | null
  return (props?: T) => {
    if (root) {
      try {
        const tmpContainer = container
        const tmpRoot = root
        setTimeout(() => {
          tmpContainer?.unmount()
          if (root === tmpRoot) {
            root = null
          }
          tmpRoot.remove()
        })
      } catch (err) {
        console.error('Fail to unmount existed singleton component. ', err)
      }
    }
    root = document.createElement('div')
    document.body.appendChild(root)
    container = createRoot(root)
    container.render(<Component {...(props as any)} />)
    return () => {
      if (root) {
        const tmpRoot = root
        setTimeout(() => {
          container?.unmount()
          if (root) {
            root.remove()
          }
          if (tmpRoot === root) {
            root = null
          }
        })
      }
    }
  }
}

async function requestHandler(
  params: UxRequest,
) {
  try {
    return await request(params)
  } catch (err: any) {
    const error: UxResponseError = err
    ux.notify(error.msg, 'error')
    if (toIdentify.includes(error.code)) {
      // 需要登录
      store.dispatch(userActions.clear())
      ux.dialog('未登录或登录信息过期，请重新登录', {
        onClose() {
          dispatchEvent(
            new CustomEvent('custom-navigate', {
              detail: { path: '/login', replace: false },
            }),
          )
        },
      })
      throw err
    }
  }
}

export namespace ux {
  export enum Theme {
    LIGHT = 'light',
    DARK = 'dark',
  }

  export enum DebounceType {
    PRE = 0b01,
    POST = 0b10,
  }
  /**
   * 防抖
   * @param fn
   * @param threshold 防抖阈值
   * @param mode 1前置触发 2后置触发 3对称触发
   */
  export function debounce(
    fn: (...args: any[]) => any,
    threshold = 1000,
    mode: DebounceType = DebounceType.POST,
  ): (...args: any[]) => ReturnType<typeof fn> {
    let timer: ReturnType<typeof setTimeout> | null
    return (...args: any[]) => {
      const register = () => {
        timer = setTimeout(() => {
          timer = null
          if (mode & 0b10) {
            /* @ts-ignore */
            return fn.apply(this, args)
          }
        }, threshold)
      }

      if (timer) {
        clearTimeout(timer)
        register()
        return
      }

      register()
      if (mode & 0b01) {
        /* @ts-ignore */
        return fn.apply(this, args)
      }
    }
  }

  /**
   * 网络请求GET
   * @param url API地址
   * @param params 请求参数
   * @param options 可选参数
   */
  export function get(
    url: string,
    params?: Record<string, string | number>,
    options: Pick<
      UxRequest,
      'onDownloadProgress' | 'onUploadProgress' | 'responseType'
    > = {},
  ) {
    return requestHandler({
      ...options,
      url,
      params,
      method: 'GET',
    })
  }
  /**
   * 网络请求POST
   * @param url API地址
   * @param data 数据
   * @param options 可选参数
   */
  export function post<T extends UxResponse | Blob | ArrayBuffer>(
    url: string,
    data?: any,
    options: Pick<
      UxRequest,
      'onDownloadProgress' | 'onUploadProgress' | 'responseType'
    > = {},
  ) {
    return requestHandler({
      ...options,
      url,
      data,
      method: 'POST',
    })
  }

  /**
   * 选择本地文件
   * @param accept 接受的文件后缀
   * @param multiple 是否接受多选
   * @description 请在then中获取选择的文件列表并进行业务操作，catch块不应作为没有选择的依据
   */
  export function chooseFile(accept?: string[], multiple = false) {
    return new Promise<FileList>((resolve, reject) => {
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = (accept ?? []).join(',')
      input.multiple = multiple
      input.onchange = () => {
        if (!input.files) {
          return reject('No File Select')
        }
        return resolve(input.files)
      }
      input.click()
    })
  }
  /**
   * 弹出对话框
   * @param message 信息
   * @param options 可选配置
   */
  export function dialog(message?: string, options?: DialogProps) {
    dialogSingleton({
      message,
      ...options,
    })
  }
  /**
   * 弹出消息提示
   * @param message 信息
   * @param variant 类型
   */
  export function notify(
    message: string,
    variant?: 'default' | 'error' | 'success' | 'warning' | 'info',
  ) {
    enqueueSnackbar({
      message,
      anchorOrigin: { horizontal: 'center', vertical: 'top' },
      variant,
      autoHideDuration: 2500,
      hideIconVariant: false,
    })
  }
  /**
   * 加载
   */
  export function loading(text?: string) {
    return loadingSingleton({
      text,
    })
  }
  export function linkTo(path: string, target?: string) {
    window.open(path, target ?? '_target')
  }

  /** 切换主题 */
  export function toggleTheme(theme: Theme) {
    document.querySelector('html')!.setAttribute('data-theme', theme)
  }
  export function getCurrentTheme(): Theme {
    return (
      document.querySelector('html')!.getAttribute('data-theme') ??
      ('light' as any)
    )
  }
}
