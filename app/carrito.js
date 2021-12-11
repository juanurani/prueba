/*
-----------------
--Local Storage--
-----------------*/
// Obtener el precio total del carrito
let precioTotal = JSON.parse(localStorage.getItem("precioTotal"))
// Obtener items del carrito
let productosDelLocalStorage = JSON.parse(localStorage.getItem("productoLocalStorage"))


/*
-------------------
-Mostrar productos-
-------------------*/
// div donde se muestran los productos
let tablaProductos = document.querySelector("#productosTabla")
// Creamos una nueva tabla
let cuerpoTabla = document.createElement("tbody")
// Agregamos la nueva tabla al div
tablaProductos.appendChild(cuerpoTabla)

// For each de todos los productos
productosDelLocalStorage.forEach(producto =>{
let fila = document.createElement("tr")

let td = document.createElement("td") 
td.innerHTML = `<img src="../imagenes/${producto.id}.png" alt="Imagen de Producto">`;
fila.appendChild(td)

td = document.createElement("td") 
td.innerText = producto.nombre;
fila.appendChild(td)

td = document.createElement("td") 
td.innerText = `$${producto.precio.toLocaleString('en-US')}`;
fila.appendChild(td)

td = document.createElement("td") 
td.innerText = producto.cantidad;
fila.appendChild(td)

td = document.createElement("td") 
td.innerHTML = `<button>Eliminar</button>`;
fila.appendChild(td)

cuerpoTabla.appendChild(fila)
})

// Coste total del pedido
let totalPedido = document.querySelector("#totalPedido").innerHTML += `Total: $${precioTotal.toLocaleString('en-US')}`

// Botón finalizar compra
let finalizarCompra = document.querySelector("#botonFinalizarCompra").addEventListener('click', () =>{
// Sección de pago
let pago = document.querySelector("#pago")
pago.scrollIntoView()
})

// Botón de realizar pago
let realizarPago = document.querySelector("#realizarPago").addEventListener('click', () =>{
    $("#pago").empty();
})















