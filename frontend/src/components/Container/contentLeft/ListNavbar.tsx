import React from 'react'
import { Link } from 'react-router-dom'
export interface ItemNavbarProps {
  title: string
}
export interface ItemNewsNavBar {
  img?: string
  description?: string
  logoSource?: string
}

export interface ItemNewsNavBarProps {
  data?: ItemNewsNavBar
}

export interface NewshorizontalProps {}
interface newSource {
  img?: string
  time?: string
  numberNewsOther?: string
}
export interface Newshorizontal {
  title?: string
  img?: Array<string>
  newsSource?: newSource
}

const dataArray: Array<ItemNewsNavBar> = [
  {
    img: 'https://photo-baomoi.zadn.vn/w300_r3x2/2021_12_13_23_41180126/7a0d7c16cc54250a7c45.jpg',
    description: 'Gần 900 ca F0 mỗi ngày, Hà Nội phong tỏa hàng loạt tuyến phố cổ',
    logoSource: 'https://photo-baomoi.zadn.vn/26dc73b3aef047ae1ee1.png',
  },
  {
    img: 'https://photo-baomoi.zadn.vn/w300_r3x2/2021_12_13_23_41180126/7a0d7c16cc54250a7c45.jpg',
    description: 'Gần 900 ca F0 mỗi ngày, Hà Nội phong tỏa hàng loạt tuyến phố cổ',
    logoSource: 'https://photo-baomoi.zadn.vn/26dc73b3aef047ae1ee1.png',
  },
  {
    img: 'https://photo-baomoi.zadn.vn/w300_r3x2/2021_12_13_23_41180126/7a0d7c16cc54250a7c45.jpg',
    description: 'Gần 900 ca F0 mỗi ngày, Hà Nội phong tỏa hàng loạt tuyến phố cổ',
    logoSource: 'https://photo-baomoi.zadn.vn/26dc73b3aef047ae1ee1.png',
  },
]

const dataArrayHorizontal: Array<Newshorizontal> = [
  {
    title: 'Tuổi thơ thiếu tình thương và ước mơ làm mẹ chưa thành sự thật của Song Hye Kyo',
    img: [
      'https://photo-baomoi.zadn.vn/w300_r4x3_sm/2021_12_16_83_41217061/905dd6c064828ddcd493.jpg',
      'https://photo-baomoi.zadn.vn/w300_r4x3/2021_12_16_83_41217061/7bdf364284006d5e3411.jpg',
      'https://photo-baomoi.zadn.vn/w300_r4x3_sm/2021_12_16_83_41217061/a08def105d52b40ced43.jpg',
      'https://photo-baomoi.zadn.vn/w300_r4x3_sm/2021_12_16_83_41217061/305570c8c28a2bd4729b.jpg',
    ],
    newsSource: {
      img: 'https://photo-baomoi.zadn.vn/26dc73b3aef047ae1ee1.png',
      time: '2 giờ',
      numberNewsOther: '60 liên quan',
    },
  },
]

export const ItemNewsNavbar: React.FC<ItemNewsNavBarProps> = ({ children, data }) => {
  return (
    <div className="item-news-navbar">
      <Link to="/">
        <div className="img-news-navbar">
          <img src={data?.img} alt="" />
        </div>
      </Link>
      <div className="description-item-news">
        <Link to="/">
          <span>{data?.description}</span>
        </Link>
        <div className="news-source">
          <Link to="/">
            <img className="logo-source" src={data?.logoSource} alt="" />
          </Link>
          <span className="news-time">2 giờ</span>
        </div>
      </div>
    </div>
  )
}

export const ItemNavbar: React.FC<ItemNavbarProps> = ({ children, title }) => {
  return (
    <div>
      <div className="title-news-navbar">{title}</div>
      <div className="list-news-navbar">
        {dataArray.map((data, index) => (
          <ItemNewsNavbar data={data} key={index} />
        ))}
      </div>
      <NewsHorizontal />
    </div>
  )
}

export const ListNavbar: React.FC<ItemNavbarProps> = ({ title }) => {
  return (
    <div className="section">
      <ItemNavbar title={title} />
    </div>
  )
}

export const NewsHorizontal: React.FC<NewshorizontalProps> = () => {
  return (
    <div className="news-horizontal">
      <div className="title-news-other-horizontal">
        <Link to="/">
          <h3>{dataArrayHorizontal[0].title}</h3>
        </Link>
      </div>
      <div className="list-news-other">
        {dataArrayHorizontal[0].img?.map((imgItem, index) => (
          <Link to="/">
            <div className="item-news-other" key={index}>
              <img src={imgItem} alt="" />
            </div>
          </Link>
        ))}
      </div>
      <div className="news-source">
        <Link to="/">
          <img className="logo-source" src={dataArrayHorizontal[0].newsSource?.img} alt="" />
        </Link>
        <span className="news-time">{dataArrayHorizontal[0].newsSource?.time}</span>
        <span className="number-news-other">
          {dataArrayHorizontal[0].newsSource?.numberNewsOther}
        </span>
      </div>
    </div>
  )
}
