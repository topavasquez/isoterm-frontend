import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext()

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth debe ser usado dentro de AuthProvider")
    }
    return context
}


export function AuthProvider({ children }) {

    const [usuario, setUsuario] = useState(null);

    useEffect(() =>{
        revisarSesion()
    }, [])

    const revisarSesion = () => {
        const usuario = localStorage.getItem('usuario')
        if (usuario) {
            setUsuario(JSON.parse(usuario))
        }
    }

    const logout = () => {
        localStorage.removeItem('usuario')
        setUsuario(null)
    }

    const value = {
        usuario,
        logout,
        setUsuario
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}