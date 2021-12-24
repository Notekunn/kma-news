import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { profileAction, selectProfile, selectLoading } from '@/features/Auth/authSlice'
import { BasicLayout } from './BasicLayout'

export const SecurityLayout: React.FC = (props) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const profile = useAppSelector(selectProfile)
  const loading = useAppSelector(selectLoading)
  useEffect(() => {
    dispatch(profileAction())
  }, [dispatch])

  useEffect(() => {
    if (loading === 'error' || (loading === 'done' && !profile)) {
      navigate('/auth/login')
    }
  }, [loading, navigate, profile])
  return <BasicLayout />
}
