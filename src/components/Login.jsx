import React from 'react'
import { db, auth } from '../firebase'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    //hooks
    const [email, setEmail] = React.useState('')
    const [contrasena, setContrasena] = React.useState('')
    const [modoReg, setModoReg] = React.useState(true)
    const [error, setError] = React.useState('')
    const navigate = useNavigate()

    const guardarInfo = (e) => {
        e.preventDefault()
        if (!email.trim()) {
            setError('debe ingresar un email')
            return
        }
        if (!contrasena.trim()) {
            setError('debe ingresar una contraseña')
            return
        }
        if (contrasena.length < 6) {
            setError('la contraseña debe contener minimo 6 o mas caracteres para ser valida')
            return
        }
        setError(null)
        if (modoReg) {
            registrar()
        } else {
            Login()
        }
    }

    const Login = React.useCallback(async () => {
        try {
            const res = await auth.signInWithEmailAndPassword(email, contrasena)
            console.log(res.user)
            setEmail('')
            setContrasena('')
            setError('')
            navigate("/admin")
        } catch (error) {
            console.log(error.code)
            if (error.code === 'auth/user-not-found') {
                setError('Usuario no se encuentra registrado')
            }
            if (error.code === 'auth/wrong-password') {
                setError('contraseña no valida')
            }
        }
    }, [email, contrasena, navigate])

    const registrar = React.useCallback(async () => {
        try {
            const res = await auth.createUserWithEmailAndPassword(email, contrasena)
            console.log(res.user)
            await db.collection('usuario').doc(res.user.email).set(
                {
                    email: res.user.email,
                    id: res.user.uid
                }
            )
            setEmail('')
            setContrasena('')
            setError(null)
        } catch (error) {
            console.log(error.code)
            if (error.code === 'auth/email-already-in-use') {
                setError('email ya fue registrado')
            }
            if (error.code === 'auth/invalid-email') {
                setError('email no valido')
            }
        }
    }, [email, contrasena])

    return (
        <div className='container abs-center'>
            <div className='row justify-content-center pt-5 mt-5'>
                <div className='col-md-4 col-sm-6 xl-6 col-lg-4 rounded formulario border'>
                    <form className='border p-3 form rounded' onSubmit={guardarInfo}>
                        <div className='form-group text-center'>
                            <h1 className='text-light'>
                                {
                                    modoReg ? 'Bienvenido' : 'Inicio de sesion'
                                }
                            </h1>
                            {
                                error &&
                                <div class="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            }
                        </div>
                        <div className='form-group mx-sm-6 p-3'>
                            <input type="email"
                                className='form-control'
                                placeholder='Ingrese su Usuario'
                                onChange={e => setEmail(e.target.value)}
                                value={email}
                            />
                        </div>
                        <div className='form-group mx-sm-6 p-3'>
                            <input type="password"
                                className='form-control'
                                placeholder='Ingrese su Contrseña'
                                onChange={e => setContrasena(e.target.value)}
                                value={contrasena}
                            />
                        </div>
                        <div className='d-grid gap-2 col-10 mx-auto p-4'>
                            <button type='submit' className='btn btn-dark rounded-3 ingresar text-light'>{
                                modoReg ? 'Registrar' : 'Ingresar'
                            }</button>
                        </div>
                        <div className='d-grid gap-2 col-10 mx-auto '>
                            <button type='button' className='btn btn-link' onClick={() => { setModoReg(!modoReg) }}>{
                                modoReg ? '¿Ya se encuentra registrado?' : '¿No estas registrado?'
                            }</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
