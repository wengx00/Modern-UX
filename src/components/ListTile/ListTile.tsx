import { Stack, styled, SxProps, Theme, Typography } from '@mui/material'
import {
  forwardRef,
  ReactNode,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'

export type ListTileProps = {
  title: string
  subtitle?: string
  extraTitle?: ReactNode
  icon?: ReactNode
  sx?: SxProps<Theme>
  rightActions?: ReactNode[]
  borderRadius?: string | number
  className?: string
  onClick?: () => void
  onDelete?: () => any
}

const StyledRoot = styled(Stack)(() => ({
  width: '100%',
  cursor: 'default',
  borderRadius: '8px',
  overflow: 'hidden',
}))

const Scroller = styled(Stack)(() => ({
  position: 'relative',
  width: '100%',
  boxSizing: 'border-box',
  padding: '12px',
  background: '#ffffff',
  userSelect: 'none',
  touchAction: 'none',
  '&.active': {
    background: '#f5f5f5',
  },
}))

const RightActions = styled(Stack)(() => ({
  position: 'absolute',
  flexDirection: 'row',
  alignItems: 'center',
  right: 0,
  top: 0,
  height: '100%',
  transform: 'translateX(100%)',
}))

export const ListTile = forwardRef<any, ListTileProps>((props, ref) => {
  const slideInfo = useRef({
    enableSlide: false,
    startX: 0,
    transX: 0,
  })
  const rightActionsRef = useRef<HTMLDivElement>(null)
  const scroller = useRef<HTMLDivElement>(null)
  const [transX, setTransX] = useState(0)
  const [transition, setTransition] = useState(false)
  const [marginBottom, setMarginBottom] = useState(0)
  const [active, setActive] = useState(false)

  const handleTouchStart = useCallback(function (e: any) {
    setTransition(false)
    slideInfo.current.startX = e.pageX || e.touches[0].pageX || 0
    slideInfo.current.enableSlide = true
  }, [])
  const handleTouchMove = useCallback(function (e: any) {
    if (!slideInfo.current.enableSlide) {
      return
    }
    const rightActionsWidth = rightActionsRef.current!.offsetWidth
    const pageX = e.pageX || e.touches[0].pageX || 0
    let { transX } = slideInfo.current
    transX += pageX - slideInfo.current.startX
    transX = Math.min(Math.max(-rightActionsWidth, transX), 0)
    slideInfo.current.startX = pageX
    slideInfo.current.transX = transX
    setTransX(transX)
  }, [])

  const handleTouchEnd = useCallback(function () {
    slideInfo.current.enableSlide = false
    slideInfo.current.startX = 0
    const { transX } = slideInfo.current
    if (transX > -(rightActionsRef.current!.offsetWidth / 3)) {
      slideInfo.current.transX = 0
    } else {
      slideInfo.current.transX = -rightActionsRef.current!.offsetWidth
    }
    setTransition(true)
    setTransX(slideInfo.current.transX)
  }, [])

  function onClick() {
    setActive(true)
    props.onClick?.()
    setTimeout(() => setActive(false), 100)
  }

  useImperativeHandle(ref, () => ({
    delete() {
      setTransition(true)
      setMarginBottom(-scroller.current!.offsetHeight)
      console.log(-scroller.current!.offsetHeight)
      setTimeout(() => props.onDelete?.(), 250)
    },
  }))

  return (
    <StyledRoot
      className={props.className}
      sx={{ borderRadius: props.borderRadius }}
    >
      <Scroller
        onMouseDown={handleTouchStart}
        onMouseMove={handleTouchMove}
        onMouseUp={handleTouchEnd}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        ref={scroller}
        onClick={onClick}
        direction="row"
        className={active ? 'active' : ''}
        sx={{ ...props.sx }}
        style={{
          transform: `translateX(${transX}px)`,
          transition: transition ? 'all 0.25s' : 'none',
          marginBottom: `${marginBottom}px`,
        }}
      >
        <Stack
          direction="column"
          sx={{
            flex: '1 0',
            alignItems: 'center',
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: '16px',
              width: '100%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {props.title}
          </Typography>
          {props.subtitle && (
            <Typography
              sx={{
                color: '#888',
                fontSize: '14px',
                width: '100%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {props.subtitle}
            </Typography>
          )}
          {props.extraTitle}
        </Stack>
        <div style={{ flexShrink: 0 }}>{props.icon}</div>
        <RightActions ref={rightActionsRef}>{props.rightActions}</RightActions>
      </Scroller>
    </StyledRoot>
  )
})
