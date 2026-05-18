//--- Funcion que obtiene el carrito del LocalStorage, lo parsea a un array y lo retorna ---//
function obtenerCarrito() 
{
    const carrito_string = localStorage.getItem("carrito");  //busco el string en el storage
    return carrito_string ? JSON.parse(carrito_string) : []; 
}

//--- Funcion que guarda el carrito recibido al LocalStorage, previamente transformado a string ---//
function guardarCarrito(carrito) 
{
    localStorage.setItem("carrito", JSON.stringify(carrito)); //transformo el array de objetos a texto antes de subirlo
}

function sumarAlCarrito(e) 
{
    e.stopPropagation(); //freno para que el click no se expanda por todos lados
    let elementoClickeado = e.target; // capturo el boton
    let contenedorPadre = elementoClickeado.parentElement; //manejo los datos de la card
    
    let nombreProducto = contenedorPadre.querySelector(".nombre-producto").textContent; //agarro el texto del nombre y el precio de los elementos
    let precioTexto = contenedorPadre.querySelector(".precio-producto").textContent; 
    let precioNumero = parseInt(precioTexto.replace("$", "")); //valido el precio: le saco el signo '$' y lo convierto a entero para poder usarlo

    let carrito = obtenerCarrito();
    let productoEncontrado = carrito.find(p => p.nombre === nombreProducto); //me fijo si existe ekl producto

    if (productoEncontrado) {
        productoEncontrado.cantidad += 1;
    } else {
        //si no habia y se agrega, creo el objeto con los datos completos
        let nuevoProducto = {
            nombre: nombreProducto,
            precio: precioNumero, 
            cantidad: 1
        };
        carrito.push(nuevoProducto); 
    }

    alert(`Un/una: ${nombreProducto} fue agregado al carrito.`); 
    //dejo el log para chusmear en consola como quedo el array
    console.log("Carrito antes de guardar:", carrito);
    guardarCarrito(carrito);
}

function restarDelCarrito(e) 
{
    e.stopPropagation(); 
    let elementoClickeado = e.target;
    let contenedorPadre = elementoClickeado.parentElement; 
    let nombreProducto = contenedorPadre.querySelector(".nombre-producto").textContent;
    let carrito = obtenerCarrito();
    //si el carrito esta vacio, aviso
    if (carrito.length === 0) { 
        alert("No hay ningun producto guardado en el carrito.");
        return;
    }

    let productoEncontrado = carrito.find(p => p.nombre === nombreProducto); //busco el producto que se quiere sacar del array

    //si el producto ni figura en el carrito, aviso que no hay
    if (!productoEncontrado) { 
        alert(`No hay mas ${nombreProducto} en el carrito.`);
        return;
    }

    productoEncontrado.cantidad -= 1; //resto la cantidad del item
    alert(`${nombreProducto} fue eliminado del carrito.`);

    carrito = carrito.filter(p => p.cantidad > 0); 
    console.log("Carrito antes de guardar:", carrito);

    guardarCarrito(carrito);
}

//--- [EVENTOS] Asociacion del evento "click" a los botones "+" y "-" con la funcion manejadora del evento ---//
window.addEventListener("DOMContentLoaded", () => 
{
    const botonesSumar = document.querySelectorAll(".btn-sumar-a-carrito");
    const botonesRestar = document.querySelectorAll(".btn-restar-a-carrito");

    botonesSumar.forEach(btn => btn.addEventListener("click", sumarAlCarrito));
    botonesRestar.forEach(btn => btn.addEventListener("click", restarDelCarrito));
});
