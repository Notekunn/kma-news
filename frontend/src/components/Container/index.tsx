import React from 'react'
interface containerProps {}

const Container: React.FC<containerProps> = ({ children }) => {
  return (
    <div className="container">
      <div className="col-9 container-main">{children}</div>
    </div>
  )
}

export default Container
