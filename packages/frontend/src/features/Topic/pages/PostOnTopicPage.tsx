import React from 'react'
import { useParams } from 'react-router-dom'
const PostOnTopic: React.FC = () => {
  const { id } = useParams<'id'>()
  return (
    <div className="container">
      <div className="col-9 container-main">
        <h1>ALL POST ON TOPIC {id}</h1>
        <ul>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <li key={i}>POST {i}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default PostOnTopic
