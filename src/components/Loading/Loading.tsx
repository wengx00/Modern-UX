import { CircularProgress, Grow } from '@mui/material'
import { useLayoutEffect, useState } from 'react'
import css from './Loading.module.scss'

export type LoadingProps = {
  overlay?: string
  text?: string
  color?: string
}

export function Loading(props: LoadingProps) {
  const [show, setShow] = useState(false)

  useLayoutEffect(() => {
    setShow(true)
    return () => {
      setShow(false)
    }
  }, [])
  return (
    <Grow in={show}>
      <div
        className={`${css.root} ${props.overlay ? 'overlay' : ''}`}
        style={
          {
            '--bg-color': props.overlay ?? 'transparent',
            '--color': props.color ?? '#888',
          } as any
        }
      >
        <div className={css.loadingRoot}>
          <CircularProgress />
          {Boolean(props.text) && (
            <div className={css.loadingText}>{props.text}</div>
          )}
        </div>
      </div>
    </Grow>
  )
}
