import React from "react";

export default function Footer() {
  return (
    <footer className="bg-primary text-white mt-5">
      <div className="container py-4">
        <div className="row g-4">
          {/* Logo y descripción */}
          <div className="col-lg-6 col-md-6">
            <h5 className="text-white mb-3">IsotermChile</h5>
            <p className="text-light">
              Los mejores aires acondicionados para tu hogar y oficina. Calidad,
              eficiencia y confort garantizado.
            </p>
            <div className="d-flex gap-3 mt-3">
              <a href="#" className="text-warning text-decoration-none">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-warning text-decoration-none">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-warning text-decoration-none">
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>

          {/* Contacto */}
          <div className="col-lg-6 col-md-6">
            <h6 className="text-white mb-3">Contacto</h6>
            <p className="text-light mb-2">
              <i className="fas fa-map-marker-alt me-2"></i>
              Chillán, Chile
            </p>
            <p className="text-light mb-2">
              <i className="fas fa-phone me-2"></i>
              +56 9 5619 0496
            </p>
            <p className="text-light mb-2">
              <i className="fas fa-envelope me-2"></i>
              contacto@isotermchile.cl
            </p>
          </div>
        </div>

        {/* Línea divisoria */}
        <hr className="border-secondary my-3" />

        {/* Copyright */}
        <div className="row">
          <div className="col-12 text-center">
            <p className="text-light mb-0">
              &copy; 2025 IsotermChile. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
