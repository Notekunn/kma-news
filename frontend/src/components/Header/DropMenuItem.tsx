import React from 'react'
import { Link } from 'react-router-dom'
export interface DropMenuSubItemProps {}

export const DropMenuSubItem: React.FC<DropMenuSubItemProps> = (props) => {
  return (
    <Link to="/">
      <li className="menu-sub-item">{props.children}</li>
    </Link>
  )
}

export interface DropMenuItemProps {
  title: string
  subItems?: Omit<DropMenuItemProps, 'subItems'>[]
}

export const DropMenuItem: React.FC<DropMenuItemProps> = React.memo(({ title, subItems }) => {
  if (!subItems || subItems.length === 0) subItems = [{ title: '' }]
  return (
    <li className="drop-menu-item">
      <div className="menu-item-title">
        <Link to="/">{title}</Link>
      </div>
      <ul className="drop-menu-sub-list">
        {subItems.map((e, index) => (
          <DropMenuSubItem key={index}>{e.title}</DropMenuSubItem>
        ))}
      </ul>
    </li>
  )
})
