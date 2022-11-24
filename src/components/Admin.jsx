import React from 'react'
import { db, auth } from '../firebase'
import { useNavigate } from 'react-router-dom'

const Admin = () => {
  const navigate = useNavigate()
  const [user, setUser] = React.useState(null)

  React.useEffect(() => {
    if (auth.currentUser) {
      setUser(auth.currentUser)
    } else {
      navigate("/login")
    }
  }, [navigate])

  return (
    <div>
      {
        user && (
          <h2>Usuario Conectado: <br /><i>{user.email}</i></h2>
        )
      }
    </div>
  )
}

export default Admin

