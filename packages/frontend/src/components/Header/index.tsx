import React, { useEffect } from 'react'
import { AiOutlineUser, AiOutlineMenu } from 'react-icons/ai'
import { BsPhone, BsSearch } from 'react-icons/bs'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Login from '@/features/Auth/components/Login'
import { AuthDropDown } from '@/features/Auth/components/AuthDropDown/'
import { CategoryGroup } from '@/features/Category/components/CategoryGroup'
import { getTreeAction, selectData } from '@/features/Category/categorySlice'
import { selectLoggedIn, selectProfile } from '@/features/Auth/authSlice'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { useClickOutside } from '@/hooks/useClickOutside'

const Header = () => {
  const dispatch = useAppDispatch()
  const loggedIn = useAppSelector(selectLoggedIn)
  const treeCategory = useAppSelector(selectData)
  const profile = useAppSelector(selectProfile)
  const [refUser, userMenuVisible, toggleUserMenu] = useClickOutside<HTMLDivElement>(false)
  const [refDropMenu, activeDropMenu, setActiveDropMenu] = useClickOutside<HTMLDivElement>(false)
  const [loginVisible, toggleLogin] = useState(false)

  useEffect(() => {
    // Nếu đăng nhập thành công
    if (!!loggedIn) {
      toggleLogin(false)
      toggleUserMenu(false)
    }
  }, [loggedIn, toggleLogin, toggleUserMenu])
  useEffect(() => {
    dispatch(getTreeAction())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // const domNode = useClickOutside(() => {
  //   toggleUserMenu(false)
  // })
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
            <div
              className="result-search"
              style={false ? { display: 'block' } : { display: 'none' }}
            >
              <div className="list-result-search">
                <Link to="">
                  <div className="item-result-search">
                    Hội thảo: Đột phá hạ tầng phát triển kinh tế vùng TP.Hồ Chí Minh - Đồng Nai - Bà
                    Rịa Vũng Tàu -
                  </div>
                </Link>
                <Link to="">
                  <div className="item-result-search">xem các kết quả của 'key'</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="header-top-right">
          {profile ? (
            <div ref={refUser}>
              <div className="header-top__user" onClick={() => toggleUserMenu(!userMenuVisible)}>
                <img
                  src={profile.avatarURL || 'https://i.pravatar.cc/800'}
                  alt=""
                  className="header-top__image"
                />
                <div className="header-top__user-name">{profile.name}</div>
              </div>
              <div>
                <AuthDropDown visible={userMenuVisible} toggleVisible={toggleUserMenu} />
              </div>
            </div>
          ) : (
            <div>
              <div className="logo-user" onClick={() => toggleLogin(!loginVisible)}>
                <AiOutlineUser size="25px" />
              </div>
              <Login visible={loginVisible} toggleVisible={toggleLogin} />
            </div>
          )}

          <a href="#!">
            <BsPhone size="25px" className="header-icon header-icon--phone" />
          </a>
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
            <li
              className="header-navbar-item-menu"
              onClick={() => setActiveDropMenu(!activeDropMenu)}
            >
              <div className="header-navbar-item-menu-icon">
                <AiOutlineMenu className="header-menu-icon" />
              </div>
            </li>
          </ul>
        </div>
        <div ref={refDropMenu}>
          <div
            className="drop-menu"
            style={activeDropMenu ? { visibility: 'visible', opacity: '1' } : {}}
          >
            <ul className="col-9 drop-menu-list">
              {treeCategory.map((e, i) => (
                <CategoryGroup
                  title={e.title}
                  slug={e.slug}
                  subItems={e.subItems}
                  key={`tree-group-${i}`}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
