import React, { useCallback, useEffect } from 'react'
// import Tree from 'antd/lib/tree'
// import Divider from 'antd/lib/divider'
import { ProTable, ProTableColumns, ProTableDataSource } from '@/components/ProTable'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import {
  selectHeaderMenu,
  selectLoading,
  selectModalAction,
  selectSelectedId,
  toggleAdd,
  toggleEdit,
  toggleNone,
  updateOptionAction,
  getOptionAction,
} from '../optionSlice'
import { AddModal } from '@/components/AddModal'
import { AddMenuHeaderForm } from '../components/AddMenuHeaderForm'
import { EditModal } from '@/components/EditModal'
import { useMemo } from 'react'

// interface DataNode {
//   title: string
//   key: string
//   children?: DataNode[]
// }
interface MenuNode {
  name: string
  path: string
}
const columns: ProTableColumns<MenuNode> = [
  {
    key: 'name',
    title: 'Tên mục',
    dataIndex: 'name',
  },
  {
    key: 'path',
    title: 'Đường dẫn',
    dataIndex: 'path',
  },
]
const HeaderOptionPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const headerMenu = useAppSelector(selectHeaderMenu)
  const loading = useAppSelector(selectLoading)
  const modalAction = useAppSelector(selectModalAction)
  const selectedId = useAppSelector(selectSelectedId)
  const [menuData, setMenuData] = React.useState<ProTableDataSource<MenuNode>>([])
  useEffect(() => {
    dispatch(getOptionAction('header.menu'))
  }, [dispatch])
  useEffect(() => {
    console.log('Inside UseEffect: ', headerMenu)
    setMenuData(headerMenu.map((e, i) => ({ _id: '' + i, ...e })))
  }, [headerMenu])
  console.log('Outside:', menuData)

  const handleDelete = (id: string) => {
    console.log(`Delete id`, id)

    const newItems = menuData.filter((e, i) => i !== +id)

    console.log('Inside 2:', menuData)
    // dispatch(
    //   updateOptionAction({
    //     name: 'header.menu',
    //     value: JSON.stringify(newItems),
    //   })
    // )
  }
  // const handleDelete = useCallback(
  //   (id: string) => {
  //     const newItems = menuData.filter((e, i) => i !== +id)
  //     console.log('Inside use callback:', menuData)

  //     // dispatch(
  //     //   updateOptionAction({
  //     //     name: 'header.menu',
  //     //     value: JSON.stringify(newItems),
  //     //   })
  //     // )
  //   },
  //   [headerMenu]
  // )

  // console.log(headerMenu)
  return (
    <div
      style={{
        background: '#ffff',
      }}
    >
      {/* <Tree draggable blockNode treeData={treeData} /> */}
      <ProTable<MenuNode>
        items={menuData}
        columns={columns}
        tableName="Menu"
        onDelete={(id) => handleDelete(id)}
        toggleAdd={() => dispatch(toggleAdd('menu.add'))}
        toggleEdit={(id) =>
          dispatch(
            toggleEdit({
              id,
              modal: 'menu.edit',
            })
          )
        }
      />
      {modalAction === 'menu.add' && (
        <AddModal<MenuNode>
          visible={modalAction === 'menu.add'}
          hideModal={() => dispatch(toggleNone())}
          onSubmit={(form) => {
            const { name, path } = form.getFieldsValue()
            const newItems = [...headerMenu, { name, path }]
            dispatch(
              updateOptionAction({
                name: 'header.menu',
                value: JSON.stringify(newItems),
              })
            )
          }}
          loading={loading === 'pending'}
        >
          <AddMenuHeaderForm />
        </AddModal>
      )}
      {modalAction === 'menu.edit' && (
        <EditModal<MenuNode>
          visible={modalAction === 'menu.edit'}
          hideModal={() => dispatch(toggleNone())}
          onSubmit={(form) => {
            const { path } = form.getFieldsValue()
            const newItems = menuData.map((e, i) => {
              if (i === +selectedId) {
                return {
                  ...e,
                  path,
                }
              }
              return e
            })
            if (+selectedId >= 0) {
              dispatch(
                updateOptionAction({
                  name: 'header.menu',
                  value: JSON.stringify(newItems),
                })
              )
            }
          }}
          loading={loading === 'pending'}
          initialValues={+selectedId >= 0 ? menuData[+selectedId] : undefined}
          title="Sửa mục"
        >
          <AddMenuHeaderForm />
        </EditModal>
      )}
    </div>
  )
}

export default HeaderOptionPage
