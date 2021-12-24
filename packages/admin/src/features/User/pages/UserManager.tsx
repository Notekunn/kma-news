import React, { useState } from 'react'
import { ProTable, ProTableColumns, ProTableDataSource } from '@/components/ProTable'
import { IUser } from 'shared-types'
import { Tag } from 'antd'
import { AddModal } from '@components/AddModal'
import { EditModal } from '@components/EditModal'
// import { AddUserForm } from '../components/AddUserForm'
// import { EditUserForm } from '../components/EditUserForm'
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

const data: ProTableDataSource<IUser> = []

const UserManager: React.FC = () => {
  const [modalShowing, setModalShowing] = useState<'none' | 'add' | 'edit'>('none')
  const [editingID, setEditingID] = useState('')
  return (
    <>
      <ProTable<IUser>
        tableName="Quản lý người dùng"
        columns={columns}
        items={data}
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
