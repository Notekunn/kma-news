import React from 'react'
import Form, { Rule } from 'antd/lib/form'
import Input from 'antd/lib/input'
const rules = {
  email: [
    {
      type: 'email',
      message: 'Email không hợp lệ!',
    },
    {
      required: true,
      message: 'Please input your E-mail!',
    },
  ],
  userName: [
    {
      type: 'string',
      message: 'Tên người dùng không hợp lệ!',
      pattern: /^[a-zA-Z.0-9]+$/,
    },
    {
      required: true,
      message: 'Nhập tên người dùng!',
    },
  ],
  name: [
    {
      required: true,
      message: 'Vui lòng nhập tên!',
    },
  ],
  password: [
    {
      required: true,
      pattern: /^[a-zA-Z.0-9]+$/,
      message: 'Vui lòng nhập mật khẩu hợp lệ!',
    },
  ],
  confirm: [
    {
      required: true,
      message: 'Vui lòng nhập lại mật khẩu!',
    },
    ({ getFieldValue }) => {
      return {
        validator(_, value) {
          if (!value || getFieldValue('password') === value) {
            return Promise.resolve()
          }
          return Promise.reject('Các mật khẩu đã nhập không khớp. Hãy thử lại!')
        },
      }
    },
  ],
} as { [key: string]: Rule[] }
export const EditUserForm = () => {
  return (
    <>
      <>
        <Form.Item name="email" label="E-mail" rules={rules.email}>
          <Input />
        </Form.Item>
        {/* <Form.Item name="userName" label="Tên người dùng" rules={rules.userName} hasFeedback>
          <Input />
        </Form.Item> */}
        <Form.Item name="name" label="Họ tên" rules={rules.name}>
          <Input />
        </Form.Item>
      </>
    </>
  )
}
