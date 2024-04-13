import { AddCircleTwoTone } from '@mui/icons-material'
import { IconButton, Stack } from '@mui/material'
import { forwardRef } from 'react'

export type TabBarProps = {
  height?: string | number
  position?: 'top' | 'bottom'
  onMiddleClick?: () => any
}

export const TabBar = forwardRef<any, TabBarProps>((props, ref) => {
  return (
    <Stack
      ref={ref}
      position="fixed"
      width="100%"
      top={props.position === 'top' ? 0 : 'auto'}
      bottom={props.position !== 'top' ? 0 : 'auto'}
      height={props.height ?? '64px'}
      sx={{
        background: '#ffffff',
        filter: 'drop-shadow(0 0 10px #00000014)',
        borderRadius: '12px 12px 0 0',
      }}
    >
      <Stack
        width="100%"
        height="100%"
        justifyContent="center"
        alignItems="center"
        position="relative"
      >
        <IconButton
          color="default"
          onClick={props.onMiddleClick}
          sx={{
            position: 'absolute',
            width: '64px',
            height: '64px',
          }}
        >
          <AddCircleTwoTone sx={{ width: '100%', height: '100%' }} />
        </IconButton>
      </Stack>
    </Stack>
  )
})
