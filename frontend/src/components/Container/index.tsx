import { Covid19Feed } from '@/features/covid19/components/Covid19Feed'
import React from 'react'
import { BsFlagFill } from 'react-icons/bs'
import { FaUserInjured, FaUsersSlash } from 'react-icons/fa'
import { FiMapPin } from 'react-icons/fi'
const Container = () => {
  return (
    <div className="container">
      <div className="col-9 container-main">
        <div className="content">
          <div className="col-8 content-left">
            <div className="section">
              <div className="img-top">
                <img
                  src="https://photo-baomoi.zadn.vn/w700_r16x9/2021_12_12_83_41174941/244da11c115ef800a14f.jpg"
                  alt=""
                />
              </div>
              <div className="description-top">
                <div className="title-top">
                  Quang Hải và Công Phượng ghi bàn, tuyển Việt Nam đè bẹp Malaysia
                </div>
                <div className="news-source">
                  <img
                    className="logo-source"
                    src="https://photo-baomoi.zadn.vn/d59db7f26ab183efdaa0.png"
                    alt=""
                  />
                  <span className="news-time">2 giờ</span>
                  <span className="number-news-orther">60 liên quan</span>
                </div>
              </div>
            </div>
            <div className="section">
              <div className="list-news">
                <div className="col-4 item-news">
                  <div className="img-item-news">
                    <img
                      src="https://photo-baomoi.zadn.vn/w300_r3x2_sm/2021_12_13_83_41179601/15e38ae13aa3d3fd8ab2.jpg"
                      alt=""
                    />
                  </div>
                  <div className="description-item-news">
                    <span>Học sinh TP.HCM ngày đầu trở lại trường sau nửa năm học trực tuyến</span>
                    <div className="news-source">
                      <img
                        className="logo-source"
                        src="https://photo-baomoi.zadn.vn/6eede58338c0d19e88d1.png"
                        alt=""
                      />
                      <span className="news-time">2 giờ</span>
                    </div>
                  </div>
                </div>
                <div className="col-4 item-news">
                  <div className="img-item-news">
                    <img
                      src="https://photo-baomoi.zadn.vn/w300_r3x2_sm/2021_12_13_83_41179601/15e38ae13aa3d3fd8ab2.jpg"
                      alt=""
                    />
                  </div>
                  <div className="description-item-news">
                    <span>Học sinh TP.HCM ngày đầu trở lại trường sau nửa năm học trực tuyến</span>
                    <div className="news-source">
                      <img
                        className="logo-source"
                        src="https://photo-baomoi.zadn.vn/6eede58338c0d19e88d1.png"
                        alt=""
                      />
                      <span className="news-time">2 giờ</span>
                    </div>
                  </div>
                </div>
                <div className="col-4 item-news">
                  <div className="img-item-news">
                    <img
                      src="https://photo-baomoi.zadn.vn/w300_r3x2_sm/2021_12_13_83_41179601/15e38ae13aa3d3fd8ab2.jpg"
                      alt=""
                    />
                  </div>
                  <div className="description-item-news">
                    <span>Học sinh TP.HCM ngày đầu trở lại trường sau nửa năm học trực tuyến</span>
                    <div className="news-source">
                      <img
                        className="logo-source"
                        src="https://photo-baomoi.zadn.vn/6eede58338c0d19e88d1.png"
                        alt=""
                      />
                      <span className="news-time">2 giờ</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="section">
              <div className="title-news-navbar">PHÒNG CHỐNG DỊCH COVID-19</div>
              <div className="list-news-navbar">
                <div className="item-news-navbar">
                  <div className="img-news-navbar">
                    <img
                      src="https://photo-baomoi.zadn.vn/w300_r3x2/2021_12_13_23_41180126/7a0d7c16cc54250a7c45.jpg"
                      alt=""
                    />
                  </div>
                  <div className="description-item-news">
                    <span>Gần 900 ca F0 mỗi ngày, Hà Nội phong tỏa hàng loạt tuyến phố cổ</span>
                    <div className="news-source">
                      <img
                        className="logo-source"
                        src="https://photo-baomoi.zadn.vn/26dc73b3aef047ae1ee1.png"
                        alt=""
                      />
                      <span className="news-time">2 giờ</span>
                    </div>
                  </div>
                </div>
                <div className="item-news-navbar">
                  <div className="img-news-navbar">
                    <img
                      src="https://photo-baomoi.zadn.vn/w300_r3x2/2021_12_13_23_41180126/7a0d7c16cc54250a7c45.jpg"
                      alt=""
                    />
                  </div>
                  <div className="description-item-news">
                    <span>Gần 900 ca F0 mỗi ngày, Hà Nội phong tỏa hàng loạt tuyến phố cổ</span>
                    <div className="news-source">
                      <img
                        className="logo-source"
                        src="https://photo-baomoi.zadn.vn/26dc73b3aef047ae1ee1.png"
                        alt=""
                      />
                      <span className="news-time">2 giờ</span>
                    </div>
                  </div>
                </div>
                <div className="item-news-navbar">
                  <div className="img-news-navbar">
                    <img
                      src="https://photo-baomoi.zadn.vn/w300_r3x2/2021_12_13_23_41180126/7a0d7c16cc54250a7c45.jpg"
                      alt=""
                    />
                  </div>
                  <div className="description-item-news">
                    <span>Gần 900 ca F0 mỗi ngày, Hà Nội phong tỏa hàng loạt tuyến phố cổ</span>
                    <div className="news-source">
                      <img
                        className="logo-source"
                        src="https://photo-baomoi.zadn.vn/26dc73b3aef047ae1ee1.png"
                        alt=""
                      />
                      <span className="news-time">2 giờ</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-4 content-right">
            <div className="section">
              <div className="list-news-right">
                <div className="item-news-navbar">
                  <div className="img-news-navbar">
                    <img
                      src="https://photo-baomoi.zadn.vn/w300_r3x2/2021_12_13_23_41180126/7a0d7c16cc54250a7c45.jpg"
                      alt=""
                    />
                  </div>
                  <div className="description-item-news">
                    <span>Gần 900 ca F0 mỗi ngày, Hà Nội phong tỏa hàng loạt tuyến phố cổ</span>
                    <div className="news-source">
                      <img
                        className="logo-source"
                        src="https://photo-baomoi.zadn.vn/26dc73b3aef047ae1ee1.png"
                        alt=""
                      />
                      <span className="news-time">2 giờ</span>
                      <span className="number-news-orther">60 liên quan</span>
                    </div>
                  </div>
                </div>
                <div className="item-news-navbar">
                  <div className="img-news-navbar">
                    <img
                      src="https://photo-baomoi.zadn.vn/w300_r3x2/2021_12_13_23_41180126/7a0d7c16cc54250a7c45.jpg"
                      alt=""
                    />
                  </div>
                  <div className="description-item-news">
                    <span>Gần 900 ca F0 mỗi ngày, Hà Nội phong tỏa hàng loạt tuyến phố cổ</span>
                    <div className="news-source">
                      <img
                        className="logo-source"
                        src="https://photo-baomoi.zadn.vn/26dc73b3aef047ae1ee1.png"
                        alt=""
                      />
                      <span className="news-time">2 giờ</span>
                      <span className="number-news-orther">60 liên quan</span>
                    </div>
                  </div>
                </div>
                <div className="item-news-navbar">
                  <div className="img-news-navbar">
                    <img
                      src="https://photo-baomoi.zadn.vn/w300_r3x2/2021_12_13_23_41180126/7a0d7c16cc54250a7c45.jpg"
                      alt=""
                    />
                  </div>
                  <div className="description-item-news">
                    <span>Gần 900 ca F0 mỗi ngày, Hà Nội phong tỏa hàng loạt tuyến phố cổ</span>
                    <div className="news-source">
                      <img
                        className="logo-source"
                        src="https://photo-baomoi.zadn.vn/26dc73b3aef047ae1ee1.png"
                        alt=""
                      />
                      <span className="news-time">2 giờ</span>
                      <span className="number-news-orther">60 liên quan</span>
                    </div>
                  </div>
                </div>
                <div className="item-news-navbar">
                  <div className="img-news-navbar">
                    <img
                      src="https://photo-baomoi.zadn.vn/w300_r3x2/2021_12_13_23_41180126/7a0d7c16cc54250a7c45.jpg"
                      alt=""
                    />
                  </div>
                  <div className="description-item-news">
                    <span>Gần 900 ca F0 mỗi ngày, Hà Nội phong tỏa hàng loạt tuyến phố cổ</span>
                    <div className="news-source">
                      <img
                        className="logo-source"
                        src="https://photo-baomoi.zadn.vn/26dc73b3aef047ae1ee1.png"
                        alt=""
                      />
                      <span className="news-time">2 giờ</span>
                      <span className="number-news-orther">60 liên quan</span>
                    </div>
                  </div>
                </div>
                <div className="item-news-navbar">
                  <div className="img-news-navbar">
                    <img
                      src="https://photo-baomoi.zadn.vn/w300_r3x2/2021_12_13_23_41180126/7a0d7c16cc54250a7c45.jpg"
                      alt=""
                    />
                  </div>
                  <div className="description-item-news">
                    <span>Gần 900 ca F0 mỗi ngày, Hà Nội phong tỏa hàng loạt tuyến phố cổ</span>
                    <div className="news-source">
                      <img
                        className="logo-source"
                        src="https://photo-baomoi.zadn.vn/26dc73b3aef047ae1ee1.png"
                        alt=""
                      />
                      <span className="news-time">2 giờ</span>
                      <span className="number-news-orther">60 liên quan</span>
                    </div>
                  </div>
                </div>
                <div className="item-news-navbar">
                  <div className="img-news-navbar">
                    <img
                      src="https://photo-baomoi.zadn.vn/w300_r3x2/2021_12_13_23_41180126/7a0d7c16cc54250a7c45.jpg"
                      alt=""
                    />
                  </div>
                  <div className="description-item-news">
                    <span>Gần 900 ca F0 mỗi ngày, Hà Nội phong tỏa hàng loạt tuyến phố cổ</span>
                    <div className="news-source">
                      <img
                        className="logo-source"
                        src="https://photo-baomoi.zadn.vn/26dc73b3aef047ae1ee1.png"
                        alt=""
                      />
                      <span className="news-time">2 giờ</span>
                      <span className="number-news-orther">60 liên quan</span>
                    </div>
                  </div>
                </div>
                <div className="item-news-navbar">
                  <div className="img-news-navbar">
                    <img
                      src="https://photo-baomoi.zadn.vn/w300_r3x2/2021_12_13_23_41180126/7a0d7c16cc54250a7c45.jpg"
                      alt=""
                    />
                  </div>
                  <div className="description-item-news">
                    <span>Gần 900 ca F0 mỗi ngày, Hà Nội phong tỏa hàng loạt tuyến phố cổ</span>
                    <div className="news-source">
                      <img
                        className="logo-source"
                        src="https://photo-baomoi.zadn.vn/26dc73b3aef047ae1ee1.png"
                        alt=""
                      />
                      <span className="news-time">2 giờ</span>
                      <span className="number-news-orther">60 liên quan</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="section">
              <div className="slider">
                <div className="title-slider">
                  <span>ĐỐI TÁC CHÍNH THỨC</span>
                </div>
                <div className="slide-track">
                  <div className="list-slide">
                    <div className="slide">
                      <img src="https://photo-baomoi.zadn.vn/3a2a57458a0663583a17.png" alt="" />
                    </div>
                    <div className="slide">
                      <img src="https://photo-baomoi.zadn.vn/8ac1a1ae7ced95b3ccfc.png" alt="" />
                    </div>
                    <div className="slide">
                      <img src="https://photo-baomoi.zadn.vn/4e023e6de32e0a70533f.png" alt="" />
                    </div>
                    <div className="slide">
                      <img src="https://photo-baomoi.zadn.vn/0b89da8919caf094a9db.png" alt="" />
                    </div>
                    <div className="slide">
                      <img src="https://photo-baomoi.zadn.vn/fdf3989c45dfac81f5ce.png" alt="" />
                    </div>
                    <div className="slide">
                      <img src="https://photo-baomoi.zadn.vn/a60983665e25b77bee34.png" alt="" />
                    </div>
                    <div className="slide">
                      <img src="https://photo-baomoi.zadn.vn/b3a88dc75084b9dae095.png" alt="" />
                    </div>
                    <div className="slide">
                      <img src="https://photo-baomoi.zadn.vn/26dc73b3aef047ae1ee1.png" alt="" />
                    </div>
                    <div className="slide">
                      <img src="https://photo-baomoi.zadn.vn/a1493a27e7640e3a5775.png" alt="" />
                    </div>
                    <div className="slide">
                      <img src="https://photo-baomoi.zadn.vn/6eede58338c0d19e88d1.png" alt="" />
                    </div>
                    <div className="slide">
                      <img src="https://photo-baomoi.zadn.vn/1ab14ade979d7ec3278c.png" alt="" />
                    </div>
                    <div className="slide">
                      <img src="https://photo-baomoi.zadn.vn/f12dd0420d01e45fbd10.png" alt="" />
                    </div>
                    <div className="slide">
                      <img src="https://photo-baomoi.zadn.vn/d01baf7472379b69c226.png" alt="" />
                    </div>
                    <div className="slide">
                      <img src="https://photo-baomoi.zadn.vn/7d6e42019f42761c2f53.png" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="section">
              <div className="space"></div>
            </div>
            <div className="section">
              <div className="HCM">
                <div className="img-news-HCM">
                  <img src="https://baomoi-static.zadn.vn/events/banner_hcm_02-min.png" alt="" />
                </div>
              </div>
            </div>
            <Covid19Feed />
            <div className="section">
              <div className="location">
                <div className="location-head">
                  <FiMapPin />
                  <h3>ĐỊA PHƯƠNG</h3>
                </div>
                <div className="location-input"></div>
                <div className="location-result"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Container
