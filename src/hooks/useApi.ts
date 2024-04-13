import { useState } from 'react'
import { ux } from '@/utils/ux'

export type ApiMethod<T, K> = (data: T, ...args: any[]) => Promise<K>

/**
 * Hook：对接口方法的调用封装
 * @description 用法类似React中的`useState`。实现了对API的标准化调用和加载动画、错误提示、成功提示的统一控制。
 * @param api API异步方法
 * @param options 可选配置:
 * @returns 返回一个二元组（即仅包含两个元素的数组）
 * *    第一个元素：`Ref<T>`响应式对象，`T`的类型由传入Hook的API方法的返回值`Promise<T>`推导
 * *    第二个元素：函数，发起API请求，会根据请求结果自动更新第一个元素的响应式对象的`value`
 */
export function useApi<T = void, K = null>(
  api: ApiMethod<T, K>,
  options?: {
    showLoading?: boolean // 默认true
    successMsg?: string
  },
): [K, (param: T, ...args: any[]) => Promise<K>] {
  const [result, setResult] = useState<K>()
  return [
    result!,
    async (param, ...args) => {
      let loader: ReturnType<typeof ux.loading> | null = null
      if (options?.showLoading !== false) {
        loader = ux.loading()
      }
      try {
        const res = await api(param, ...args)
        setResult(res)
        loader?.()
        if (options?.successMsg) {
          ux.notify(options.successMsg, 'success')
        }
        return res
      } catch (err: any) {
        loader?.()
        // throw err
        throw err
      }
    },
  ]
}
