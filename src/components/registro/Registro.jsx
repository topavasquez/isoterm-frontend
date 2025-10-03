import React, { useEffect, useState } from 'react'
import './registro.css'
import { Link, useNavigate } from 'react-router-dom'

export default function Registro() {

    const navigate = useNavigate();

    const comprobarSesion = () => {
        const usuario = localStorage.getItem('usuario');
        if (usuario) {
            const usuarioObj = JSON.parse(usuario);
            if (usuarioObj.rol === 'admin' || usuarioObj.rol === 'vendedor') {
                navigate('/dashboard');
            } else {
                navigate('/');
            }
        }
    }

    useEffect(() => {
        comprobarSesion()
    }, [])

    const [form, setForm] = useState({
        nombre: '',
        apellido: '',
        correo: '',
        password: '',
        confirmarPassword: ''
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.id]: e.target.value
        })
    }

    const registrarse = (e) => {
        e.preventDefault()
        console.log(form)
    }

    return (
        <main className="registro-bg d-flex align-items-center justify-content-center vh-100">
            <div className="card p-4 shadow rounded" style={{ minWidth: '350px', maxWidth: '400px', width: '100%' }}>
                <form onSubmit={registrarse}>
                    <div className="text-center mb-4">
                        <h1 className="h3 mb-3 fw-bold">Registrarse</h1>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="nombre"
                            value={form.nombre}
                            onChange={handleChange}
                            placeholder="Nombre"
                        />
                        <label htmlFor="nombre">Nombre</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="apellido"
                            value={form.apellido}
                            onChange={handleChange}
                            placeholder="Apellido"
                        />
                        <label htmlFor="apellido">Apellido</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="email"
                            className="form-control"
                            id="correo"
                            value={form.correo}
                            onChange={handleChange}
                            placeholder="Correo electrónico"
                        />
                        <label htmlFor="correo">Correo electrónico</label>
                    </div>
                    <div className="form-floating mb-4">
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Contraseña"
                        />
                        <label htmlFor="password">Contraseña</label>
                    </div>
                    <div className="form-floating mb-4">
                        <input
                            type="password"
                            className="form-control"
                            id="confirmarpassword"
                            value={form.confirmarPassword}
                            onChange={handleChange}
                            placeholder="Contraseña"
                        />
                        <label htmlFor="confirmarpassword">Confirmar contraseña</label>
                    </div>
                    <button className="btn btn-primary w-100 py-2" type="submit">
                        Crear cuenta
                    </button>
                    <Link to="/login" className="d-block text-center mt-3">
                        ¿Ya tienes una cuenta? Inicia sesión
                    </Link>
                </form>
            </div>
        </main>
    )
}