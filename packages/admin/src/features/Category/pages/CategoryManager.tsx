import React, { useEffect, useState } from 'react'
import message from 'antd/lib/message'
import { ICategory } from 'shared-types'
import { AddModal } from '@/components/AddModal'
import { ProTable, ProTableColumns } from '@/components/ProTable'
import { AddCategoryForm } from '../components/AddCategoryForm'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import {
  selectData,
  selectLoading,
  selectMessage,
  getAllAction,
  createAction,
  updateAction,
  deleteAction,
} from '../categorySlice'
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
  const messageContent = useAppSelector(selectMessage)
  const [modalShowing, setModalShowing] = useState<'none' | 'add' | 'edit'>('none')
  useEffect(() => {
    dispatch(getAllAction())
  }, [dispatch])
  useEffect(() => {
    if (loading === 'done' && modalShowing !== 'none') {
      setModalShowing('none')
    }
    if (loading === 'error') {
      message.error(messageContent)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])
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
        onDelete={(id) => dispatch(deleteAction(id))}
      />
      <AddModal<ICategory>
        visible={modalShowing === 'add'}
        hideModal={() => setModalShowing('none')}
        onSubmit={(form) => {
          const { title, description } = form.getFieldsValue()
          dispatch(createAction({ title, description }))
        }}
        loading={loading === 'pending'}
      >
        <AddCategoryForm />
      </AddModal>
      <EditModal<ICategory>
        visible={modalShowing === 'edit'}
        hideModal={() => setModalShowing('none')}
        onSubmit={(form) => {
          const { title, slug, description } = form.getFieldsValue()
          dispatch(updateAction({ _id: editingID, title, slug, description }))
        }}
        loading={loading === 'pending'}
        initialValues={categories.find((e) => e._id === editingID)}
      >
        <EditCategoryForm />
      </EditModal>
    </div>
  )
}

export default CategoryManager
