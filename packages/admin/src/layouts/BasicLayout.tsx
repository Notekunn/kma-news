import React from 'react'
import { Layout } from 'antd'
import { SideNavigation } from '@components/SideNavigation'
import { TopNavigation } from '@components/TopNavigation'
import { Breadcrumb } from '@components/Breadcrumb'
import { Outlet } from 'react-router-dom'

const { Content } = Layout

export const BasicLayout: React.FC = (props) => {
  return (
    <Layout>
      <TopNavigation />
      <Layout>
        <SideNavigation />
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb />
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: '100vh',
              overflowY: 'scroll',
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}
