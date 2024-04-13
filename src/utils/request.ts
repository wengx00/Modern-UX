import axios, { AxiosError, AxiosProgressEvent, ResponseType } from 'axios'
import constants from './constants'

export type UxRequest = {
  url: string
  method?: 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH'
  data?: Record<string, any> | Record<string, any>[] | FormData | null
  params?: Record<string, any> | null
  responseType?: ResponseType
  onUploadProgress?: (progress: AxiosProgressEvent) => any
  onDownloadProgress?: (progress: AxiosProgressEvent) => any
}

export class UxResponseError {
  code!: number

  msg!: string

  constructor({ code, msg }: { code: number; msg: string }) {
    this.code = code
    this.msg = msg
  }
}

export type UxResponseData =
  | Record<string, any>
  | Array<any>
  | string
  | number
  | null

export type UxResponse<T extends UxResponseData = null> = {
  code: number
  msg: string
  data: T
}

// 需要重新身份认证的状态码
export const toIdentify = [401]

export default async function request(params: UxRequest) {
  const { onDownloadProgress, onUploadProgress } = params
  const getData = () => {
    if (!params.method || params.method === 'GET') {
      return undefined
    }
    return params.data ?? {}
  }
  const getParams = () => {
    if (!params.method || params.method === 'GET') {
      return { ...params.data, ...params.params }
    }
    return params.params ?? undefined
  }
  const getHeaders = () => {
    if (Boolean(params.method) && params.method !== 'GET') {
      return {
        'Content-Type':
          params.data instanceof FormData
            ? 'multipart/form-data'
            : 'application/json',
      }
    }
    return undefined
  }

  const instance = axios.create({
    baseURL: constants.API_BASE,
    timeout: 10000,
  })

  instance.interceptors.response.use(
    response => {
      if (
        Boolean(response.config.responseType) &&
        response.config.responseType !== 'json'
      ) {
        return response
      }
      const res: UxResponse<any> = response.data
      if (res.code !== 200) {
        return Promise.reject(
          new UxResponseError({
            code: res.code ?? 500,
            msg: res.msg || '请求出错',
          }),
        )
      }
      return res.data
    },
    (error: AxiosError) => {
      return Promise.reject(
        new UxResponseError({
          code: error.response?.status ?? error.status ?? 500,
          msg: error.message || '服务器内部错误',
        }),
      )
    },
  )

  return await instance.request({
    url: params.url,
    method: params.method ?? 'GET',
    data: getData(),
    params: getParams(),
    headers: getHeaders(),
    responseType: params.responseType,
    onUploadProgress,
    onDownloadProgress,
  })
}
