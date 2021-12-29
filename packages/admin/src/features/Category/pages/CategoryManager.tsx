import React, { useEffect, useState } from 'react'
import { ICategory } from 'shared-types'
import { AddModal } from '@/components/AddModal'
import { ProTable, ProTableColumns } from '@/components/ProTable'
import { AddCategoryForm } from '../components/AddCategoryForm'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { getAllAction, selectData, selectLoading } from '../categorySlice'
import { EditModal } from '@/components/EditModal'
import { EditCategoryForm } from '../components/EditCategoryForm'
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
  const [editingID, setEditingID] = useState('')
  const categories = useAppSelector(selectData)
  const loading = useAppSelector(selectLoading)
  const [modalShowing, setModalShowing] = useState<'none' | 'add' | 'edit'>('none')
  useEffect(() => {
    dispatch(getAllAction())
  }, [dispatch])
  return (
    <div>
      <ProTable<ICategory>
        tableName="Quản lý thể loại"
        columns={columns}
        items={categories || []}
        toggleAdd={() => setModalShowing('add')}
        toggleEdit={(id) => {
          setModalShowing('edit')
          setEditingID(id)
        }}
      />
      <AddModal<ICategory>
        visible={modalShowing === 'add'}
        hideModal={() => setModalShowing('none')}
        onSubmit={(form) => {}}
        loading={loading === 'pending'}
      >
        <AddCategoryForm />
      </AddModal>
      <EditModal<ICategory>
        visible={modalShowing === 'edit'}
        hideModal={() => setModalShowing('none')}
        onSubmit={(form) => {}}
        loading={loading === 'pending'}
        initialValues={categories.find((e) => e._id === editingID)}
      >
        <EditCategoryForm />
      </EditModal>
    </div>
  )
}

export default CategoryManager
