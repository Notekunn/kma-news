import React from 'react'
import Form, { Rule } from 'antd/lib/form'
import Input from 'antd/lib/input'

const rules = {
  name: [
    {
      required: true,
      message: 'Nhập tên mục',
    },
  ],
  path: [
    {
      type: 'string',
      message: 'Nhập tên đường dẫn',
    },
  ],
} as { [key: string]: Rule[] }

export const AddMenuHeaderForm: React.FC = () => {
  return (
    <>
      <Form.Item name="name" label="Tên mục" rules={rules.name} labelAlign="right" required>
        <Input />
      </Form.Item>
      <Form.Item name="path" label="Đường dẫn" rules={rules.path} required>
        <Input />
      </Form.Item>
    </>
  )
}
