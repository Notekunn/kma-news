import React from 'react'
import Form, { Rule } from 'antd/lib/form'
import Input from 'antd/lib/input'

const rules = {
  title: [
    {
      required: true,
      message: 'Please input title',
    },
  ],
  slug: [
    {
      type: 'string',
      message: 'Slug không hợp lệ!',
      pattern: /^[a-zA-Z.0-9]+$/,
    },
  ],
} as { [key: string]: Rule[] }

export const AddCategoryForm: React.FC = () => {
  return (
    <>
      <Form.Item name="title" label="Tên thể loại" rules={rules.email} labelAlign="right" required>
        <Input />
      </Form.Item>
      <Form.Item name="description" label="Mô tả">
        <Input />
      </Form.Item>
    </>
  )
}
