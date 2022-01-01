import React from 'react'
import { Link } from 'react-router-dom'

interface TopNewsProps {}
interface newSource {
  logo?: string
  time?: string
}
interface NewDataSource {
  img?: string
  description?: string
  newsSource?: newSource
}

const dataArray: Array<NewDataSource> = [
  {
    img: 'https://photo-baomoi.zadn.vn/w300_r3x2_sm/2021_12_13_83_41179601/15e38ae13aa3d3fd8ab2.jpg',
    description: 'Học sinh TP.HCM ngày đầu trở lại trường sau nửa năm học trực tuyến',
    newsSource: {
      logo: 'https://photo-baomoi.zadn.vn/6eede58338c0d19e88d1.png',
      time: '2 giờ',
    },
  },
  {
    img: 'https://photo-baomoi.zadn.vn/w300_r3x2_sm/2021_12_13_83_41179601/15e38ae13aa3d3fd8ab2.jpg',
    description: 'Học sinh TP.HCM ngày đầu trở lại trường sau nửa năm học trực tuyến',
    newsSource: {
      logo: 'https://photo-baomoi.zadn.vn/6eede58338c0d19e88d1.png',
      time: '2 giờ',
    },
  },
  {
    img: 'https://photo-baomoi.zadn.vn/w300_r3x2_sm/2021_12_13_83_41179601/15e38ae13aa3d3fd8ab2.jpg',
    description: 'Học sinh TP.HCM ngày đầu trở lại trường sau nửa năm học trực tuyến',
    newsSource: {
      logo: 'https://photo-baomoi.zadn.vn/6eede58338c0d19e88d1.png',
      time: '2 giờ',
    },
  },
]

interface ItemNewsProps {
  data: NewDataSource
}

const ItemNews: React.FC<ItemNewsProps> = ({ children, data }) => {
  return (
    <div className="col-4 item-news">
      <div className="img-item-news">
        <Link to="/">
          <img src={data.img} alt="" />
        </Link>
      </div>

      <div className="description-item-news">
        <Link to="/">
          <span>{data.description}</span>
        </Link>
        <div className="news-source">
          <Link to="/">
            <img className="logo-source" src={data.newsSource?.logo} alt="" />
          </Link>
          <span className="news-time">{data.newsSource?.time}</span>
        </div>
      </div>
    </div>
  )
}

export const TopNews: React.FC<TopNewsProps> = () => {
  return (
    <>
      <div className="section">
        <Link to="/">
          <div className="img-top">
            <img
              src="https://photo-baomoi.zadn.vn/w700_r16x9/2021_12_12_83_41174941/244da11c115ef800a14f.jpg"
              alt=""
            />
          </div>
        </Link>
        <div className="description-top">
          <div className="title-top">
            <Link to="/">Quang Hải và Công Phượng ghi bàn, tuyển Việt Nam đè bẹp Malaysia</Link>
          </div>
          <div className="news-source">
            <Link to="/">
              <img
                className="logo-source"
                src="https://photo-baomoi.zadn.vn/d59db7f26ab183efdaa0.png"
                alt=""
              />
            </Link>
            <span className="news-time">2 giờ</span>
            <span className="number-news-other">
              <Link to="/">60 liên quan</Link>
            </span>
          </div>
        </div>
      </div>
      <div className="section">
        <div className="list-news">
          {dataArray.map((e, index) => (
            <ItemNews key={index} data={e} />
          ))}
        </div>
      </div>
    </>
  )
}
