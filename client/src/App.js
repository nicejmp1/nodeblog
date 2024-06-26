import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { UserContextProvider } from './context/userContext'

import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'

import Home from './pages/Home'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'

const App = () => {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Header />
          <Main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </Main>
        <Footer />
      </BrowserRouter>
    </UserContextProvider>


  )
}

export default App