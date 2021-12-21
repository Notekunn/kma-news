import React, { useState } from 'react'
import './auth.css'
const Login = () => {
  const [hidden, setHidden] = useState(true)
  const handleClick = () => {
    setHidden(!hidden)
  }

  return (
    <div className={hidden ? 'modal' : 'modal-none'} id="modal" onClick={handleClick}>
      <div className="modal__overlay"></div>
      <div className="modal__body">
        <div className="auth-form">
          <div className="auth-form__header">
            <p className="auth-form__title">Đăng nhập</p>
            <img
              src="https://baomoi.com/images/default-skin/bm-logo.png"
              alt="logo"
              className="auth-form__logo"
            />
          </div>

          <form action="" method="POST">
            <div className="auth-form__form">
              <div className="auth-form__group">
                <input
                  type="text"
                  className="auth-form__group-input "
                  placeholder="Nhập email tài khoản của bạn"
                />
              </div>
              <div className="auth-form__group">
                <input
                  type="text"
                  className="auth-form__group-input "
                  placeholder="Nhập mật khẩu của bạn"
                />
              </div>
              <p className="auth-form__group-forget">Bạn quên mật khẩu ?</p>
            </div>
            <div className="auth-form__btn">
              <input type="button" className="auth-btn auth-btn--regis" value="Đăng kí" />
              <input type="button" className="auth-btn auth-btn--login" value="Đăng nhập" />
            </div>
          </form>
          <div className="auth-form__socials">
            <a href="" className="auth-socials__btn auth-socials__btn--zalo">
              <img
                src="https://page.widget.zalo.me/static/images/2.0/Logo.svg"
                alt=""
                className="auth-socails__logo"
              />
              <p className="auth-socials__name auth-socials__name--zalo">Đăng nhập bằng Zalo</p>
            </a>
            <a href="" className="auth-socials__btn auth-socials__btn--face">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1024px-Facebook_Logo_%282019%29.png"
                alt=""
                className="auth-socails__logo"
              />
              <p className="auth-socials__name auth-socials__name--face">Đăng nhập bằng Facebook</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Login