import React from 'react'
import { BsSave2 } from 'react-icons/bs'
import { GiRibbonMedal, GiBackwardTime } from 'react-icons/gi'
import { IoMdExit } from 'react-icons/io'
import { Link } from 'react-router-dom'
import './auth.css'
export interface LoginPopupProps {
  visible: boolean
  toggleVisible: (visible: boolean) => void
}
export const AuthDropDown: React.FC<LoginPopupProps> = (props) => {
  const { visible, toggleVisible } = props
  return (
    <div className={visible ? 'auth-drop' : 'auth-drop--hide'}>
      <ul className="auth-drop__list">
        <Link to="/de-xuat" className="auth-drop__item">
          <GiRibbonMedal className="auth-drop__icon" />
          <li>
            <div className="auth-drop__item--a">Tin đề xuất</div>
          </li>
        </Link>
        <Link to="/doc-gan-day" className="auth-drop__item">
          <li>
            <div className="auth-drop__item--a">
              <GiBackwardTime className="auth-drop__icon" />
              Đọc gần đây
            </div>
          </li>
        </Link>
        <Link to="/tin-da-luu" className="auth-drop__item">
          <li>
            <div className="auth-drop__item--a">
              <BsSave2 className="auth-drop__icon" />
              Tin đã lưu
            </div>
          </li>
        </Link>
        <Link to="/de-xuat" className="auth-drop__item">
          <li>
            <div className="auth-drop__item--a">
              <IoMdExit className="auth-drop__icon" />
              Đăng xuất
            </div>
          </li>
        </Link>
      </ul>
    </div>
  )
}
