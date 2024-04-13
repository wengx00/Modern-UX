import {
  Box,
  FormControl,
  FormHelperText,
  Stack,
  Typography,
} from '@mui/material'
import { ReactElement, cloneElement } from 'react'

export type HelperItemProps = {
  control: ReactElement
  value?: boolean
  label?: ReactElement | string
  helperText?: string
  error?: boolean
  size?: 'small' | 'medium'
  variant?: 'outlined' | 'filled' | 'standard'
  onChange?: (value: boolean) => any
}

export function HelperItem(props: HelperItemProps) {
  return (
    <FormControl size={props.size} variant={props.variant}>
      <Stack alignItems="center" direction="row" width="100%">
        <Box style={{ width: 'fit-content' }}>
          {cloneElement(props.control, {
            checked: Boolean(props.value),
            size: props.size,
            onChange: props.onChange,
          })}
        </Box>
        {props.label && (
          <Typography
            style={{
              flexGrow: 1,
              flexShrink: 0,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {props.label}
          </Typography>
        )}
      </Stack>
      {props.helperText && (
        <FormHelperText error={props.error}>{props.helperText}</FormHelperText>
      )}
    </FormControl>
  )
}
