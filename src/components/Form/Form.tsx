import {
  ReactElement,
  Ref,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react'
import { FormContext, FormControlProtocol, FormStore } from './FormUtils'

export type FormRule = {
  required?: boolean
  pattern?: RegExp
  trigger?: 'blur' | 'submit'
  message?: string
}

export type FormRules<T = Record<string, any>> = Record<
  keyof T,
  FormRule | FormRule[]
>

export type FormRef<T = Record<string, any>> = {
  validate: () => string[]
  data: () => T
}

export type FormProps = {
  rules?: FormRules
  defaultValue?: Record<string, any>
  children?: ReactElement | ReactElement[]
}

function FormRaw(props: FormProps, ref: Ref<any>) {
  const controller = useRef(
    new FormStore<FormControlProtocol>({
      value: props.defaultValue || {},
      error: {},
      helperText: {},
    }),
  )

  function validate() {
    const errMessages: string[] = []
    Object.keys(props.rules || {}).forEach(key => {
      errMessages.push(...checkItem(key, 'submit'))
    })
    return errMessages
  }

  function checkItem(key: string, timer: 'blur' | 'submit') {
    const target = props.rules?.[key]
    const errMessages: string[] = []
    if (!target) {
      return errMessages
    }
    const { current } = controller
    const rules = Array.isArray(target) ? target : [target]
    rules.forEach(r => {
      if (timer !== 'submit' && r.trigger && r.trigger !== timer) {
        return
      }
      const value =
        current.state.value[key] === undefined ||
        current.state.value[key] === null
          ? current.state.value[key]
          : String(current.state.value[key])
      if (r.required && !value) {
        current.setState({
          error: {
            ...current.state.error,
            [key]: true,
          },
          helperText: {
            ...current.state.helperText,
            [key]: r.message ?? `${key}校验不通过`,
          },
        })
        errMessages.push(r.message ?? `${key}校验不通过`)
      } else if (r.pattern && !r.pattern.test(value)) {
        controller.current.setState({
          error: {
            ...current.state.error,
            [key]: true,
          },
          helperText: {
            ...current.state.helperText,
            [key]: r.message ?? `${key}校验不通过`,
          },
        })
        errMessages.push(r.message ?? `${key}校验不通过`)
      } else {
        // 清空状态
        controller.current.setState({
          error: {
            ...current.state.error,
            [key]: false,
          },
          helperText: {
            ...current.state.helperText,
            [key]: '',
          },
        })
      }
    })
    return errMessages
  }

  controller.current.triggerValidate = checkItem

  useImperativeHandle<any, FormRef>(ref, () => ({
    validate,
    data: () => controller.current.state.value,
  }))

  return (
    <FormContext.Provider value={controller.current}>
      {props.children}
    </FormContext.Provider>
  )
}

export const Form = forwardRef<FormRef, FormProps>(FormRaw)
