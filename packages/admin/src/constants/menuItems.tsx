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
        title: 'Quản lý thể loại tin tức',
      },

      {
        key: 'posts',
        title: 'Quản lý bài viết',
      },
      {
        key: 'chapters',
        title: 'Quản lý nhóm',
      },
    ],
  },
  {
    key: 'request',
    title: 'Quản lý yêu cầu',
    icon: <SwapOutlined />,
  },
]
