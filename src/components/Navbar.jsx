import React from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'

const Navbar = (props) => {
    const navigate = useNavigate()
    const cerrarSesion = () => {
        auth.signOut().then(() => {
            navigate('/login')
        })
    }

    return (
        <div className='navbar formulario'>
            <Link className='navbar-brand text-light' to="/">Tecnolearning</Link>
            <div className='d-flex'>
                <Link className='btn mr-2 text-light' to="/">Inicio</Link>
                {
                    props.firebaseUser !== null?(
                        <Link className='btn mr-2 text-light' to="/admin">Admin</Link>
                    ):(null)
                }
                {
                    props.firebaseUser !== null ? (
                        <button className='btn mr-2 text-light' onClick={() => { cerrarSesion() }}>Cerrar sesión</button>
                    ) : (
                        <Link className='btn mr-2 text-light' to="/login">Login</Link>
                    )
                }
            </div>
        </div>
    )
}

export default Navbar