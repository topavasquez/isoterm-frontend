import React, { use, useEffect, useState } from 'react'
import './registro.css'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext';

export default function Registro() {

    const { usuario } = useAuth();
    const navigate = useNavigate();

    const comprobarSesion = () => {
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

    const [loading, setLoading] = useState(false)

    const [form, setForm] = useState({
        nombre: '',
        apellido: '',
        correo: '',
        password: '',
        confirmarPassword: '',
        telefono: '',
        direccion: ''
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.id]: e.target.value
        })
    }

    const registrarse = async (e) => {
        e.preventDefault()
        console.log(form)

        if (Object.values(form).some(value => value.trim() === '')) {
            alert('Por favor, complete todos los campos')
            return
        }

        if (form.password !== form.confirmarPassword) {
            alert('Las contraseñas no coinciden')
            return
        }

        setLoading(true)

        await fetch('http://localhost:3000/api/usuarios/cliente', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: form.nombre,
                apellido: form.apellido,
                correo: form.correo,
                password: form.password,
                telefono: form.telefono,
                direccion: form.direccion
            })
        })
        .then(res => res.json())
        .then(data => {
            localStorage.setItem('usuario', JSON.stringify(data));
            setLoading(false)
            alert('Usuario registrado con éxito');
            navigate('/');
        })
        .catch(err => {
            setLoading(false)
            console.error('Error:', err);
            alert('Error al registrar el usuario');
        });

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
                            id="confirmarPassword"
                            value={form.confirmarPassword}
                            onChange={handleChange}
                            placeholder="Contraseña"
                        />
                        <label htmlFor="confirmaPpassword">Confirmar contraseña</label>
                    </div>
                    <div className="form-floating mb-4">
                        <input
                            type="text"
                            className="form-control"
                            id="direccion"
                            value={form.direccion}
                            onChange={handleChange}
                            placeholder="Direccion"
                        />
                        <label htmlFor="direccion">Dirección</label>
                    </div>
                    <div className="form-floating mb-4">
                        <input
                            type="number"
                            className="form-control"
                            id="telefono"
                            value={form.telefono}
                            onChange={handleChange}
                            placeholder="Telefono"
                        />
                        <label htmlFor="telefono">Teléfono</label>
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