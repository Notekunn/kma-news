import { Types } from 'shared-api'
import React from 'react'
export interface PostFeedItemProps {
  post: Types.PostWithPublisher
}
const PostFeedItem: React.FC<PostFeedItemProps> = (props) => {
  const { post } = props
  return (
    <div>
      <h1>{post.title}</h1>
      <h1>{post.description}</h1>
    </div>
  )
}

export default PostFeedItem
