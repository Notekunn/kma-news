import React from 'react'
import Header from './components/Header/index'
import Footer from './components/Footer/index'
import Container from './components/Container/index'
import { Route, Routes } from 'react-router-dom'
import PageRender from './components/Page_Render/index'
import './App.css'
import './gird.css'
import './index.css'
function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Container />} />
        <Route path="/tin-moi.epi" element={<Container />} />
        <Route path="/page" element={<PageRender />} />
      </Routes>
      <Footer />
    </div>
  )
}
export default App
