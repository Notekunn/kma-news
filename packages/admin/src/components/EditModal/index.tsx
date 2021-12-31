import React from 'react'
import { Modal, Form, FormInstance } from 'antd'
export interface EditModalProps<T extends {} = any> {
  title?: string
  loading?: boolean
  visible?: boolean
  hideModal: () => unknown
  onSubmit: (form: FormInstance<T>) => unknown
  initialValues?: Partial<T>
  width?: number | string
}
function EditModalWithGeneric<T extends {} = any>(
  props: React.PropsWithChildren<EditModalProps<T>>
) {
  const { children, title, loading, visible, hideModal, onSubmit, initialValues, width } = props

  const [form] = Form.useForm<T>()
  return (
    <Modal
      visible={!!visible}
      title={title || 'Chỉnh sửa'}
      okText="Update"
      cancelText="Cancel"
      destroyOnClose
      // forceRender={true}
      confirmLoading={loading}
      onCancel={hideModal}
      onOk={() => onSubmit(form)}
      width={width}
    >
      <Form layout="vertical" form={form} initialValues={initialValues || {}}>
        {children}
      </Form>
    </Modal>
  )
}
// const areEqual = (prevProps:React.PropsWithChildren<EditModalProps>, nextProps:React.PropsWithChildren<EditModalProps>) => {
//     return pre
// }
export const EditModal = React.memo(EditModalWithGeneric) as typeof EditModalWithGeneric
