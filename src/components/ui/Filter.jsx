import { FaTrashAlt, FaSearch } from "react-icons/fa";
import React, { Fragment, useState, useEffect } from "react";

export default function Filter({
  productos,
  productosFiltrados,
  setProductosFiltrados,
  busqueda,
  setBusqueda,
  limpiarBusqueda
}) {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [categoria, setCategoria] = useState("");
  const [valorCategoria, setValorCategoria] = useState("");

  // Opciones para los selects
  const marcas = [...new Set(productos.map(p => p.marca))];
  const btus = [...new Set(productos.map(p => p.btu))];
  const wifiOptions = ["Con WiFi", "Sin WiFi"];

  const filtrarProductos = (termino) => {
    if (!termino.trim()) {
      setProductosFiltrados(productos);
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const terminoLower = termino.toLowerCase();
    const filtrados = productos.filter(producto =>
      producto.marca.toLowerCase().includes(terminoLower) ||
      producto.modelo.toLowerCase().includes(terminoLower) ||
      producto.btu.toString().includes(terminoLower) ||
      producto.precio.toString().includes(terminoLower)
    );

    setProductosFiltrados(filtrados);

    const sugerenciasSet = new Set();
    productos.forEach((producto) => {
      if (producto.marca.toLowerCase().includes(terminoLower)) {
        sugerenciasSet.add(producto.marca);
      }
      if (producto.modelo.toLowerCase().includes(terminoLower)) {
        sugerenciasSet.add(`${producto.marca} ${producto.modelo}`);
      }
      if (producto.btu.toString().includes(terminoLower)) {
        sugerenciasSet.add(`${producto.btu} BTU`);
      }
    });

    const sugerenciasArray = Array.from(sugerenciasSet).slice(0, 5);
    setSuggestions(sugerenciasArray);
    setShowSuggestions(sugerenciasArray.length > 0);
  };

  const handleBusquedaChange = (e) => {
    const valor = e.target.value;
    setBusqueda(valor);
    filtrarProductos(valor);
  };

  const handleSugerenciaClick = (sugerencia) => {
    setBusqueda(sugerencia);
    filtrarProductos(sugerencia);
    setShowSuggestions(false);
  };

  // Filtrado por categoría
  useEffect(() => {
    let filtrados = [...productos];

    if (categoria && valorCategoria) {
      switch (categoria) {
        case "marca":
          filtrados = filtrados.filter(p => p.marca === valorCategoria);
          break;
        case "btu":
          filtrados = filtrados.filter(p => p.btu === valorCategoria);
          break;
        case "wifi":
          filtrados = filtrados.filter(p => valorCategoria === "Con WiFi" ? p.wifi : !p.wifi);
          break;
        default:
          break;
      }
    }
    setProductosFiltrados(filtrados);
  }, [categoria, valorCategoria, productos]);

  return (
    <Fragment>
      <div className="row mb-4">
        <div className="col-lg-6 col-md-8 d-flex align-items-start">
          <div className="position-relative w-100">
            <div className="input-group w-100">
              <input
                type="text"
                className="form-control form-control-lg"
                style={{ height: "56px" }}
                placeholder="Buscar productos..."
                value={busqueda}
                onChange={handleBusquedaChange}
                onFocus={() => setShowSuggestions(suggestions.length > 0)}
              />
              <button
                className="btn btn-danger"
                type="button"
                style={{ height: "56px" }}
                onClick={limpiarBusqueda}
              >
                <FaTrashAlt />
              </button>
              <button
                className="btn btn-primary"
                type="button"
                style={{ height: "56px" }}
              >
                <FaSearch />
              </button>
            </div>
            {showSuggestions && (
              <div
                className="position-absolute w-100 bg-white border border-top-0 rounded-bottom shadow-lg"
                style={{ zIndex: 1000, maxHeight: '200px', overflowY: 'auto' }}
              >
                {suggestions.map((sugerencia, index) => (
                  <div
                    key={index}
                    className="px-3 py-2 border-bottom cursor-pointer hover-bg-light"
                    onClick={() => handleSugerenciaClick(sugerencia)}
                    style={{ zIndex: 1000, maxHeight: '200px', overflowY: 'auto' }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                  >
                    {sugerencia}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="col-lg-6 col-md-4 d-flex justify-content-end align-items-start">
          <div className="d-flex gap-3 w-100 justify-content-end">
            <select
              className="form-select form-select-lg"
              style={{ maxWidth: "100%", width: "100%", height: "56px" }}
              value={categoria}
              onChange={e => {
                setCategoria(e.target.value);
                setValorCategoria("");
              }}
            >
              <option value="">Categorías</option>
              <option value="marca">Marca</option>
              <option value="btu">BTU</option>
              <option value="wifi">WiFi</option>
            </select>
            {categoria === "marca" && (
              <select
                className="form-select form-select-lg"
                style={{ maxWidth: "100%", width: "100%", height: "56px" }}
                value={valorCategoria}
                onChange={e => setValorCategoria(e.target.value)}
              >
                <option value="">Selecciona marca</option>
                {marcas.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            )}
            {categoria === "btu" && (
              <select
                className="form-select form-select-lg"
                style={{ maxWidth: "100%", width: "100%", height: "56px" }}
                value={valorCategoria}
                onChange={e => setValorCategoria(Number(e.target.value))}
              >
                <option value="">Selecciona BTU</option>
                {btus.map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            )}
            {categoria === "wifi" && (
              <select
                className="form-select form-select-lg"
                style={{ maxWidth: "100%", width: "100%", height: "56px" }}
                value={valorCategoria}
                onChange={e => setValorCategoria(e.target.value)}
              >
                <option value="">Selecciona WiFi</option>
                {wifiOptions.map(w => (
                  <option key={w} value={w}>{w}</option>
                ))}
              </select>
            )}
            {(categoria || valorCategoria) && (
              <button
                className="btn btn-danger"
                type="button"
                style={{ height: "56px" }}
                title="Limpiar filtro de categoría"
                onClick={() => {
                  setCategoria("");
                  setValorCategoria("");
                  setProductosFiltrados(productos);
                }}
              >
                <FaTrashAlt />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-lg-6 col-md-8 mx-auto">
          <div className="position-relative"></div>
          {busqueda && (
            <div className="mt-2 text-muted text-center">
              {productosFiltrados.length} resultado{productosFiltrados.length !== 1 ? 's' : ''} 
              {busqueda && ` para "${busqueda}"`}
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
}
