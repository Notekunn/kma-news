import React from 'react'
import { useSelector } from 'react-redux'
const Home = () => {
    const testList = useSelector(state => state)
    console.log(testList)
    return (
        <div className='container'>
            <h1>day la home</h1>
        </div>
    )
}

export default Home
