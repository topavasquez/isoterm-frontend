import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import "./bootstrap.min.css";
import Aires from "./components/aires/Aires";
import Dashboard from "./components/dashboard/Dashboard";
import Vendedores from "./components/vendedores/Vendedores";
import PaginaPrincipal from "./components/paginaPrincipal/PaginaPrincipal";
import Producto from "./components/productos/Producto";
import Header from "./components/Header";
import { CarritoProvider } from "./context/CarritoContext";

function App() {
  return (
    <CarritoProvider>
      <Router>
        <Header />
        <Routes>
          {/* Página principal de productos */}
          <Route path="/" element={<PaginaPrincipal />} />

          <Route path="/producto/:id" element={<Producto />} />

          {/* Rutas del dashboard con módulos */}
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="aires" element={<Aires />} />
            <Route path="vendedores" element={<Vendedores />} />
          </Route>
        </Routes>
      </Router>
    </CarritoProvider>
  );
}

export default App;
