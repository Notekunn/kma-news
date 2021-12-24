import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { ProTable, ProTableColumns, ProTableDataSource } from '@/components/ProTable'
import { IUser } from 'shared-types'
import { Tag } from 'antd'
import { AddModal } from '@components/AddModal'
import { EditModal } from '@components/EditModal'
// import { AddUserForm } from '../components/AddUserForm'
// import { EditUserForm } from '../components/EditUserForm'
import { getAll, selectUsers } from '../userSlice'
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
  useEffect(() => {
    dispatch(getAll())
    return () => {}
  }, [dispatch])
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
      {/* <AddModal<IUser>
        visible={modalShowing === 'add'}
        hideModal={() => setModalShowing('none')}
        loading
        onSubmit={(form) => {
          // const { username, email } = form.getFieldsValue()
        }}
      >
        <AddUserForm />
      </AddModal> */}
      {/* <EditModal<Entity.User>
        visible={modalShowing === 'edit'}
        hideModal={() => setModalShowing('none')}
        onSubmit={(form) => {
          // const { username, email } = form.getFieldsValue()
        }}
        initialValues={data.find((e) => e.id === editingID)}
      >
        <EditUserForm />
      </EditModal> */}
    </>
  )
}
export default UserManager
