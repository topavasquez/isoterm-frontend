import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import './bootstrap.min.css';
import Aires from './components/aires/Aires';
import Dashboard from './components/dashboard/Dashboard';
import Vendedores from './components/vendedores/Vendedores';
import PaginaPrincipal from './components/paginaPrincipal/PaginaPrincipal';

function App() {
  return (
    <Router>
      <Routes>
        {/* Página principal de productos */}
        <Route path="/" element={<PaginaPrincipal />} />

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
