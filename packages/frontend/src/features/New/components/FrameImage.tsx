import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { MdOutlineFullscreen, MdOutlineFullscreenExit } from 'react-icons/md'
import './frameImage.css'
interface ImageInfor {
  id: number
  url: string
  description?: string
}
interface FrameImageProps {
  arrImg: ImageInfor[]
  id: number
  visiable: boolean
  toggleVisiable: (visiable: boolean) => void
}

export const FrameImage: React.FC<FrameImageProps> = (props) => {
  // export const FrameImage = () => {
  const [fullState, setFullState] = useState(false)
  const { id, visiable, toggleVisiable } = props
  const [idCurrent, setIdCurrent] = useState(3)

  const arrImg: Array<ImageInfor> = [
    {
      id: 1,
      url: 'https://photo-baomoi.zadn.vn/w700_r1/2021_12_29_329_41351980/cd0f7b07c4452d1b7454.jpg',
      description:
        'Tổng Bí thư Nguyễn Phú Trọng, Chủ tịch nước Nguyễn Xuân Phúc, Thủ tướng Phạm Minh Chính, Thường trực Ban Bí thư Võ Văn Thưởng dự Hội nghị đối ngoại toàn quốc triển khai thực hiện Nghị quyết Đại hội lần thứ XIII của Đảng.',
    },
    {
      id: 2,
      url: 'https://photo-baomoi.zadn.vn/w1000_r1/2021_12_29_329_41351980/d6261717b855510b0844.jpg',
      description:
        'Tổng Bí thư Nguyễn Phú Trọng, Chủ tịch nước Nguyễn Xuân Phúc, Thủ tướng Phạm Minh Chính, Thường trực Ban Bí thư Võ Văn Thưởng dự Hội nghị đối ngoại toàn quốc triển khai thực hiện Nghị quyết Đại hội lần thứ XIII của Đảng.',
    },
    {
      id: 3,
      url: 'https://photo-baomoi.zadn.vn/w1000_r1/2021_12_29_329_41351980/0d89cbb864fa8da4d4eb.jpg',
      description:
        'Tổng Bí thư Nguyễn Phú Trọng, Chủ tịch nước Nguyễn Xuân Phúc, Thủ tướng Phạm Minh Chính, Thường trực Ban Bí thư Võ Văn Thưởng dự Hội nghị đối ngoại toàn quốc triển khai thực hiện Nghị quyết Đại hội lần thứ XIII của Đảng.',
    },
  ]
  const index = arrImg.findIndex((el) => el.id === idCurrent)
  const data: ImageInfor = arrImg[index]
  //   const data: ImageInfor = {
  //     id: 1,
  //     url: 'https://photo-baomoi.zadn.vn/w700_r1/2021_12_29_329_41351980/cd0f7b07c4452d1b7454.jpg',
  //     description:
  //       'Tổng Bí thư Nguyễn Phú Trọng, Chủ tịch nước Nguyễn Xuân Phúc, Thủ tướng Phạm Minh Chính, Thường trực Ban Bí thư Võ Văn Thưởng dự Hội nghị đối ngoại toàn quốc triển khai thực hiện Nghị quyết Đại hội lần thứ XIII của Đảng.',
  //   }
  const handlePage = (params: boolean) => {
    if (params == true) {
      if (idCurrent == arrImg.length) setIdCurrent(1)
      else setIdCurrent(idCurrent + 1)
    } else {
      if (idCurrent == 1) setIdCurrent(arrImg.length)
      else setIdCurrent(idCurrent - 1)
    }
  }
  const elem = document.documentElement
  const handleScreen = () => {
    fullState ? document.exitFullscreen() : elem.requestFullscreen()
    setFullState(!fullState)
  }
  const handleOut = () => {
    toggleVisiable(false)
    if (fullState) document.exitFullscreen()
  }
  return (
    <div className="frame-image">
      <div className="frame-image__header">
        <div className="frame-image__page">{data.id + '/' + arrImg.length}</div>
        <div className="frame-image__button">
          <div className="frame-image__full-scrren" onClick={() => handleScreen()}>
            {fullState ? (
              <MdOutlineFullscreenExit className="frame-image__icon" />
            ) : (
              <MdOutlineFullscreen className="frame-image__icon" />
            )}
          </div>
          <div className="frame-image__out" onClick={() => handleOut()}>
            <AiOutlineClose className="frame-image__icon" />
          </div>
        </div>
      </div>
      <div className="frame-immage__body">
        <div className="frame-image__left" onClick={() => handlePage(false)}></div>
        <div className="frame-image__img">
          <img src={data.url} alt="" className="frame-image__img-c" />
        </div>
        <div className="frame-image__right" onClick={() => handlePage(true)}></div>
      </div>
      <div className="frame-image__description">
        {data.description ? <p>{data.description}</p> : ''}
      </div>
    </div>
  )
}
