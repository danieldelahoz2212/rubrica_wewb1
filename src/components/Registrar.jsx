import React from 'react'
import { db } from '../firebase'
import { collection, addDoc, deleteDoc, doc, updateDoc, onSnapshot } from 'firebase/firestore';

function Registrar(props) {
    const [id, setId] = React.useState('')
    const [categor, setCategor] = React.useState('')
    const [servicio, setServicio] = React.useState('')
    const [descripcion, setDescripcion] = React.useState('')
    const [modoEdicion, setModoEdicion] = React.useState(false)
    const [lista, setLista] = React.useState([])
    const [idCategoria, setidCategoria] = React.useState(-1)
    const [error, setError] = React.useState(null)

    const opciones = function (e) {
        const opcion = e.target.value
        if (opcion === '0') {
            setCategor('Mantenimiento Inmuebles')
        }
        if (opcion === '1') {
            setCategor('Mantenimiento Muebles')
        }
        if (opcion === '2') {
            setCategor('Servicio')
        }
        setidCategoria(opcion)
    }

    const datosSelect = function (e) {
        const opcion = e.target.value
        setServicio(opcion)
    }

    const categorias = [
        {
            nombre: "Mantenimiento Inmuebles",
            opciones: ["Baños", "Cielo raso", "Electrico", "Pared", "Puerta"]
        },

        {
            nombre: "Mantenimiento Muebles",
            opciones: ["Aire acondicionado", "Archivador", "Puesto de trabajo", "Silla"]
        },

        {
            nombre: "Servicio",
            opciones: ["Aseo", "Transporte", "Vigilancia"]
        }
    ]

    React.useEffect(() => {
        const obtenerDatos = async () => {
            try {
                await onSnapshot(collection(db, props.user.email), (query)=>{
                    setLista(query.docs.map((documento) => ({ id: documento.id, ...documento.data() })))
                })
            } catch (error) {
                console.log(error);
            }
        }
        obtenerDatos()
    })

    const guardar = async (e) => {
        e.preventDefault()
        if (!categor.trim()) {
            setError("Debe selecionar una categoria")
            return
        }
        if (!servicio.trim()) {
            setError("Debe selecionar un servicio")
            return
        }
        if (!descripcion.trim()) {
            setError("Ingrese una descripcion")
            return
        }
        try {
            const newLista = {
                categor, servicio, descripcion
            }
            const dato = await addDoc(collection(db, props.user.email),newLista)
            setLista([
                ...lista, {
                    ...newLista,
                    id: dato.id
                }
            ])
        } catch (error) {
            console.log(error)
        }
        setidCategoria(-1)
        setDescripcion('')
        setError(null)
    }

    const eliminar = async (id) => {
        try {
            await deleteDoc(doc(db, props.user.email, id))
            const listaFiltrada = lista.filter((elemento) => elemento.id !== id)
            setLista(listaFiltrada)
        } catch (error) {
            console.log(error)
        }
    }

    const editar = (elemento) => {
        setModoEdicion(true)
        setidCategoria(elemento.opcion)
        setCategor(elemento.categor)
        setServicio(elemento.servicio)
        setDescripcion(elemento.descripcion)
        setId(elemento.id)
    }

    const editarInfo = async (e) => {
        e.preventDefault()
        if (!categor.trim()) {
            setError("Debe selecionar una categoria")
            return
        }
        if (!servicio.trim()) {
            setError("Debe selecionar un servicio")
            return
        }
        if (!descripcion.trim()) {
            setError("Ingrese una descripcion")
            return
        }
        try {
            const docRef = doc(db, props.user.email, id);
            await updateDoc(docRef, {
                categor, servicio, descripcion
            })
            const listaEditada = lista.map(
                (elemento) => elemento.id === id ? {
                    id: id,
                    categor: categor,
                    servicio: servicio,
                    descripcion: descripcion
                } : elemento
            )
            setLista(listaEditada)
            setModoEdicion(false)
            setidCategoria(-1)
            setDescripcion('')
            setError(null)
        } catch (error) {
            console.log(error)
        }
    }

    const cancelar = () => {
        setidCategoria(-1)
        setDescripcion('')
        setError(null)
    }

    const cancelarInfo = () => {
        setidCategoria(-1)
        setDescripcion('')
        setError(null)
        setModoEdicion(!modoEdicion)
    }
    return (
        <div className='container abs-center'>
            <div className='row justify-content-center pt-5 mt-5'>
                <div className='col-md-4 col-sm-6 xl-6 col-lg-7 rounded formulario border'>
                    <form onSubmit={modoEdicion ? editarInfo : guardar}>
                        <h3 className='text-center text-light'>{modoEdicion ? 'Editar solicitud' : 'Hacer su solicitud'}</h3>
                        <hr />
                        {
                            error ? <div className="alert alert-danger" role="alert">
                                <i className='bi bi-exclamation-triangle'> {error}</i>
                            </div> : null
                        }
                        <div className="mb-3">
                            <h6 className='text-light'>Categoria:</h6>
                            <select name="categoria" id="selectCategoria" className='form-select' onChange={opciones}>
                                <option value={-1}>Selecione Una Categoria</option>
                                {
                                    categorias.map((element, i) => (
                                        <option key={'categoria' + i} value={i}>{element.nombre}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="mb-3">
                            <h6 className='text-light'>Servicio:</h6>
                            <select name="opciones" id="selectOpciones" className='form-select' onChange={datosSelect}>
                                <option value={-1}>Seleccione Un Servico</option>
                                {
                                    idCategoria > -1 && (
                                        categorias[idCategoria].opciones.map((element, i) => (
                                            <option value={element.opciones} key={'opcion' + i}>{element}</option>
                                        ))
                                    )
                                }
                            </select>
                        </div>
                        <div className="mb-3">
                            <h6
                                className='text-light'>Descripcion:</h6>
                            <input type="text"
                                className='form-control'
                                onChange={(e) => { setDescripcion(e.target.value) }}
                                value={descripcion} />
                        </div>
                        <div className="d-grid gap-2">
                            {
                                modoEdicion ? (<button className='btn btn-dark rounded-3 ingresar text-light'>Editar</button>) :
                                    (<button className='btn btn-dark rounded-3 ingresar text-light'>Guardar</button>)
                            }
                            {
                                modoEdicion ? (<button type='button' className='btn btn-dark rounded-3 ingresar text-light' onClick={() => { cancelarInfo() }}>Cancelar</button>) :
                                    (<button type='button' className='btn btn-dark rounded-3 ingresar text-light' onClick={() => cancelar()}>Cancelar</button>)
                            }
                        </div>
                    </form>
                </div>
                <div className='col-md-4 col-sm-6 xl-6 col-lg-5 rounded formulario border'>
                    <h3 className='text-light text-center'>Historial de solicitudes</h3>
                    <hr />
                    {
                        lista.map((e) => (
                            <ul className="list-group list-group" key={e.id}>
                                <li className='list-group-item text-center'>
                                    <div className="ms-2 me-auto">
                                        <span className='fw-bold'>Categoria: {e.categor}</span>
                                        <br />
                                        <span className='fw-bold'>Servicio: {e.servicio}</span>
                                        <br />
                                        <span className='fw-bold'> Descripcion:
                                            <p className='fw-normal'>{e.descripcion}</p>
                                        </span>
                                    </div>
                                    <div className="d-grid gap-2 d-md-block align-items-end">
                                        <button className="btn btn-dark rounded-3 ingresar text-light" type="button" onClick={() => eliminar(e.id)}>Eliminar</button>
                                        <br />
                                        <button className="btn btn-dark rounded-3 ingresar text-light" type="button" onClick={() => editar(e)}>Editar</button>
                                    </div>
                                </li>
                            </ul>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Registrar