import { createPortal } from 'react-dom'
import { Loading, LoadingProps } from './Loading'

export function GlobalLoading(props: LoadingProps) {
  return createPortal(
    <div
      style={{
        position: 'fixed',
        width: '100%',
        height: '100%',
        left: '0',
        top: ' 0',
        pointerEvents: props.overlay ? 'all' : 'none',
      }}
    >
      <Loading {...props} />
    </div>,
    document.querySelector('#root')!,
  )
}
