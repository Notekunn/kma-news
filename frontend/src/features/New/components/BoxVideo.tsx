import React from 'react'
import './index.css'
import { HiOutlineVideoCamera } from 'react-icons/hi'
interface Props {}

const BoxVideo: React.FC<Props> = (props) => {
  return (
    <div className="boxVideo">
      <div className="boxVideo-photo">
        <img
          src="https://photo-baomoi.zadn.vn/w300_r3x2_sm/2021_12_19_30_41248238/bb2a1e69ad2b44751d3a.jpg"
          alt="image Park-sensei"
        />
        <div className="boxVideo-photo--boxIcon">
          <HiOutlineVideoCamera className="boxVideo-photo--icon" />
        </div>
      </div>
      <div className="boxVideo-title">
        Gặp kình địch ở bán kết, HLV Park Hang-seo bất ngờ kêu một việc khó
      </div>
      <div className="boxVideo-exten">
        <img
          src="https://photo-baomoi.zadn.vn/c6b35edd839e6ac0338f.png"
          alt="logo bài báo"
          className="boxVideo-exten--brand"
        />
        <div className="boxVideo-exten--time">1 giờ</div>
        <div className="boxVideo-exten--involve">11 liên quân</div>
        <img
          src="https://baomoi-static.zadn.vn/favicons/favicon-32x32.png"
          alt="logo"
          className="boxVideo-logo"
        />
      </div>
    </div>
  )
}
export default BoxVideo
