import request from '@/utils/request'

export enum Lane {
  EMERGENCY = 0,
  IMPORTANT = 1,
  NORMAL = 2,
  CASUAL = 3,
}

export type Tag = {
  id: number
  label: string
  color: string
}

export type TodoListItem = {
  id: number
  title: string
  subtitle: string
  remark: string
  location: string
  line: Lane
  progress: number
  startTime: string | null
  endTime: string | null
  tag: Tag[]
}

export type TodoList = TodoListItem[]

export const loader = async () => {
  try {
    const res = await request({
      url: '/getTodoList',
    })
    return res
  } catch {
    return []
  }
}
