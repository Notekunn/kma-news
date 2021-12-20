import React from 'react'
import { AiOutlineUser, AiOutlineMenu } from 'react-icons/ai'
import { BsSearch } from 'react-icons/bs'
import { useState } from 'react'
import { DropMenuItem } from './DropMenuItem'
import { Link } from 'react-router-dom'
import Login from './Login'
const Header = () => {
  const [active, setActive] = useState(false)
  const [activeLogin, setActiveLogin] = useState(false)
  return (
    <div className="header">
      <div className="col-9 header-top">
        <div className="header-top-left">
          <div className="logo">
            <Link to="/">
              <div className="logo-main">
                <span>
                  BAOM
                  <img src="https://baomoi-static.zadn.vn/favicons/favicon-32x32.png" alt="logo" />I
                </span>
              </div>
            </Link>
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
          <div className="logo-user" onClick={() => setActiveLogin(!activeLogin)}>
            <AiOutlineUser size="25px" />
          </div>
          {activeLogin ? <Login /> : ''}
        </div>
      </div>
      <div className="header-body">
        <div className="col-9 header-navbar">
          <ul className="header-navbar-list">
            <Link to="/">
              <li className="header-navbar-item">NÓNG</li>
            </Link>
            <Link to="/tin-moi">
              <li className="header-navbar-item">MỚI</li>
            </Link>
            <Link to="/tin-video">
              <li className="header-navbar-item">VIDEO</li>
            </Link>
            <Link to="/chu-de">
              <li className="header-navbar-item">CHỦ ĐỀ</li>
            </Link>
            <Link to="/phong-chong-dich-covid-19/top/:id">
              <li className="header-navbar-item--hot">
                <div className="header-navbar-item--hotC">Phòng chống dịch COVID-19</div>
              </li>
            </Link>
            <Link to="/nang-luong-tich-cuc/top/:id">
              <li className="header-navbar-item--hot">
                <div className="header-navbar-item--hotC">Năng lượng tích cực</div>
              </li>
            </Link>
            <Link to="/kham-pha-viet-nam/top/:id">
              <li className="header-navbar-item--hot">
                <div className="header-navbar-item--hotC">Khám phá Việt Nam</div>
              </li>
            </Link>
            <Link to="/kham-pha-the-gioi/top/:id">
              <li className="header-navbar-item--hot">
                <div className="header-navbar-item--hotC">Khám phá thế giới</div>
              </li>
            </Link>
            <Link to="/page">
              <li className="header-navbar-item--hot">
                <div className="header-navbar-item--hotC">Page</div>
              </li>
            </Link>
            <li className="header-navbar-item-menu" onClick={() => setActive(!active)}>
              <div className="header-navbar-item-menu-icon">
                <AiOutlineMenu className="header-menu-icon" />
              </div>
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
            <DropMenuItem
              title="VĂN HÓA"
              subItems={[{ title: 'Nghệ thuật' }, { title: 'Ẩm thực' }, { title: 'Du lịch' }]}
            />
            <DropMenuItem
              title="KINH TẾ"
              subItems={[
                { title: 'Lao động - Việc làm' },
                { title: 'Tài chính' },
                { title: 'Chứng khoán' },
                { title: 'Kinh doanh' },
              ]}
            />
            <DropMenuItem
              title="GIÁO DỤC"
              subItems={[
                { title: 'Học bổng - Du học' },
                { title: 'Đào tạo - Thi cử' },
                { title: 'Chứng khoán' },
                { title: 'Kinh doanh' },
              ]}
            />
            <DropMenuItem
              title="THỂ THAO"
              subItems={[
                { title: 'Bóng đá quốc tế' },
                { title: 'Bóng đá Việt Nam' },
                { title: 'Quần vợt' },
                { title: 'Lịch thi đấu' },
              ]}
            />
            <DropMenuItem
              title="GIẢI TRÍ"
              subItems={[
                { title: 'Âm nhạc' },
                { title: 'Thời trang' },
                { title: 'Điện ảnh - Truyền hình' },
              ]}
            />
            <DropMenuItem
              title="PHÁP LUẬT"
              subItems={[{ title: 'An ninh - Trật tự' }, { title: 'Hình sự - Dân sự' }]}
            />
            <DropMenuItem
              title="CÔNG NGHỆ"
              subItems={[{ title: 'CNTT - Viễn thông' }, { title: 'Thiết bị - Phần cứng' }]}
            />
            <DropMenuItem title="KHOA HỌC" subItems={[]} />
            <DropMenuItem
              title="ĐỜI SỐNG"
              subItems={[
                { title: 'Dinh dưỡng - Làm đẹp' },
                { title: 'Tình yêu - Hôn nhân' },
                { title: 'Sức khỏe - Y tế' },
              ]}
            />
            <DropMenuItem
              title="XE CỘ"
              subItems={[
                { title: 'Dinh dưỡng - Làm đẹp' },
                { title: 'Tình yêu - Hôn nhân' },
                { title: 'Sức khỏe - Y tế' },
              ]}
            />
            <DropMenuItem
              title="NHÀ ĐẤT"
              subItems={[{ title: 'Quản lý - Quy hoạch' }, { title: 'Không gian - Kiến trúc' }]}
            />
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Header
