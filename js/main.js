
/* Variables */

const contenedorProductos = document.getElementById("contenedor-productos");
const productosURL = "./data/productos.json";
const botonesCategorias = document.querySelectorAll(".b-categoria");
const numeroCantidad = document.querySelector("#numero-cantidad");
let botonesAgregar = document.querySelectorAll(".producto-agregar");




let productos = []; 



getProductos(productosURL);

/* Funcion para obtener los productos desde el archivo json */

function getProductos(url) {
    fetch(url)
        .then((res) => res.json())
        .then((datos) => {
            productos = datos.productos; 
            cargarProductos(productos);
        });
};

/* Funcion para cargar los productos en el apartado principal */

function cargarProductos(productos) {
    
    contenedorProductos.innerHTML = "";

/* Uso el metodo forEach para recorrer el array de productos y por cada producto crear una serie de elementos */  

    productos.forEach((producto) => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
        <div class="divsection">
            <img src="${producto.img}" alt="${producto.nombre}" class="imgsection">
            <p class="tipe">${producto.nombre}</p>
            <p class="price">$${producto.precio}</p>
            <button class="producto-agregar" id="${producto.id}">Agregar</button>
            <a class="ver-mas" href="/html/vermas.html">Ver mas</a>
        </div>
        `;

/* Uso el metodo append para agregar los elementos al div */          

        contenedorProductos.append(div);
    });

    actualizarBotones();
}

/* Funcion para actualizar los botones */  

function actualizarBotones() {
     botonesAgregar = document.querySelectorAll(".producto-agregar");

     botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarCarrito);
     });
};



let carritoProductos;
const carritoProductosLocalStorage = JSON.parse(localStorage.getItem("carrito-productos"));

/* Bucle para el localstorage */  

if (carritoProductosLocalStorage) {
  carritoProductos = carritoProductosLocalStorage;
  ActualizarNumeroCantidad();
} else {
    carritoProductos = [];
};

/* Funcion para agregar productos al carrito */  

function agregarCarrito(e) {
      const idDelBoton = e.currentTarget.id;
      const productoAgregado = productos.find(producto => producto.id === idDelBoton);
      
      if(carritoProductos.some(producto => producto.id === idDelBoton)){

           const index = carritoProductos.findIndex(producto => producto.id === idDelBoton);
           carritoProductos[index].cantidad++;
      } else {

        productoAgregado.cantidad = 1;
        carritoProductos.push(productoAgregado);

      }

        ActualizarNumeroCantidad();
        
        localStorage.setItem("carrito-productos", JSON.stringify(carritoProductos));
};

/* Funcion para actualizar la cantidad de los productos */  

function ActualizarNumeroCantidad(){
    let numeroCantidadAct = carritoProductos.reduce((acc, producto) => acc + producto.cantidad, 0);
    numeroCantidad.innerText = numeroCantidadAct;

};

