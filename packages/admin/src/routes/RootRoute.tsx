import React, { Suspense } from 'react'
import { Button, Result } from 'antd'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { BasicLayout } from '@/layouts/BasicLayout'
import { LoadingGlobal } from '@components/LoadingGlobal'
import { BlankLayout } from '@/layouts/BlankLayout'
const LoginPage = React.lazy(() => import('@/features/Auth/pages/LoginPage'))
export const RootRoute = () => {
  return (
    <Suspense fallback={<LoadingGlobal />}>
      <Routes>
        <Route path="/admin" element={<BasicLayout />}>
          <Route path="user" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/auth" element={<BlankLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/" element={<BasicLayout />} />
      </Routes>
    </Suspense>
  )
}

function NotFound() {
  const navigate = useNavigate()
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      }
    />
  )
}
