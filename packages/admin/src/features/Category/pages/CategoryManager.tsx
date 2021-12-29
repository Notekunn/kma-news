import { ProTable, ProTableColumns } from '@/components/ProTable'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { getAllAction, selectData } from '../categorySlice'
import { ICategory } from 'shared-types'
import React, { useEffect } from 'react'
const columns: ProTableColumns<ICategory> = [
  {
    key: 'title',
    dataIndex: 'title',
    title: 'Tên thể loại',
  },
  {
    key: 'slug',
    dataIndex: 'slug',
    title: 'Slug',
  },
  {
    key: 'description',
    dataIndex: 'description',
    title: 'Mô tả',
  },
]
const CategoryManager: React.FC = () => {
  const dispatch = useAppDispatch()
  const categories = useAppSelector(selectData)
  useEffect(() => {
    dispatch(getAllAction())
  }, [dispatch])
  return (
    <div>
      <ProTable<ICategory>
        tableName="Quản lý thể loại"
        columns={columns}
        items={categories || []}
      />
    </div>
  )
}

export default CategoryManager
