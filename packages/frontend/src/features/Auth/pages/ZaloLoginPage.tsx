import React from 'react'
import { useSearchParams } from 'react-router-dom'

const ZaloLoginPage: React.FC = () => {
  const [searchParams] = useSearchParams()
  const code = searchParams.get('code')
  return (
    <div>
      <h1>Zalo Login</h1>
      <p>Token: {code}</p>
    </div>
  )
}

export default ZaloLoginPage
