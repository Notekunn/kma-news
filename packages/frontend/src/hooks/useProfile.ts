import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { profile as fetchProfile, selectProfile, selectLoading } from '@/features/Auth/authSlice'

export const useProfile = () => {
  const dispatch = useAppDispatch()
  const profile = useAppSelector(selectProfile)
  const loading = useAppSelector(selectLoading)
  const refetch = () => dispatch(fetchProfile())
  useEffect(() => {
    dispatch(fetchProfile())
    return () => {}
  }, [dispatch])
  return [profile, loading, refetch] as const
}
