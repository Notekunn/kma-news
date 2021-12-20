import React from 'react'
import Header from './components/Header/index'
import Footer from './components/Footer/index'
import Topic from './pages/TopicPage/Topic'
import { Route, Routes } from 'react-router-dom'
import PageRender from './components/Page_Render/index'
import './App.css'
import './gird.css'
import './index.css'
import Home from './pages/HomePage/Home'
function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tin-moi.epi" element={<Home />} />
        <Route path="/chu-de" element={<Topic />} />
      </Routes>
      <Footer />
    </div>
  )
}
export default App
