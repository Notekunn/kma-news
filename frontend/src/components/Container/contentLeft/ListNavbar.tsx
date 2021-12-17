import React from 'react'

export interface ItemNavbarProps {
    title: string
}
export interface ItemNewsNavBar {
    img?: string,
    description?: string,
    logoSource?: string
}

export interface ItemNewsNavBarProps {
    data?: ItemNewsNavBar
};
const dataArray: Array<ItemNewsNavBar> = [
    {
        img: "https://photo-baomoi.zadn.vn/w300_r3x2/2021_12_13_23_41180126/7a0d7c16cc54250a7c45.jpg",
        description: "Gần 900 ca F0 mỗi ngày, Hà Nội phong tỏa hàng loạt tuyến phố cổ",
        logoSource: "https://photo-baomoi.zadn.vn/26dc73b3aef047ae1ee1.png"
    },
    {
        img: "https://photo-baomoi.zadn.vn/w300_r3x2/2021_12_13_23_41180126/7a0d7c16cc54250a7c45.jpg",
        description: "Gần 900 ca F0 mỗi ngày, Hà Nội phong tỏa hàng loạt tuyến phố cổ",
        logoSource: "https://photo-baomoi.zadn.vn/26dc73b3aef047ae1ee1.png"
    },
    {
        img: "https://photo-baomoi.zadn.vn/w300_r3x2/2021_12_13_23_41180126/7a0d7c16cc54250a7c45.jpg",
        description: "Gần 900 ca F0 mỗi ngày, Hà Nội phong tỏa hàng loạt tuyến phố cổ",
        logoSource: "https://photo-baomoi.zadn.vn/26dc73b3aef047ae1ee1.png"
    }
]


export const ItemNewsNavbar: React.FC<ItemNewsNavBarProps> = ({ children, data }) => {
    console.log(data)
    return (
        <div className="item-news-navbar">
            <div className="img-news-navbar">
                <img
                    src={data?.img}
                    alt=""
                />
            </div>
            <div className="description-item-news">
                <span>{data?.description}</span>
                <div className="news-source">
                    <img
                        className="logo-source"
                        src={data?.logoSource}
                        alt=""
                    />
                    <span className="news-time">2 giờ</span>
                </div>
            </div>
        </div>
    )
}

export const ItemNavbar: React.FC<ItemNavbarProps> = ({ children, title }) => {
    return (
        <div>
            <div className="title-news-navbar">{title}</div>
            <div className="list-news-navbar">
                {dataArray.map((data, index) => {
                    <ItemNewsNavbar data={data} key={index} />
                })}
            </div>
            <div className="news-horizontal">
                <div className="title-news-other-horizontal"><h3>Tuổi thơ thiếu tình thương và ước mơ làm mẹ chưa thành sự thật của Song Hye Kyo</h3></div>
                <div className="list-news-other">
                    <div className="item-news-other">
                        <img src="https://photo-baomoi.zadn.vn/w300_r4x3_sm/2021_12_16_83_41217061/905dd6c064828ddcd493.jpg" alt="" />
                    </div>
                    <div className="item-news-other">
                        <img src="https://photo-baomoi.zadn.vn/w300_r4x3/2021_12_16_83_41217061/7bdf364284006d5e3411.jpg" alt="" />
                    </div>
                    <div className="item-news-other">
                        <img src="https://photo-baomoi.zadn.vn/w300_r4x3_sm/2021_12_16_83_41217061/a08def105d52b40ced43.jpg" alt="" />
                    </div>
                    <div className="item-news-other">
                        <img src="https://photo-baomoi.zadn.vn/w300_r4x3_sm/2021_12_16_83_41217061/305570c8c28a2bd4729b.jpg" alt="" />
                    </div>
                </div>
                <div className="news-source">
                    <img
                        className="logo-source"
                        src="https://photo-baomoi.zadn.vn/26dc73b3aef047ae1ee1.png"
                        alt=""
                    />
                    <span className="news-time">2 giờ</span>
                    <span className="number-news-other">60 liên quan</span>
                </div>
            </div>
        </div>
    )
}

export const ListNavbar: React.FC<ItemNavbarProps> = ({ title }) => {
    return (
        <div className='section'>
            <ItemNavbar title={title} />
        </div>
    )
}
