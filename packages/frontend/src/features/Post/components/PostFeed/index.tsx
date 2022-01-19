import React from 'react'
import { Types } from 'shared-api'
import PostFeedItem from '../PostFeedItem'
export interface PostFeedProps extends Types.APIResponse.GetPostsOnTopic {
  loadMore: () => void
}
const PostFeed: React.FC<PostFeedProps> = (props) => {
  const { name, contents } = props
  // Scroll to lasted -> loadMore
  return (
    <div>
      <h1>{name}</h1>
      <div>
        {contents.map((post, i) => (
          <PostFeedItem post={post} key={`feed-${name}-${i}`} />
        ))}
      </div>
    </div>
  )
}
export default PostFeed
