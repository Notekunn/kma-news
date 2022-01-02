import { Types } from '@/../../shared-api/dist'
import { IPost } from '@/../../shared-types/src/post'
import React from 'react'
import { Link } from 'react-router-dom'

interface TopNewsProps {
  data: Types.APIResponse.GetAllPosts
}
interface newSource {
  logo?: string
  time?: string
}
interface NewDataSource {
  img?: string
  description?: string
  newsSource?: newSource
}

interface ItemNewsProps {
  data: any
}

const ItemNews: React.FC<ItemNewsProps> = ({ data }) => {
  return (
    <div className="col-4 item-news">
      <div className="img-item-news">
        <Link to="/">
          <img src={data.thumbnailUrl} alt="" />
        </Link>
      </div>

      <div className="description-item-news">
        <Link to="/">
          <span>{data.title}</span>
        </Link>
        <div className="news-source">
          <Link to="/">
            <img
              className="logo-source"
              src="https://photo-baomoi.zadn.vn/6eede58338c0d19e88d1.png"
              alt=""
            />
          </Link>
          <span className="news-time">{data.publishedAt}</span>
        </div>
      </div>
    </div>
  )
}

export const TopNews: React.FC<TopNewsProps> = ({ data }) => {
  return (
    <>
      <div className="section">
        <Link to={`${data[0].slug}`}>
          <div className="img-top">
            <img src={data[0].thumbnailUrl} alt="" />
          </div>
        </Link>
        <div className="description-top">
          <div className="title-top">
            <Link to={`${data[0].slug}`}>{data[0].title}</Link>
          </div>
          <div className="news-source">
            <Link to="/">
              <img
                className="logo-source"
                src="https://photo-baomoi.zadn.vn/d59db7f26ab183efdaa0.png"
                alt=""
              />
            </Link>
            <span className="news-time">{data[0].publishedAt}</span>
            <span className="number-news-other">
              <Link to="/">60 liên quan</Link>
            </span>
          </div>
        </div>
      </div>
      <div className="section">
        <div className="list-news">
          <ItemNews key={1} data={data[1]} />
          <ItemNews key={2} data={data[2]} />
          <ItemNews key={3} data={data[3]} />
        </div>
      </div>
    </>
  )
}
