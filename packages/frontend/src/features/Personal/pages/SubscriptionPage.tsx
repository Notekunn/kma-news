import React from 'react'
import BoxFollow from '@/components/BoxFollow'

export const SubscriptionPage = () => {
  return (
    <div>
      <div className="user-page__header">
        <div className="user-page__title">Nguồn báo</div>
      </div>
      <div className="user-page__body">
        <BoxFollow />
        <BoxFollow />
        <BoxFollow />
      </div>
      <div className="user-page__header">
        <div className="user-page__title">Chuyên mục</div>
      </div>
      <div className="user-page__body">
        <BoxFollow />
        <BoxFollow />
        <BoxFollow />
      </div>
    </div>
  )
}
