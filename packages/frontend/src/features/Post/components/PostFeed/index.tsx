import React from 'react'
import { IPost } from 'shared-types'
import PostFeedItem from '../PostFeedItem'
export interface PostFeedProps {
  name: string
  contents: IPost[]
  nextPageURL?: string
  prevPageURL?: string
}
const PostFeed: React.FC<PostFeedProps> = (props) => {
  const { name, contents, nextPageURL, prevPageURL } = props
  return (
    <div>
      <h1>{name}</h1>
      <div>
        {contents.map((post, i) => (
          <PostFeedItem post={post} key={`feed-${name}-${i}`} />
        ))}
      </div>
      {prevPageURL && <a href={prevPageURL}>Trang trước</a>}
      {nextPageURL && <a href={nextPageURL}>Trang sau</a>}
    </div>
  )
}
export default PostFeed
