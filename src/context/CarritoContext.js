import React, { createContext, useContext, useState, useEffect } from "react";

const CarritoContext = createContext();

export function useCarrito() {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error("useCarrito debe ser usado dentro de CarritoProvider");
  }
  return context;
}

export function CarritoProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCarritoOpen, setIsCarritoOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem("isoterm-carrito");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
      } catch (error) {
        console.error("Error loading cart from localStorage:", error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Guardar carrito en localStorage cuando cambie (solo después de cargar)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("isoterm-carrito", JSON.stringify(cartItems));
    }
  }, [cartItems, isLoaded]);

  const agregarAlCarrito = (producto) => {
    setCartItems((prevItems) => {
      // Buscar producto exactamente igual (mismo ID único)
      const existingItem = prevItems.find((item) => item.id === producto.id);

      let newItems;
      if (existingItem) {
        // Si el producto ya existe exactamente, aumentar cantidad
        newItems = prevItems.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
        console.log(
          `Producto ${producto.nombre} ya existe. Nueva cantidad: ${
            existingItem.cantidad + 1
          }`
        );
      } else {
        // Si es un producto nuevo o con características diferentes, agregarlo como nuevo
        newItems = [...prevItems, { ...producto, cantidad: 1 }];
        console.log(
          `Nuevo producto agregado: ${producto.nombre} (ID: ${producto.id})`
        );
      }

      console.log(
        "Estado del carrito:",
        newItems.map((item) => ({
          id: item.id,
          nombre: item.nombre,
          precio: item.precio,
          cantidad: item.cantidad,
        }))
      );
      return newItems;
    });
  };

  const actualizarCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad <= 0) {
      eliminarDelCarrito(id);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, cantidad: nuevaCantidad } : item
      )
    );
  };

  const eliminarDelCarrito = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const vaciarCarrito = () => {
    setCartItems([]);
    localStorage.removeItem("isoterm-carrito");
    console.log("Carrito vaciado y localStorage limpiado");
  };

  const abrirCarrito = () => {
    setIsCarritoOpen(true);
  };

  const cerrarCarrito = () => {
    setIsCarritoOpen(false);
  };

  const mostrarEstadoCarrito = () => {
    cartItems.forEach((item, index) => {
      console.log(
        `${index + 1}. ${item.nombre} - Precio: $${item.precio} - Cantidad: ${
          item.cantidad
        } - ID: ${item.id}`
      );
    });
    console.log("================================");
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.cantidad, 0);
  const totalPrecio = cartItems.reduce(
    (sum, item) => sum + item.precio * item.cantidad,
    0
  );

  const value = {
    cartItems,
    isCarritoOpen,
    agregarAlCarrito,
    actualizarCantidad,
    eliminarDelCarrito,
    vaciarCarrito,
    abrirCarrito,
    cerrarCarrito,
    mostrarEstadoCarrito,
    totalItems,
    totalPrecio,
  };

  return (
    <CarritoContext.Provider value={value}>{children}</CarritoContext.Provider>
  );
}
