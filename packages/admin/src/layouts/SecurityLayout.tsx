import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import {
  profileAction,
  selectProfile,
  selectLoadingProfile,
  selectLoggedIn,
} from '@/features/Auth/authSlice'
import message from 'antd/lib/message'
import { BasicLayout } from './BasicLayout'

export const SecurityLayout: React.FC = (props) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const profile = useAppSelector(selectProfile)
  const loadingProfile = useAppSelector(selectLoadingProfile)
  const loggedIn = useAppSelector(selectLoggedIn)
  const redirect_url = window.location.pathname
  useEffect(() => {
    dispatch(profileAction())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (loadingProfile === 'error' || !loggedIn) {
      navigate('/auth/login', {
        state: {
          redirect_url,
        },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingProfile, loggedIn, navigate])
  useEffect(() => {
    if (profile?.role === 'user') {
      message.error('Bạn không có quyền truy cập trang này')
      return
    }
  }, [profile])
  return <BasicLayout />
}
