import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/loginPage/index.jsx'
import Registration from './pages/registrationPage/index.jsx'
import Home from './pages/homePage/home.jsx'
import VerifyLogin from './pages/verifyPage/login.jsx'
import VerifyRegister from './pages/verifyPage/register.jsx'
import Notes from './pages/notesPage/index.jsx'
import Todo from './pages/todoPage/index.jsx'
import Cards from './pages/cardsPage/index.jsx'

import './App.css'
function App() {
  return (
    <>
      <Routes>
        <Route path="*" element={<LoginPage/>} />
        <Route path="/register" element={<Registration/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/verifyLogin" element={<VerifyLogin/>} />
        <Route path="/verifyRegister" element={<VerifyRegister/>} />
        <Route path = "/notes" element={<Notes/>} />
        <Route path ="/todo" element = {<Todo/>} />
        <Route path ="/flashcards" element = {<Cards/>} />
      </Routes>
    </>
  );
}

export default App
