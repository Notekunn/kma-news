import React from 'react'
import { Modal, Form, FormInstance } from 'antd'
export interface AddModalProps<T extends {} = any> {
  title?: string
  loading?: boolean
  visible?: boolean
  hideModal: () => unknown
  onSubmit: (form: FormInstance<T>) => unknown
  width?: number | string
}
function AddModalWithGeneric<T extends {} = {}>(props: React.PropsWithChildren<AddModalProps<T>>) {
  const { children, title, loading, visible, hideModal, onSubmit, width } = props
  const [form] = Form.useForm()
  return (
    <Modal
      visible={!!visible}
      title={title || 'Tạo mới'}
      okText="Create"
      cancelText="Cancel"
      //   destroyOnClose
      confirmLoading={loading}
      onCancel={hideModal}
      onOk={() => onSubmit(form)}
      width={width}
    >
      <Form layout="vertical" form={form}>
        {children}
      </Form>
    </Modal>
  )
}

export const AddModal = React.memo(AddModalWithGeneric) as typeof AddModalWithGeneric
