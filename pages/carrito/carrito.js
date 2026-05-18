function obtenerCarrito() 
{
    const carrito_string = localStorage.getItem("carrito"); 
    return carrito_string ? JSON.parse(carrito_string) : []; 
}

function cargarProductosCarrito() 
{
    let tabla = document.getElementById("tabla-carrito");
    let contenedorTotal = document.getElementById("valor-final");

    let carrito = obtenerCarrito();
    let htmlContenido = "";
    let montoTotalAcumulado = 0;
    //me quedo solo con productos que tengan cantidades de 1 para arriba
    let productosValidos = carrito.filter(p => p.cantidad >= 1);

    if (productosValidos.length === 0) { //si no hay productos, seteo el total en $0 y limpio la pantalla
        contenedorTotal.textContent = "El valor final a pagar es de: $0";
        tabla.innerHTML = `
            <tr class="fila-header-carrito">
                <td class="celda-header-tabla-carrito">Nombre del producto</td>
                <td class="celda-header-tabla-carrito">Cantidad</td>
                <td class="celda-header-tabla-carrito">Precio unitario</td>
            </tr>
            <tr><td colspan="3" style="text-align:center; color:#808080; padding: 10px;">El carrito esta vacio.</td></tr>
        `;
        return; 
    }
    //si hay productos, inicializo el acumulador con las etiquetas del hmtl
    htmlContenido = `
        <tr class="fila-header-carrito">
            <td class="celda-header-tabla-carrito">Nombre del producto</td>
            <td class="celda-header-tabla-carrito">Cantidad</td>
            <td class="celda-header-tabla-carrito">Precio unitario</td>
        </tr>
    `;
    //recorro los productos sumando totales y acumulando
    productosValidos.forEach(p => {
        let subtotalProducto = p.precio * p.cantidad; //multiplico el precio por unidad por la cantidad para calcular el costo real del producto
        montoTotalAcumulado += subtotalProducto;
        htmlContenido += `
            <tr>
                <td>${p.nombre}</td>
                <td style="text-align: center;">${p.cantidad}</td>
                <td style="color: #ca9013; text-align: right;">$${p.precio}</td>
            </tr>
        `;
    });
    tabla.innerHTML = htmlContenido;
    //actualizo el cartel del valor final con el monto total acumulado
    contenedorTotal.textContent = `El valor final a pagar es de: $${montoTotalAcumulado}`;
}

function limpiarCarrito() 
{
    localStorage.removeItem("carrito"); 
    alert("Carrito limpiado correctamente");
    cargarProductosCarrito();
}

// Asociar evento al boton cuando la pagina carga
window.addEventListener("DOMContentLoaded", () =>
{
    cargarProductosCarrito();
    document.querySelector(".btn-limpiar-carrito").addEventListener("click", limpiarCarrito);
});