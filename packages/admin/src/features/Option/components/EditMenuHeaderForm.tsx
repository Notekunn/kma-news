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

export const EditMenuHeaderForm: React.FC = () => {
  return (
    <>
      <Form.Item name="path" label="Đường dẫn" rules={rules.path} required>
        <Input />
      </Form.Item>
    </>
  )
}
