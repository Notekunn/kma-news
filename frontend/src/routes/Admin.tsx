import React from 'react'
import { SecurityLayout } from '@/layouts/SecurityLayout'
import { Route, Routes } from 'react-router-dom'

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin" element={<SecurityLayout role="writter" />}>
        <Route path="" element={<AdminHome />} />
      </Route>
    </Routes>
  )
}

function AdminHome() {
  return (
    <div
      style={{
        width: '100vh',
        backgroundColor: 'red',
      }}
    >
      Admin Home Admin Home Admin Home Admin Home Admin Home Admin Home Admin Home Admin Home Admin
      Home Admin Home Admin Home Admin Home Admin Home Admin Home Admin Home Admin Home Admin Home
      Admin Home Admin Home Admin Home Admin Home Admin Home Admin Home Admin Home Admin Home Admin
      Home Admin Home Admin Home Admin Home Admin Home Admin Home Admin Home Admin Home Admin Home
      Admin Home Admin Home Admin Home Admin Home Admin Home Admin Home Admin Home Admin Home Admin
      Home Admin Home
    </div>
  )
}
