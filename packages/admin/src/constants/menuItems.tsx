import { SwapOutlined, DashboardOutlined } from '@ant-design/icons'
export interface MenuTree {
  title: string
  key: string
  url?: string
  icon?: React.ReactNode
  subMenu?: MenuTree[]
}
export const sideNavigateMenu: MenuTree[] = [
  {
    key: 'admin',
    title: 'Dashboard',
    icon: <DashboardOutlined />,
    subMenu: [
      {
        key: 'users',
        title: 'Quản lý user',
      },
      {
        key: 'categories',
        title: 'Quản lý thể loại truyện',
      },
      {
        key: 'artists',
        title: 'Quản lý tác giả',
      },
      {
        key: 'groups',
        title: 'Quản lý nhóm dịch',
      },
      {
        key: 'mangas',
        title: 'Quản lý truyện',
      },
      {
        key: 'chapters',
        title: 'Quản lý chương',
      },
    ],
  },
  {
    key: 'request',
    title: 'Quản lý yêu cầu',
    icon: <SwapOutlined />,
  },
]
