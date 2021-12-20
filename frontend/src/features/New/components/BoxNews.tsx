import React from 'react'
import './page_Render.css'
import { HiOutlineVideoCamera } from 'react-icons/hi'
interface Props {}

const BoxNews: React.FC<Props> = (props) => {
  return (
    <div className="boxNews">
      <div className="boxNews-photo">
        <img
          className="news-photo"
          src="https://photo-baomoi.zadn.vn/w300_r3x2_sm/2021_12_19_30_41248238/bb2a1e69ad2b44751d3a.jpg"
          alt="image Park-sensei"
        />
        <div className="boxNews-photo--boxIcon">
          <HiOutlineVideoCamera className="boxNews-photo--icon" />
        </div>
      </div>
      <div className="boxNews-left">
        <div className="boxNews-title">
          Gặp kình địch ở bán kết, HLV Park Hang-seo bất ngờ kêu một việc khó.
        </div>
        <div className="boxNews-exten">
          <img
            src="https://photo-baomoi.zadn.vn/c6b35edd839e6ac0338f.png"
            alt="logo bài báo"
            className="boxNews-exten--brand"
          />
          <div className="boxNews-exten--time">1 giờ</div>
          <div className="boxNews-exten--involve">11 liên quân</div>
          <img
            src="https://baomoi-static.zadn.vn/favicons/favicon-32x32.png"
            alt="logo"
            className="boxNews-logo"
          />
        </div>
      </div>
    </div>
  )
}
export default BoxNews
