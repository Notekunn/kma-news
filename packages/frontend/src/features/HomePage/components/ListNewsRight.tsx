import React from 'react'
import { Link } from 'react-router-dom'

export interface NewDataSource {
  img?: string
  description?: string
  newSource?: newSource
}

export interface ItemNewsProps {
  data?: NewDataSource
}

export interface NewshorizontalProps {}

interface newSource {
  logo?: string
  time?: string
  numberNewsOther?: string
}

const dataArray: Array<NewDataSource> = [
  {
    img: 'https://photo-baomoi.zadn.vn/w300_r3x2/2021_12_13_23_41180126/7a0d7c16cc54250a7c45.jpg',
    description: 'Gần 900 ca F0 mỗi ngày, Hà Nội phong tỏa hàng loạt tuyến phố cổ',
    newSource: {
      logo: 'https://photo-baomoi.zadn.vn/26dc73b3aef047ae1ee1.png',
      time: '2 giờ',
      numberNewsOther: '60 liên quan',
    },
  },
]

export const ItemNews: React.FC<ItemNewsProps> = ({ children, data }) => {
  return (
    <div className="item-news-navbar">
      <div className="img-news-navbar">
        <Link to="/">
          <img src={data?.img} alt="" />
        </Link>
      </div>
      <div className="description-item-news">
        <Link to="/">
          <span>{data?.description}</span>
        </Link>
        <div className="news-source">
          <Link to="/">
            <img className="logo-source" src={data?.newSource?.logo} alt="" />
          </Link>
          <span className="news-time">{data?.newSource?.time}</span>
          <span className="number-news-other">
            <Link to="/">{data?.newSource?.numberNewsOther}</Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export const ListNewsRight: React.FC<NewDataSource> = () => {
  return (
    <div className="section">
      <div className="list-news-right">
        {dataArray.map((e, index) => (
          <ItemNews key={index} data={e} />
        ))}
      </div>
    </div>
  )
}
