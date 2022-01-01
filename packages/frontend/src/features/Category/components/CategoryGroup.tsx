import React from 'react'
import { Link } from 'react-router-dom'
export interface CategoryGroupItemProps {
  slug: string
}

export const CategoryGroupItem: React.FC<CategoryGroupItemProps> = (props) => {
  return (
    <Link to={`/the-loai/${props.slug}`}>
      <li className="menu-sub-item">{props.children}</li>
    </Link>
  )
}

export interface CategoryGroupProps {
  title: string
  slug: string
  subItems?: Omit<CategoryGroupProps, 'subItems'>[]
}

export const CategoryGroup: React.FC<CategoryGroupProps> = React.memo(({ title, subItems }) => {
  if (!subItems || subItems.length === 0) subItems = [{ title: '', slug: '' }]
  return (
    <li className="drop-menu-item">
      <div className="menu-item-title">
        <Link to="/">{title}</Link>
      </div>
      <ul className="drop-menu-sub-list">
        {subItems.map((e, index) => (
          <CategoryGroupItem key={index} slug={e.slug}>
            {e.title}
          </CategoryGroupItem>
        ))}
      </ul>
    </li>
  )
})
