import { Palette, PaletteColor, Stack, SxProps, useTheme } from '@mui/material'
import { BaseSyntheticEvent, ReactNode } from 'react'

export type ActionButtonProps = {
  label: string
  color: keyof Palette
  prefix?: ReactNode
  suffix?: ReactNode
  sx?: SxProps
  onClick?: () => void
}

export function ActionButton(props: ActionButtonProps) {
  const theme = useTheme()

  function onClick(e: BaseSyntheticEvent) {
    e.stopPropagation()
    props.onClick?.()
  }

  return (
    <Stack
      direction="row"
      sx={{
        height: '100%',
        boxSizing: 'border-box',
        padding: '0 16px',
        alignItems: 'center',
        background: (theme.palette[props.color] as PaletteColor).main,
        color: (theme.palette[props.color] as PaletteColor).contrastText,
        ...props.sx,
      }}
      onClick={onClick}
    >
      {props.prefix}
      {props.label}
      {props.suffix}
    </Stack>
  )
}
