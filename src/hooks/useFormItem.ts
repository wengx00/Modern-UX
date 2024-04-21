import { useContext, useEffect, useState } from 'react'
import { FormContext } from '@/components/Form/FormUtils'

export type FormItemProtocol = {
  helperText?: string
  error?: boolean
  value: any
  setState: (v: any) => any
  triggerValidate: (key: string, trigger: 'blur' | 'submit') => string[]
}

export function useFormItem(key: string) {
  const context = useContext(FormContext)
  const [, forceUpdate] = useState({})

  useEffect(() => {
    const unsubscribe = context.subscribe(
      _ => {
        forceUpdate({})
      },
      [`value.${key}`, `error.${key}`, `helperText.${key}`],
    )
    return unsubscribe
  }, [])

  function setState(value: any) {
    context.setState({
      value: {
        ...context.state.value,
        [key]: value,
      },
    })
  }

  return {
    value: context.state.value[key],
    error: context.state.error[key],
    helperText: context.state.helperText[key],
    triggerValidate: context.triggerValidate,
    setState,
  } as FormItemProtocol
}
