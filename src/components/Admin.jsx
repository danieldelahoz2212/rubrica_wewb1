import React from 'react'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'
import Registrar from './Registrar'

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
        user &&(
        <Registrar user={user} />
        )  
      }
    </div>
  )
}

export default Admin

