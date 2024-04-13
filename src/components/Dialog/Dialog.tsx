import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Dialog as OriginDialog,
} from '@mui/material'
import {
  ReactNode,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import { createPortal } from 'react-dom'

export type DialogProps = {
  title?: string
  message?: string
  content?: ReactNode
  cancelable?: boolean
  onClose?: () => any
  onOk?: () => any
  onCancel?: () => any
}

export const Dialog = forwardRef<any, DialogProps>((props, ref) => {
  const [open, setOpen] = useState(false)
  const handler = {
    onOpen() {
      setOpen(true)
    },
    onClose() {
      if (open) {
        setOpen(false)
        props.onClose?.()
      }
    },
    onOk() {
      props.onOk?.()
      handler.onClose()
    },
    onCancel() {
      props.onCancel?.()
      handler.onClose()
    },
  }
  useImperativeHandle(ref, () => ({
    onOpen: handler.onOpen,
    onClose: handler.onClose,
  }))
  useEffect(() => {
    setOpen(true)
  }, [])
  return createPortal(
    <OriginDialog open={open} fullWidth onClose={handler.onClose}>
      <DialogTitle>{props.title ?? '提示'}</DialogTitle>
      <DialogContent>
        {Boolean(props.message) && !props.content && (
          <DialogContentText>{props.message}</DialogContentText>
        )}
        {Boolean(props.content) && props.content}
      </DialogContent>
      <DialogActions>
        <Button onClick={handler.onOk} color="error">
          确认
        </Button>
        {props?.cancelable && (
          <Button onClick={handler.onCancel} color={'primary'}>
            取消
          </Button>
        )}
      </DialogActions>
    </OriginDialog>,
    document.body,
  )
})
