import { useLoaderData } from '@modern-js/runtime/router'
import { Stack, Typography } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { TodoList } from './page.data'
import style from './page.module.scss'
import { ListTile } from '@/components/ListTile/ListTile'
import { ActionButton } from '@/components/ActionButton/ActionButton'
import { TabBar } from '@/components/TabBar/TabBar'

export default function () {
  const data = useLoaderData() as TodoList
  const [todoList, setTodoList] = useState(data)
  const [tabBarHeight, setTabBarHeight] = useState(0)
  const listRef = Array.from(new Array(data.length), () => useRef<any>(null))
  const tabBar = useRef<HTMLDivElement>()

  function deleteItem(index: number) {
    const listItem = listRef[index].current
    listItem.delete()
  }
  function handleDeleteItem(index: number) {
    setTodoList(list => list.filter((_, i) => i !== index))
  }

  useEffect(() => {
    setTabBarHeight(tabBar.current?.offsetHeight || 0)
  }, [tabBar.current])

  return (
    <div className="page">
      <Stack
        className={style.container}
        width="100%"
        style={{ '--tabbar_height': `${tabBarHeight}px` } as any}
      >
        <Typography gutterBottom variant="h5" fontWeight={700}>
          备忘录
        </Typography>
        <div className={style.list}>
          {todoList.map((item, index) => (
            <ListTile
              className={style.item}
              ref={listRef[index]}
              key={item.id}
              title={item.title}
              subtitle={item.subtitle}
              borderRadius={0}
              onDelete={() => handleDeleteItem(index)}
              rightActions={[
                <ActionButton
                  onClick={() => deleteItem(index)}
                  color="error"
                  label="删除"
                  key="delete"
                />,
              ]}
            />
          ))}
        </div>
      </Stack>
      <TabBar ref={tabBar} />
    </div>
  )
}
