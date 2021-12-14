import React from 'react'
import { AiOutlineUser, AiOutlineMenu } from 'react-icons/ai'
import { BsSearch } from 'react-icons/bs'
import { useState } from 'react'
const Header = () => {
  const [active,setActive] = useState(false);
  return (
    <div className="header">
      <div className="col-9 header-top">
        <div className="header-top-left">
          <div className="logo">
            <div className="logo-main">
              <span>
                BAOM
                <img src="https://baomoi-static.zadn.vn/favicons/favicon-32x32.png" alt="logo" />I
              </span>
            </div>
            <span className="logo-description">trang thông tin điện tử</span>
          </div>
          <div className="header-input">
            <input type="text" placeholder="Nhập nội dung tìm kiếm" />
            <div className="icon-search">
              <BsSearch />
            </div>
          </div>
        </div>
        <div className="header-top-right">
          <AiOutlineUser size="22px" />
        </div>
      </div>
      <div className="header-body">
        <div className="col-9 header-navbar">
          <ul className="header-navbar-list">
            <li className="header-navbar-item">NÓNG</li>
            <li className="header-navbar-item">MỚI</li>
            <li className="header-navbar-item">VIDEO</li>
            <li className="header-navbar-item">CHỦ ĐỀ</li>
            <li className="header-navbar-item">Phòng chống dịch COVID-19</li>
            <li className="header-navbar-item">Năng lượng tích cực</li>
            <li className="header-navbar-item">Khám phá Việt Nam</li>
            <li className="header-navbar-item">Khám phá thế giới</li>
            <li className="header-navbar-item" onClick={()=>setActive(!active)}>
              <AiOutlineMenu />
            </li>
          </ul>
        </div>
        <div className={active ? "drop-menu-active":"drop-menu"}>
          <ul className="col-9 drop-menu-list">
            <li className="drop-menu-item">
              <div className="menu-item-title">Thế Giới</div>
              <ul className="drop-menu-sub-list">
                <li className="menu-sub-item"></li>
              </ul>
            </li>
            <li className="drop-menu-item">
              <div className="menu-item-title">XÃ HỘI</div>
              <ul className="drop-menu-sub-list">
                <li className="menu-sub-item">Thời sự</li>
                <li className="menu-sub-item">Giao thông</li>
                <li className="menu-sub-item">Môi trường - Khí hậu</li>
              </ul>
            </li>
            <li className="drop-menu-item">
              <div className="menu-item-title">VĂN HÓA</div>
              <ul className="drop-menu-sub-list">
                <li className="menu-sub-item">Nghệ thuật</li>
                <li className="menu-sub-item">Ẩm thực</li>
                <li className="menu-sub-item">Du lịch</li>
              </ul>
            </li>
            <li className="drop-menu-item">
              <div className="menu-item-title">KINH TẾ</div>
              <ul className="drop-menu-sub-list">
                <li className="menu-sub-item">Lao động - Việc làm</li>
                <li className="menu-sub-item">Tài chính</li>
                <li className="menu-sub-item">Chứng khoán</li>
                <li className="menu-sub-item">Kinh doanh</li>
              </ul>
            </li>
            <li className="drop-menu-item">
              <div className="menu-item-title">GIÁO DỤC</div>
              <ul className="drop-menu-sub-list">
                <li className="menu-sub-item">Học bổng - Du học</li>
                <li className="menu-sub-item">Đào tạo - Thi cử</li>
              </ul>
            </li>
            <li className="drop-menu-item">
              <div className="menu-item-title">THỂ THAO</div>
              <ul className="drop-menu-sub-list">
                <li className="menu-sub-item">Bóng đá quốc tế</li>
                <li className="menu-sub-item">Bóng đá Việt Nam</li>
                <li className="menu-sub-item">Quần vợt</li>
                <li className="menu-sub-item">Lịch thi đấu</li>
              </ul>
            </li>
            <li className="drop-menu-item">
              <div className="menu-item-title">GIẢI TRÍ</div>
              <ul className="drop-menu-sub-list">
                <li className="menu-sub-item">Âm nhạc</li>
                <li className="menu-sub-item">Thời trang</li>
                <li className="menu-sub-item">Điện ảnh - Truyền hình</li>
              </ul>
            </li>
            <li className="drop-menu-item">
              <div className="menu-item-title">PHÁP LUẬT</div>
              <ul className="drop-menu-sub-list">
                <li className="menu-sub-item">An ninh - Trật tự</li>
                <li className="menu-sub-item">Hình sự - Dân sự</li>
              </ul>
            </li>
            <li className="drop-menu-item">
              <div className="menu-item-title">CÔNG NGHỆ</div>
              <ul className="drop-menu-sub-list">
                <li className="menu-sub-item">CNTT - Viễn thông</li>
                <li className="menu-sub-item">Thiết bị - Phần cứng</li>
              </ul>
            </li>
            <li className="drop-menu-item">
              <div className="menu-item-title">KHOA HỌC</div>
              <ul className="drop-menu-sub-list">
                <li className="menu-sub-item"></li>
              </ul>
            </li>
            <li className="drop-menu-item">
              <div className="menu-item-title">ĐỜI SỐNG</div>
              <ul className="drop-menu-sub-list">
                <li className="menu-sub-item">Dinh dưỡng - Làm đẹp</li>
                <li className="menu-sub-item">Tình yêu - Hôn nhân</li>
                <li className="menu-sub-item">Sức khỏe - Y tế</li>
              </ul>
            </li>
            <li className="drop-menu-item">
              <div className="menu-item-title">XE CỘ</div>
              <ul className="drop-menu-sub-list">
                <li className="menu-sub-item"></li>
              </ul>
            </li>
            <li className="drop-menu-item">
              <div className="menu-item-title">NHÀ ĐẤT</div>
              <ul className="drop-menu-sub-list">
                <li className="menu-sub-item">Quản lý - Quy hoạch</li>
                <li className="menu-sub-item">Không gian - Kiến trúc</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Header
