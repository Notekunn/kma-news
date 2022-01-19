import React from 'react'
import { useParams } from 'react-router-dom'
import PostFeed from '@/features/Post/components/PostFeed'
const PostOnTopic: React.FC = () => {
  const { id } = useParams<'id'>()
  return (
    <div className="container">
      <div className="col-9 container-main">
        <PostFeed name="Tin mới" contents={[]} />
      </div>
    </div>
  )
}

export default PostOnTopic
