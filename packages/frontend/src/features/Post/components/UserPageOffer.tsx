import React from 'react'
import { BoxOffer } from './BoxOffer'

export const UserPageOffer = () => {
  return (
    <div>
      <div className="user-page__header">
        <div className="user-page__title">Đề xuất</div>
      </div>
      <BoxOffer />
      <BoxOffer />
      <BoxOffer />
      <BoxOffer />
      <BoxOffer />
    </div>
  )
}
