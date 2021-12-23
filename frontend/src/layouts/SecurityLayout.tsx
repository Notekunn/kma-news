import React from 'react'
import { useProfile } from '@/hooks/useProfile'
import { Outlet, useNavigate } from 'react-router-dom'
interface SecurityLayoutProps {
  role: Entity.UserRole
}
export const SecurityLayout: React.FC<SecurityLayoutProps> = (props) => {
  const navigate = useNavigate()
  const [profile, loading] = useProfile()
  if (loading === 'pending') return <p>Loading...</p>
  if (!profile || loading === 'error') {
    // Trở về trang chủ
    navigate('/')
    return null
  }
  return (
    <div>
      <Outlet />
    </div>
  )
}
