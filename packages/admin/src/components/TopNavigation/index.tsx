import React from 'react'
import { Layout, Menu, Badge } from 'antd'
import {
  QuestionCircleOutlined,
  BellOutlined,
  UserOutlined,
  BookOutlined,
  LogoutOutlined,
  CaretDownOutlined,
} from '@ant-design/icons'
import styles from './index.module.css'
const { Header } = Layout

export const TopNavigation = () => {
  return (
    <Header className="header" style={{ height: '50px', lineHeight: '50px' }}>
      <div className="logo" style={{ display: 'inline-block', float: 'left' }}>
        <img
          src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
          alt=""
          width="30px"
          height="30px"
        />
      </div>
      <Menu theme="dark" mode="horizontal" selectedKeys={[]} style={{ justifyContent: 'flex-end' }}>
        <Menu.Item key="1">
          <QuestionCircleOutlined />
        </Menu.Item>
        <Menu.Item key="notification">
          <Badge dot>
            <BellOutlined style={{ fontSize: '16px', color: '#fff' }} />
          </Badge>
        </Menu.Item>
        <Menu.SubMenu key="setting" icon={<CaretDownOutlined />} title="Trần Đức Cường">
          <Menu.Item key="profile" icon={<UserOutlined />} className={styles.submenu_child}>
            Trang cá nhân
          </Menu.Item>
          <Menu.Item key="follow" icon={<BookOutlined />} className={styles.submenu_child}>
            Truyện theo dõi
          </Menu.Item>
          <Menu.Item key="logout" icon={<LogoutOutlined />} className={styles.submenu_child}>
            Đăng xuất
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </Header>
  )
}
