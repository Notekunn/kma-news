import React, { useMemo, useEffect } from 'react'
import message from 'antd/lib/message'
import { ICategory } from 'shared-types'
import { ProTable, ProTableColumns } from '@/components/ProTable'
import { connect } from 'react-redux'
import { AppDispatch, RootState } from '@/app/store'
import {
  selectData,
  selectLoading,
  selectMessage,
  getAllAction,
  createAction,
  updateAction,
  deleteAction,
  selectModalAction,
  selectSelectedId,
  toggleAdd,
  toggleEdit,
  toggleNone,
} from '../categorySlice'
import { AddModal } from '@/components/AddModal'
import { EditModal } from '@/components/EditModal'
import { AddCategoryForm } from '../components/AddCategoryForm'
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
const mapStateToProps = (state: RootState) => ({
  categories: selectData(state),
  loading: selectLoading(state),
  messageContent: selectMessage(state),
  modalAction: selectModalAction(state),
  selectedID: selectSelectedId(state),
})
const mapDispatchToProps = (dispatch: AppDispatch) => ({
  fetchCategories: () => dispatch(getAllAction()),
  createCategory: (arg: Parameters<typeof createAction>[0]) => dispatch(createAction(arg)),
  updateCategory: (arg: Parameters<typeof updateAction>[0]) => dispatch(updateAction(arg)),
  deleteCategory: (arg: string) => dispatch(deleteAction(arg)),
  toggleAdd: () => dispatch(toggleAdd()),
  toggleEdit: (id: string) => dispatch(toggleEdit(id)),
  toggleNone: () => dispatch(toggleNone()),
})
type CategoryManagerProps = {
  loading: ReturnType<typeof selectLoading>
  categories: ReturnType<typeof selectData>
  messageContent: ReturnType<typeof selectMessage>
  selectedID: ReturnType<typeof selectSelectedId>
  modalAction: ReturnType<typeof selectModalAction>
} & ReturnType<typeof mapDispatchToProps>

const CategoryManager: React.FC<CategoryManagerProps> = (props) => {
  const {
    loading,
    categories,
    messageContent,
    selectedID,
    modalAction,
    fetchCategories,
    toggleAdd,
    toggleEdit,
    toggleNone,
    createCategory,
    updateCategory,
    deleteCategory,
  } = props
  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])
  useEffect(() => {
    if (loading === 'error') {
      message.error(messageContent)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])
  const edittingItem = useMemo(() => {
    return categories.find((e) => e._id === selectedID)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedID])
  return (
    <div>
      <ProTable<ICategory>
        tableName="Quản lý thể loại"
        columns={columns}
        items={categories || []}
        toggleAdd={toggleAdd}
        toggleEdit={toggleEdit}
        onDelete={deleteCategory}
      />
      {modalAction === 'add' && (
        <AddModal<ICategory>
          visible
          hideModal={toggleNone}
          onSubmit={(form) => {
            const { title, description } = form.getFieldsValue()
            createCategory({ title, description })
          }}
          loading={loading === 'pending'}
        >
          <AddCategoryForm />
        </AddModal>
      )}
      {modalAction === 'edit' && (
        <EditModal<ICategory>
          visible={modalAction === 'edit'}
          hideModal={toggleNone}
          onSubmit={(form) => {
            const { title, slug, description } = form.getFieldsValue()
            if (!selectedID) {
              message.error('Vui lòng chọn trước khi edit')
              return
            }
            updateCategory({ _id: selectedID, title, slug, description })
          }}
          loading={loading === 'pending'}
          initialValues={edittingItem}
        >
          <EditCategoryForm />
        </EditModal>
      )}
    </div>
  )
}

const CategoryManagerWithConnect = connect(mapStateToProps, mapDispatchToProps)(CategoryManager)
export default CategoryManagerWithConnect
