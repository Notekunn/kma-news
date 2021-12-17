import React from 'react'

export interface DropMenuSubItemProps { }

export const DropMenuSubItem: React.FC<DropMenuSubItemProps> = (props) => {
  return <li className="menu-sub-item">{props.children}</li>
}

export interface DropMenuItemProps {
  title: string
  subItems?: Omit<DropMenuItemProps, 'subItems'>[]
}

export const DropMenuItem: React.FC<DropMenuItemProps> = React.memo(({ title, subItems }) => {
  if (!subItems || subItems.length === 0) subItems = [{ title: '' }]
  return (
    <li className="drop-menu-item">
      <div className="menu-item-title">{title}</div>
      <ul className="drop-menu-sub-list">
        {subItems.map((e, index) => (
          <DropMenuSubItem key={index}>{e.title}</DropMenuSubItem>
        ))}
      </ul>
    </li>
  )
})
