import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import './bootstrap.min.css';
import Aires from './components/aires/Aires';
import Dashboard from './components/dashboard/Dashboard';
import Vendedores from './components/vendedores/Vendedores';
import PaginaPrincipal from './components/paginaPrincipal/PaginaPrincipal';
import Registro from './components/registro/Registro';
import Login from './components/login/Login';
import Producto from './components/productos/Producto';
import Perfil from './components/perfil/Perfil';

function App() {
  return (
    <Router>
      <Routes>
        {/* Página principal de productos */}
        <Route path="/" element={<PaginaPrincipal />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="/producto/:id" element={<Producto/>} />
        <Route path="/perfil" element={<Perfil/>} />

        {/* Rutas del dashboard con módulos */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="aires" element={<Aires />} />
          <Route path="vendedores" element={<Vendedores />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
