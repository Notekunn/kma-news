import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { ProTable, ProTableColumns } from '@/components/ProTable'
import { IUser } from 'shared-types'
import { Tag } from 'antd'
import { AddModal } from '@components/AddModal'
import { EditModal } from '@components/EditModal'
import { AddUserForm } from '../components/AddUserForm'
import { EditUserForm } from '../components/EditUserForm'
import { getAllAction, selectUsers, selectLoading, updateAction, createAction } from '../userSlice'
const columns: ProTableColumns<IUser> = [
  {
    key: 'name',
    dataIndex: 'name',
    title: 'Họ tên',
  },
  //   {
  //     key: 'username',
  //     dataIndex: 'username',
  //     title: 'Username',
  //   },
  {
    key: 'email',
    dataIndex: 'email',
    title: 'Email',
  },
  {
    key: 'role',
    dataIndex: 'role',
    title: 'Chức năng',
    render: (value) => {
      return <Tag color="lime">{value}</Tag>
    },
  },
]

const UserManager: React.FC = () => {
  const [modalShowing, setModalShowing] = useState<'none' | 'add' | 'edit'>('none')
  const [editingID, setEditingID] = useState('')
  const dispatch = useAppDispatch()
  const users = useAppSelector(selectUsers)
  const loading = useAppSelector(selectLoading)
  useEffect(() => {
    dispatch(getAllAction())
    return () => {}
  }, [dispatch])
  // Đóng form sau khi request success
  useEffect(() => {
    if (loading === 'done' && modalShowing !== 'none') {
      setModalShowing('none')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])
  return (
    <>
      <ProTable<IUser>
        tableName="Quản lý người dùng"
        columns={columns}
        items={users || []}
        toggleAdd={() => setModalShowing('add')}
        toggleEdit={(id) => {
          setModalShowing('edit')
          setEditingID(id)
        }}
      />
      <AddModal<IUser>
        visible={modalShowing === 'add'}
        hideModal={() => setModalShowing('none')}
        loading={loading === 'pending'}
        onSubmit={(form) => {
          const { email, name, password /* , role */ } = form.getFieldsValue()
          dispatch(createAction({ email, name, password }))
        }}
      >
        <AddUserForm />
      </AddModal>
      <EditModal<IUser>
        visible={modalShowing === 'edit'}
        hideModal={() => setModalShowing('none')}
        loading={loading === 'pending'}
        onSubmit={(form) => {
          const { email, name, password /* , role */ } = form.getFieldsValue()
          dispatch(updateAction({ _id: editingID, email, name, password }))
        }}
        initialValues={users.find((e) => e._id === editingID)}
      >
        <EditUserForm />
      </EditModal>
    </>
  )
}
export default UserManager
