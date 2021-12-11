/*
Generar un número rándom para la tarjeta de crédito

let numeroRandom = Math.floor(Math.random () * 100000);
console.log(numeroRandom);

if (numeroRandom >= 50000){
    console.log("Numero mayor a 50,000");
} else if (numeroRandom <= 50000) {
    console.log("Numero menor a 50,000");
} else {
    console.log("Error")
}
*/


/*
---------------
--Constructor--
---------------*/
class Producto {
    constructor(nombre, precio, cantidad, categoria, marca, id){
        this.nombre = nombre;
        this.precio = parseInt(precio);
        this.cantidad = parseInt(cantidad);
        this.categoria = categoria;
        this.marca = marca;
        this.id = id;
        this.disponible = true;
    }
    sumarIva() {
        this.precio = this.precio * 1.21;
    }
    sumarEnvio() {
        this.precio = this.precio + 500;
    }
    vendido() {
        this.disponible = false;
    }
}


/*
---------------
----Arrays----
---------------*/
const carritoDeCompras = [];
const productos = [];


/*
---------------------
--Push de productos--
---------------------*/
// Productos
productos.push(new Producto("Microprocesador AMD Ryzen 3 3200G", 30000, 1, "microprocesadores", "amd", "microprocesadoramdryzen3")); 
productos.push(new Producto("Microprocesador AMD Ryzen 4 2341", 35000, 1, "microprocesadores", "amd", "microprocesadoramdryzen4")); 
productos.push(new Producto("Microprocesador AMD Ryzen 5 1600", 40000, 1, "microprocesadores", "amd", "microprocesadoramdryzen5")); 
productos.push(new Producto("Microprocesador AMD Ryzen 9 5900x", 45000, 1, "microprocesadores", "amd", "microprocesadoramdryzen9")); 
productos.push(new Producto("Microprocesador AMD Ryzen 7 3700x", 50000, 1, "microprocesadores", "amd", "microprocesadoramdryzen7"));
// Placas de video
productos.push(new Producto("Placa de video MSI Geforce GTX 1660 Super Ventus XS OC 6GB", 145000, 1, "placasdevideo", "msi", "msigtx1660"));
productos.push(new Producto("Placa de video MSI Geforce RTX 3060ti Gaming X Dual", 225000, 1, "placasdevideo", "msi", "msirtx3060ti"));
productos.push(new Producto("Placa de video Palit Geforce RTX 3070 Gaming Pro 8GB", 235000, 1, "placasdevideo", "palit", "palitrtx3070"));
productos.push(new Producto("Placa de video Gigabyte Geforce RTX 3080ti Aorus 12gb", 455000, 1, "placasdevideo", "gigabyte", "gigabytertx3080ti"));
productos.push(new Producto("Placa de video Palit Geforce RTX 3080 Gamerock 10gb", 500000, 1, "placasdevideo", "palit", "palitrtx3080"));
productos.push(new Producto("Placa de video Asus Geforce RTX 2060 Dual OC 6GB", 155000, 1, "placasdevideo", "asus", "asusrtx2060"));
productos.push(new Producto("Placa de video Gigabyte Geforce RTX 3090 Gaming OC 24gb", 650000, 1, "placasdevideo", "gigabyte", "gigabytertx3090"));
productos.push(new Producto("Placa de video Asus Radeon RX 6800 Tuf Gaming OC 16GB", 223000, 1, "placasdevideo", "asus", "asusrx6800"));
productos.push(new Producto("Placa de video MSI Radeon RX 6700 XT MECH 2X OC 12gb", 220000, 1, "placasdevideo", "msi", "msirx6700"));
productos.push(new Producto("Placa de video MSI Radeon RX 6600 XT Gaming X 8GB", 145000, 1, "placasdevideo", "msi", "msirx6600"));


/*
-------------------
---Sumado de IVA---
-------------------*/
for (const producto of productos){producto.sumarIva();}


/*
-------------------
-----Funciones-----
-------------------*/
// Función para imprimir los productos en el HTML
function imprimirProducto(producto) {
    $("#divProductos").append(`
    <div class="producto">
        <img src="../imagenes/${producto.id}.png" alt="Imagen de Producto">
        <div class="informacionPrincipalProducto">
        <h3>${producto.nombre}</h3>
            <div class="informacionSecundariaProducto">
                <p class="precioProducto">$${producto.precio.toLocaleString('en-US')}</p>
                <button class="botonCompra" id="${producto.id}">Agregar</button>
            </div>
        </div> 
    </div>
    `)
}

// Función para mostrar los productos filtrados
function mostrarProductosFiltrados(filtro, array, mensaje) {
    $(filtro).click((e) => {
        e.preventDefault()
        $("#divProductos").empty()
        for (const producto of array) {imprimirProducto(producto)}
        $(".filtro").hide()
        $(".filtros").append(`
        <div id="avisoFiltros">
            <p>Viendo sólo ${mensaje}</p>
        </div>
        `)
        agregarProductosAlCarrito()
    })
}

// Función para imprimir el producto en el carrito
function imprimirEnCarrito(){
    for (const producto of carritoDeCompras) {
        $("#productosCarrito").append(`
        <div class="productoCarrito">
            <div class="imagenCarrito">
                <img src="../imagenes/${producto.id}.png" alt="Imagen de Producto">
            </div>
            <div class="tituloProductoCarrito">
                <h3 class="nombreProducto">${producto.nombre}</h3>
                <div class="precioYCantidadProducto">
                    <p id="cantidadProductoCarrito ${producto.id}">${producto.cantidad}x </p>
                    <p class="precioProducto">$${producto.precio}</p>
                </div>                    
            </div>
            <div class="botonCarrito">
                <i class="fas fa-times eliminarProducto" id="${producto.id}"></i>
            </div>
        </div>
        `)
}}

// Función para actualizar el precio del carrito
function actualizarTotal(){
    let precioTotalCarrito = 0
    let precioTotalProducto = 0
    carritoDeCompras.forEach (producto => {
    precioTotalProducto = producto.cantidad * producto.precio
    precioTotalCarrito = precioTotalCarrito + precioTotalProducto
    $("#totalCarrito").html( `Total: $${precioTotalCarrito.toLocaleString('en-US')}`)
    localStorage.setItem('precioTotal', JSON.stringify(precioTotalCarrito))
    })
}

// Función agregar productos al carrito
function agregarProductosAlCarrito(){
    // Boton para agregar al carrito
    let botonCompra = document.getElementsByClassName("botonCompra");
    
    // Recorrer los botones para detectar producto
    for (const botones of botonCompra) {botones.addEventListener('click', function(e){
        // Aviso "Producto agregado al carrito"
        $("#avisoAgregadoCarrito").fadeIn(500).delay(4000).fadeOut(500);
        // Texto dentro del carrito "Agrega productos"
        $("#agregaProductos").hide();
    
        // Detectar producto   
        let targetProducto = e.target
        let productoParaCarrito = productos.find(productos => productos.id === targetProducto.id)
        const exists = carritoDeCompras.includes(productoParaCarrito)
    
        // Detectar si ya existe en el carrito
        if (exists == true){
            let cantidadProducto = productoParaCarrito.cantidad = productoParaCarrito.cantidad + 1
            $("#productosCarrito").empty()
            imprimirEnCarrito()
            actualizarTotal()
            } else{
            carritoDeCompras.push(productoParaCarrito)
            $("#productosCarrito").empty()
            imprimirEnCarrito()
            actualizarTotal()
        }   
    })}
}


/*
-------------------
-Mostrar Productos-
-------------------*/
for (const producto of productos) {imprimirProducto(producto)}


/*
-----------------
-----Carrito-----
-----------------*/
// Mostrar carrito
$(".divCarrito").hide();
$("#carrito").click(() => {$(".divCarrito").show("slide", {direction: "right"}, 200)})
// Cerrar carrito
$("#botonCerrarCarrito").click(() => {$(".divCarrito").hide("slide", {direction: "right"}, 200)})
// Página para ver el carrito y guardar los productos en el local storage
let verCarrito = document.querySelector("#verCarrito").addEventListener('click', () => localStorage.setItem('productoLocalStorage', JSON.stringify(carritoDeCompras)))


/*
---------------------
-Agregado al carrito-
---------------------*/
// Aviso
$("#avisoAgregadoCarrito").hide()
$("#cerrarAgregadoCarrito").click(() => $("#avisoAgregadoCarrito").hide())
// Función para agregar productos al carrito
agregarProductosAlCarrito()


/*
------------------------
-Eliminando del carrito-
------------------------*/
/*

let botonesEliminar = document.getElementsByClassName("eliminar")

for (const botones of botonesEliminar) {botones.addEventListener('click', function (e){
console.log("clickeado")
})}

function eliminarProducto(productoParaCarrito){

    let botonEliminar = document.getElementsByClassName("eliminarProducto")
    for (const botoness of botonEliminar) {botoness.addEventListener('click', function(e){

        let targetProducto = e.target
        let productoParaEliminar = carritoDeCompras.find(productos => productos.id === targetProducto.id)
        const exists = carritoDeCompras.includes(productoParaCarrito)


        let cantidadTotal = productoParaEliminar = productoParaEliminar - 1


        console.log(productoParaCarrito.cantidad)
         if (productoParaCarrito.cantidad <= 1) {
             console.log("Menor a 1")
         } else if (productoParaCarrito.cantidad > 1) {
             console.log("Mayor a 1")
        }
    })

}

}
*/


/*
-----------------
-----Filtros-----
-----------------*/
// Categoría
let microprocesadores = productos.filter(function(producto) {return (producto.categoria === "microprocesadores")})
let placasDeVideo = productos.filter(function(producto) {return (producto.categoria === "placasdevideo")})
let motherboards = productos.filter(function(producto) {return (producto.categoria === "motherboards")})
let memoriasRam = productos.filter(function(producto) {return (producto.categoria === "memoriasram")})
let fuentes = productos.filter(function(producto) {return (producto.categoria === "fuentes")})
// Precio
let hasta5 = productos.filter(function(producto) {return (producto.precio <= 5000)})
let hasta15 = productos.filter(function(producto) {return (producto.precio > 5000 && producto.precio <= 15000)})
let hasta30 = productos.filter(function(producto) {return (producto.precio > 15000 && producto.precio <= 30000)})
let hasta50 = productos.filter(function(producto) {return (producto.precio > 30000 && producto.precio <= 50000)})
let hasta100 = productos.filter(function(producto) {return(producto.precio > 50000 && producto.precio <= 100000)})
let masde100 = productos.filter(function(producto) {return(producto.precio > 100000)})
// Marca
let msi = productos.filter(function(producto) {return (producto.marca === "msi")})
let intel = productos.filter(function(producto) {return (producto.marca === "intel")})
let amd = productos.filter(function(producto) {return (producto.marca === "amd")})
let hyperx = productos.filter(function(producto) {return (producto.marca === "hyperx")})
let gigabyte = productos.filter(function(producto) {return (producto.marca === "gigabyte")})
let asus = productos.filter(function(producto) {return (producto.marca === "asus")})
let palit = productos.filter(function(producto) {return (producto.marca === "palit")})


/*
-----------------------------
-Mostrar productos filtrados-
-----------------------------*/
// Categoria
mostrarProductosFiltrados("#microprocesadores", microprocesadores, "la categoría microprocesadores")
mostrarProductosFiltrados("#placasDeVideo", placasDeVideo, "la categoría<br>placas de video")
mostrarProductosFiltrados("#motherboards", motherboards, "la categoría<br>motherboards")
mostrarProductosFiltrados("#memoriasRam", memoriasRam, "la categoría<br>memorias RAM")
mostrarProductosFiltrados("#fuentes", fuentes, "la categoría<br>fuentes")
// Precio
mostrarProductosFiltrados("#hasta5", hasta5, "productos de hasta<br>$5,000")
mostrarProductosFiltrados("#hasta15", hasta15, "productos desde $5,000 hasta $15,000")
mostrarProductosFiltrados("#hasta30", hasta30, "productos desde $15,000 hasta $30,000")
mostrarProductosFiltrados("#hasta50", hasta50, "productos desde $30,000 hasta $50,000")
mostrarProductosFiltrados("#hasta100", hasta100, "productos desde $50,000 hasta $100,000")
mostrarProductosFiltrados("#masde100", masde100, "productos de más de $100,000")
// Marca
mostrarProductosFiltrados("#msi", msi, "la marca<br>MSI")
mostrarProductosFiltrados("#intel", intel, "la marca<br>Intel")
mostrarProductosFiltrados("#amd", amd, "la marca<br>AMD")
mostrarProductosFiltrados("#hyperx", hyperx, "la marca<br>HyperX")
mostrarProductosFiltrados("#gigabyte", gigabyte, "la marca<br>Gigabyte")
mostrarProductosFiltrados("#asus", asus, "la marca<br>Asus")
mostrarProductosFiltrados("#palit", palit, "la marca<br>Palit")
// Limpiar filtro
$("#limpiarFiltro").click(() => {
    $("#divProductos").empty()
    for (const producto of productos) {imprimirProducto(producto)}
    $(".filtro").show()
    $("#avisoFiltros").remove()
    agregarProductosAlCarrito()
})


/*
Acciones principales con Javascript
-----------------------------------
Proceso de pago
*/