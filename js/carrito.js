
/* Variables */

let carritoProductos = JSON.parse(localStorage.getItem("carrito-productos"));
const carritoVacio = document.querySelector("#carrito-vacio");
const carritoContenedor = document.querySelector("#carrito-productos-contenedor");
const vaciarCarrito = document.querySelector("#vaciar-carrito");
const comprarCarrito = document.querySelector("#cont-comprar");
const totalPrecio = document.querySelector("#total-precio");
const carritoComprado = document.querySelector("#comprado-id");

let botonesEliminar = document.querySelectorAll(".eliminar-producto");

/* Funcion para cargar los productos en la pagina del carrito */

function cargarProductosC() {
    if (carritoProductos && carritoProductos.length > 0) {

/* Este es un bucle creado para que cuando haya productos en el carrito se le agregue la clase "ocultar" a la seccion de carrito vacio y vaciar carrito  */

        carritoVacio.classList.add("ocultar");
        carritoContenedor.classList.remove("ocultar");
        vaciarCarrito.classList.remove("ocultar");
      
/* Creo un div para agregar los productos seleccionados adentro */       

        carritoContenedor.innerHTML = "";
        const carritoProductosDiv = document.createElement("div");

/* Uso el metodo forEach para recorrer el array de productos y por cada producto seleccionado crear una serie de elementos */        

        carritoProductos.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("comprado");
            div.innerHTML = `
                <div class="contenedorproductos">
                    <img src="${producto.img}" alt="${producto.nombre}" class="imgcarritodos">
                </div>
                <div class="contenedorproductos">
                    <p class="productodos">Producto</p>
                    <p class="tipodos">${producto.nombre}</p>
                </div>
                <div class="contenedorproductos">
                    <p class="productodos">Precio</p>
                    <p class="tipodos">$${producto.precio}</p>
                </div>
                <div class="contenedorproductos">
                    <p class="productodos">Cantidad</p>
                    <p class="tipodos">${producto.cantidad}</p>
                </div>
                
                <div class="contenedorproductos">
                    <button class="eliminar-producto" data-id="${producto.id}"><img src="/imgs/symbols/icons8-basura-48.png" alt=""></button>
                </div>
                <div class="contenedorproductos">
                    <button class="disminuir-cantidad" data-id="${producto.id}">-</button>
                </div>
                <div class="contenedorproductos">
                    <button class="aumentar-cantidad" data-id="${producto.id}">+</button>
                </div>
                
            `;

/* Uso el metodo append para agregar los elementos al div */            

            carritoProductosDiv.append(div);
        });

        carritoContenedor.append(carritoProductosDiv);

/* Ejecuto funciones para actualizar las cantidades */        

        actualizarBotonesEliminar();
        actualizarBotonesCantidad();
        
/* En el caso de que no se seleccione ningun articulo se reasignan las clases "ocultar" para ver la seccion del carrito vacio */

    } else {
        carritoVacio.classList.remove("ocultar");
        carritoContenedor.classList.add("ocultar");
        vaciarCarrito.classList.add("ocultar");
        comprarCarrito.classList.add("ocultar");
        
    };

/* Funcion para que al final de todo se actualice el precio total  */

     actualizarPrecio();
};


/* Funcion para seleccionar el icono del tarro de basura y ejecutar la funcion para eliminar productos */


function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".eliminar-producto");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
};

/* Funcion para actualizar la cantidad de los productos */

function actualizarBotonesCantidad() {
    const botonesAumentar = document.querySelectorAll(".aumentar-cantidad");
    const botonesDisminuir = document.querySelectorAll(".disminuir-cantidad");

    botonesAumentar.forEach(boton => {
        boton.addEventListener("click", aumentarCantidad);
    });

    botonesDisminuir.forEach(boton => {
        boton.addEventListener("click", disminuirCantidad);
    });
};

/* Funcion para aumentar la cantidad del producto */

function aumentarCantidad(e) {
    const idBoton = e.currentTarget.getAttribute("data-id");
    const producto = carritoProductos.find(p => p.id === idBoton);

    if (producto) {
        producto.cantidad++;
        localStorage.setItem("carrito-productos", JSON.stringify(carritoProductos));
        cargarProductosC();
    }
};

/* Funcion para disminuir la cantidad del producto */

function disminuirCantidad(e) {
    const idBoton = e.currentTarget.getAttribute("data-id");
    const producto = carritoProductos.find(p => p.id === idBoton);

    if (producto && producto.cantidad > 1) {
        producto.cantidad--;
        localStorage.setItem("carrito-productos", JSON.stringify(carritoProductos));
        cargarProductosC();
    }
};

/* Funcion para eliminar productos del carrito */

function eliminarDelCarrito(e) {
    const idBoton = e.currentTarget.getAttribute("data-id");
    carritoProductos = carritoProductos.filter(producto => producto.id !== idBoton);
    localStorage.setItem("carrito-productos", JSON.stringify(carritoProductos));
    cargarProductosC();
};

/* Escuchador para vaciar el carrito */

vaciarCarrito.addEventListener("click", vaciaElCarrito);

/* Funcion para vaciar el carrito */

function vaciaElCarrito(){
    carritoProductos.length = 0;
    localStorage.setItem("carrito-productos", JSON.stringify(carritoProductos));
    cargarProductosC();
};

/* Funcion para actualizar el precio */

function actualizarPrecio() {
    const totalCalculado = totalPrecio.innerText = carritoProductos.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    totalPrecio.innerText = `$${totalCalculado}`;
   
};

carritoComprado.addEventListener("click", vaciaElCarrito);

cargarProductosC();