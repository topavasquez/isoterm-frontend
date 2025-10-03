import React, { useEffect, useState } from 'react'
import './login.css'
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {

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
        correo: '',
        password: ''
    })
    const [loding, setLoding] = useState(false)

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.id]: e.target.value
        })
    }

    const login = async (e) => {
        e.preventDefault()
        console.log('formulario', form)

        if(form.correo == '' || form.password == ''){
            alert('Por favor, complete todos los campos.')
            return
        }

        setLoding(true)
        await fetch('http://localhost:3000/api/usuarios/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        })
        .then(response => {
            if(response.status === 200){
                return response.json()
            } else if(response.status === 401 || response.status === 404){
                setLoding(false)
                alert('Correo o contraseña incorrectos.')
                throw new Error('Correo o contraseña incorrectos.')
            }
        })
        .then(data => {
            console.log('mensaje', data.message)
            console.log('usuario', data.usuario)

            const usuario = data.usuario;
            localStorage.setItem('usuario', JSON.stringify(usuario));

            setLoding(false)

            if (usuario.rol === 'admin' || usuario.rol === 'vendedor') {
                navigate('/dashboard');
            } else {
                navigate('/');
            }

        })
        .catch(error => {
            setLoding(false)
            console.error('Error al iniciar sesión:', error)
            alert('Error al iniciar sesión.')
        })
    }


    return (
        <main className="registro-bg d-flex align-items-center justify-content-center vh-100">
            <div className="card p-4 shadow rounded" style={{ minWidth: '350px', maxWidth: '400px', width: '100%' }}>
                <form onSubmit={login}>
                    <div className="text-center mb-4">
                        <h1 className="h3 mb-3 fw-bold">Iniciar Sesión</h1>
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

                    <button className="btn btn-primary w-100 py-2" type="submit">
                        {loding ?
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            :
                            'Iniciar Sesión'
                        }
                    </button>
                    <Link to="/registro" className="d-block text-center mt-3">
                        ¿No tienes una cuenta? Regístrate
                    </Link>
                </form>
            </div>
        </main>
    )
}
