import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { auth } from "./firebase"
import Inicio from './components/Inicio'
import Login from './components/Login'
import Admin from './components/Admin'
import Navbar from './components/Navbar'
function App() {
  const [firebaseUser, setFirebaseUser] = React.useState(false)
  React.useEffect(() => {
    auth.onAuthStateChanged(user => {
      console.log(user)
      if (user) {
        setFirebaseUser(user)
      } else {
        setFirebaseUser(null)

      }
    })
  }, [])

  return firebaseUser !== false ? (
    <Router>
      <div className='container'>
        <Navbar firebaseUser={firebaseUser}/>
        <Routes>
          <Route path='/' element={<Inicio />} />
          <Route path='admin' element={<Admin />} />
          <Route path='login' element={<Login />} />
        </Routes>
      </div>
    </Router>
  ) : (
    <div class="d-flex justify-content-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
    </div>

  )
}

export default App;

