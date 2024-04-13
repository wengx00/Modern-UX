import { Stack, Typography } from '@mui/material'
import {
  ChangeEvent,
  ReactElement,
  Ref,
  cloneElement,
  forwardRef,
  useMemo,
} from 'react'
import { useFormItem } from '@/hooks/useFormItem'

export type FormItemProps = {
  name: string
  label?: string
  labelPosition?: 'top' | 'left' | 'bottom' | 'right'
  spacing?: number
  children?: ReactElement
  disableHelperText?: boolean
}

function FormItemRaw(props: FormItemProps, ref: Ref<any>) {
  const controller = useFormItem(props.name)

  const direction = useMemo(() => {
    switch (props.labelPosition) {
      case 'top':
        return 'column'
      case 'left':
        return 'row'
      case 'bottom':
        return 'column-reverse'
      case 'right':
        return 'row-reverse'
      default:
        return 'column'
    }
  }, [props.labelPosition])

  const onChangeDelegate = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    // 探测是否为checkbox
    const isCheckbox = e.target.type === 'checkbox'
    const isRadio = e.target.type === 'radio'
    const value =
      isCheckbox || isRadio ? (e.target as any).checked : e.target.value
    controller.setState(value)
  }

  const memoChildren = useMemo(
    () =>
      props.children &&
      cloneElement(props.children, {
        onChange: onChangeDelegate,
        ref,
        value: controller.value ?? '',
        error: controller.error ?? false,
        helperText: props.disableHelperText ? '' : controller.helperText ?? '',
      }),
    [props.children, controller.error, controller.helperText, controller.value],
  )

  return (
    <Stack direction={direction} spacing={props.spacing ?? 1} width="100%">
      {Boolean(props.label) && (
        <Typography
          sx={{
            flexGrow: 1,
            flexShrink: 0,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {props.label}
        </Typography>
      )}
      {memoChildren}
    </Stack>
  )
}

export const FormItem = forwardRef(FormItemRaw)
