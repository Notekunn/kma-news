import React from 'react'
import { AiOutlineUser, AiOutlineMenu } from 'react-icons/ai'
import { BsSearch } from 'react-icons/bs'
import { useState } from 'react'
import { DropMenuItem } from './DropMenuItem'
import { title } from 'process'
const Header = () => {
  const [active, setActive] = useState(false)
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
            <li className="header-navbar-item" onClick={() => setActive(!active)}>
              <AiOutlineMenu />
            </li>
          </ul>
        </div>
        <div className={active ? 'drop-menu-active' : 'drop-menu'}>
          <ul className="col-9 drop-menu-list">
            <DropMenuItem title="Thế giới" subItems={[]} />
            <DropMenuItem
              title="Xã hội"
              subItems={[
                { title: 'Thời sự' },
                { title: 'Giao thông' },
                { title: 'Môi trường - Khí hậu' },
              ]}
            />
            <DropMenuItem title="VĂN HÓA" subItems={[
              { title: "Nghệ thuật" },
              { title: "Ẩm thực" },
              { title: "Du lịch" }
            ]} />
            <DropMenuItem title="KINH TẾ" subItems={[
              { title: "Lao động - Việc làm" },
              { title: "Tài chính" },
              { title: "Chứng khoán" },
              { title: "Kinh doanh" }
            ]} />
            <DropMenuItem title="GIÁO DỤC" subItems={[
              { title: "Học bổng - Du học" },
              { title: "Đào tạo - Thi cử" },
              { title: "Chứng khoán" },
              { title: "Kinh doanh" }
            ]} />
            <DropMenuItem title="THỂ THAO" subItems={[
              { title: "Bóng đá quốc tế" },
              { title: "Bóng đá Việt Nam" },
              { title: "Quần vợt" },
              { title: "Lịch thi đấu" }
            ]} />
            <DropMenuItem title="GIẢI TRÍ" subItems={[
              { title: "Âm nhạc" },
              { title: "Thời trang" },
              { title: "Điện ảnh - Truyền hình" }
            ]} />
            <DropMenuItem title="PHÁP LUẬT" subItems={[
              { title: "An ninh - Trật tự" },
              { title: "Hình sự - Dân sự" }
            ]} />
            <DropMenuItem title="CÔNG NGHỆ" subItems={[
              { title: "CNTT - Viễn thông" },
              { title: "Thiết bị - Phần cứng" }
            ]} />
            <DropMenuItem title="KHOA HỌC" subItems={[]} />
            <DropMenuItem title="ĐỜI SỐNG" subItems={[
              { title: "Dinh dưỡng - Làm đẹp" },
              { title: "Tình yêu - Hôn nhân" },
              { title: "Sức khỏe - Y tế" }
            ]} />
            <DropMenuItem title="XE CỘ" subItems={[
              { title: "Dinh dưỡng - Làm đẹp" },
              { title: "Tình yêu - Hôn nhân" },
              { title: "Sức khỏe - Y tế" }
            ]} />
            <DropMenuItem title="NHÀ ĐẤT" subItems={[
              { title: "Quản lý - Quy hoạch" },
              { title: "Không gian - Kiến trúc" },
            ]} />
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Header
