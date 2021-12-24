import React, { Suspense } from 'react'
import { Button, Result } from 'antd'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { BasicLayout } from '@/layouts/BasicLayout'
import { LoadingGlobal } from '@components/LoadingGlobal'
export const RootRoute = () => {
  return (
    <Suspense fallback={<LoadingGlobal />}>
      <Routes>
        <Route path="/" element={<BasicLayout />}>
          <Route path="*" element={<NotFound />} />
        </Route>
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
