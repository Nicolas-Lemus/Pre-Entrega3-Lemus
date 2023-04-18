const calzados = [
    {nombre: "Nike", precio: 4000 , tipo:"Deportivo"},
    {nombre: "Adidas", precio: 3900, tipo:"Deportivo"},
    {nombre: "Under", precio: 5000, tipo:"Deportivo"},
    {nombre: "Puma", precio: 4900, tipo:"Deportivo"},
    {nombre: "New Balance", precio: 5200, tipo:"Deportivo"},

    {nombre: "Botas", precio: 5000, tipo:"Casual"},
    {nombre: "Nauticas", precio: 4900, tipo:"Casual"},
    {nombre: "Sneakers", precio: 6000, tipo:"Casual"},
    {nombre: "Levi’s", precio: 5390, tipo:"Casual"},
    {nombre: "Converse", precio: 5999,  tipo:"Casual"},
    
    {nombre: "Cuero", precio: 7000, tipo:"Formal"},
    {nombre: "Zapatos sin cordones", precio: 5900, tipo:"Formal"},
    {nombre: "Desert", precio: 6900, tipo:"Formal"},
    {nombre: "Oxford", precio: 6199, tipo:"Formal"},
    {nombre: "Gaziano & Girling", precio: 10000, tipo:"Formal"}
];
let nuevoProducto = new agregarProductos("Reebok", 4500, "Deportivo");
//agregamos la variable a Calzados
calzados.push(nuevoProducto);
//sin stock
calzados.splice(5,1);

function agregarProductos(nombre,precio,tipo){
    this.nombre=nombre;
    this.precio=precio;
    this.tipo=tipo;
}

//filtro de busqueda
const buscador=document.querySelector("#buscar");
buscador.addEventListener("keyup" , e => {
    if(e.target.matches("#buscar")){
        document.querySelectorAll(".card").forEach(calz =>{
            calz.textContent.toLocaleLowerCase().includes(e.target.value)
            ? calz.classList.remove("filtro")
            :calz.classList.add("filtro");
        })
    }
});

// Definimos la función que filtrará las cards por precio
const productos = document.querySelectorAll('.card');
function filtrarPorPrecio(precioMaximo) {
    for (let i = 0; i < productos.length; i++) {
        const producto = productos[i];
        const precio = parseInt(producto.querySelector('p').textContent.split('$')[1]);
        if (precio > precioMaximo) {
            producto.classList.add('filtro');
        } else {
            producto.classList.remove('filtro');
        }
    }
}

const inputPrecioMaximo = document.getElementById('precioMaximo');
inputPrecioMaximo.addEventListener('input', function() {
    const precioMaximo = parseInt(this.value);
    filtrarPorPrecio(precioMaximo);
});
//talles


/* const talles = [40, 41, 42, 43, 44];
const productosTalles = document.querySelectorAll('.card');
const carrito = document.querySelector('.listado');
const contadorCarrito = document.querySelector('#valorCarrito');
const carritoCompras = JSON.parse(localStorage.getItem('carrito')) || [];

let cantidadProductos = 0;
let totalCarrito = 0;
let divTotalCarrito = document.getElementById("totalCarrito");

productosTalles.forEach(producto => {
    const nombreProducto = producto.querySelector('.card-title').textContent;
    const precioProducto = producto.querySelector('.card-text').textContent;
    const botonesTalles = producto.querySelectorAll('.btn-outline-secondary');

    let talleSeleccionado;

    botonesTalles.forEach(botonTalle => {
        botonTalle.addEventListener('click', () => {
            botonesTalles.forEach(boton => {
                boton.classList.remove('seleccionado');
            });
            botonTalle.classList.add('seleccionado');
            talleSeleccionado = botonTalle.textContent;
        });
    });

    const botonTarjeta = producto.querySelector('.btn-primary');
    botonTarjeta.addEventListener('click', () => {
        if (!talleSeleccionado) {
            return;
        }
        const productoSeleccionado = `${nombreProducto} - ${precioProducto} - Talle ${talleSeleccionado}`;
        carritoCompras.push(productoSeleccionado);
        localStorage.setItem('carrito', JSON.stringify(carritoCompras));
        const li = document.createElement('li');
        li.classList.add('producto-carrito');
        li.innerHTML = `
        <span class="nombre">${nombreProducto}</span>
        <span>Talle ${talleSeleccionado}</span>
        <span class="precio">${precioProducto}</span>
        <button class="eliminar-producto">X</button>
        `;
        carrito.appendChild(li);
        talleSeleccionado = null;
        botonesTalles.forEach(boton => {
            boton.classList.remove('seleccionado');
        });
        cantidadProductos++;
        contadorCarrito.textContent = cantidadProductos;

        const precioProductoNumerico = parseFloat(precioProducto); 
        totalCarrito += precioProductoNumerico;
        divTotalCarrito.innerHTML = `Total: ${totalCarrito.toFixed(2)}`;
    });
});
carrito.addEventListener('click', (event) => {
    if (event.target.classList.contains('eliminar-producto')) {
        const productoAEliminar = event.target.parentNode;
        const nombreProductoAEliminar = productoAEliminar.querySelector('.nombre').textContent;
        const precioProductoAEliminar = productoAEliminar.querySelector('.precio').textContent;
        const precioProductoAEliminarNumerico = parseFloat(precioProductoAEliminar);
        const indiceProductoAEliminar = carritoCompras.findIndex(producto => producto.includes(nombreProductoAEliminar) && producto.includes(precioProductoAEliminar));
        if (indiceProductoAEliminar !== -1) {
            carritoCompras.splice(indiceProductoAEliminar, 1);
            localStorage.setItem('carrito', JSON.stringify(carritoCompras));
            productoAEliminar.remove();
            cantidadProductos--;
            contadorCarrito.textContent = cantidadProductos;
            // Calcular el precio total del carrito a partir de los productos restantes
            let totalCarritoActual = totalCarrito;
            carritoCompras.forEach(producto => {
                const precioProducto = producto.split(' - ')[1];
                const precioNumerico = parseFloat(precioProducto);
                if (!isNaN(precioNumerico)) {
                    totalCarritoActual += precioNumerico;
                }
            });
            totalCarrito = totalCarritoActual;
            const divTotalCarrito = document.getElementById("totalCarrito");
            divTotalCarrito.innerHTML = `Total: ${totalCarrito.toFixed(2)}`;
        }
    }
});
if (carritoCompras.length > 0) {
    carritoCompras.forEach(producto => {
        const li = document.createElement('li');
        li.classList.add('producto-carrito');
        li.innerHTML = `
            <span class="nombre">${producto.split(' - ')[0]}</span>
            <span>${producto.split(' - ')[2]}</span>
            <span class="precio">${producto.split(' - ')[1]}</span>
            <button class="eliminar-producto">X</button>
        `;
        carrito.appendChild(li);
        cantidadProductos++;
        contadorCarrito.textContent = cantidadProductos;
        const precioProductoNumerico = parseFloat(precioProducto.split(' - ')[1]); 
        totalCarrito += precioProductoNumerico;
    });
    divTotalCarrito.innerHTML = `Total: ${totalCarrito.toFixed(2)}`; 
} */
const talles = [40, 41, 42, 43, 44];
const productosTalles = document.querySelectorAll('.card');
const carrito = document.querySelector('.listado');
const contadorCarrito = document.querySelector('#valorCarrito');
const carritoCompras = JSON.parse(localStorage.getItem('carrito')) || [];
const divTotalCarrito = document.getElementById("totalCarrito");

let cantidadProductos = 0;
let totalCarrito = 0;


function agregarProductoAlCarrito(nombreProducto, precioProducto, talleSeleccionado) {
    const productoSeleccionado = `${nombreProducto} - ${precioProducto} - Talle ${talleSeleccionado}`;
    carritoCompras.push(productoSeleccionado);
    localStorage.setItem('carrito', JSON.stringify(carritoCompras));
    const li = document.createElement('li');
    li.classList.add('producto-carrito');
    li.innerHTML = `
        <span class="nombre">${nombreProducto}</span>
        <span>Talle ${talleSeleccionado}</span>
        <span class="precio">${precioProducto}</span>
        <button class="eliminar-producto">X</button>
    `;
    carrito.appendChild(li);
    cantidadProductos++;
    contadorCarrito.textContent = cantidadProductos;
    const precioProductoNumerico = parseFloat(precioProducto); 
    totalCarrito += precioProductoNumerico;
    divTotalCarrito.innerHTML = `Total: ${totalCarrito.toFixed(2)}`;
}

productosTalles.forEach(producto => {
    const nombreProducto = producto.querySelector('.card-title').textContent;
    const precioProducto = producto.querySelector('.card-text').textContent;
    const botonesTalles = producto.querySelectorAll('.btn-outline-secondary');

    let talleSeleccionado;

    botonesTalles.forEach(botonTalle => {
        botonTalle.addEventListener('click', () => {
            botonesTalles.forEach(boton => {
                boton.classList.remove('seleccionado');
            });
            botonTalle.classList.add('seleccionado');
            talleSeleccionado = botonTalle.textContent;
        });
    });

    const botonTarjeta = producto.querySelector('.btn-primary');
    botonTarjeta.addEventListener('click', () => {
        if (!talleSeleccionado) {
            return;
        }
        agregarProductoAlCarrito(nombreProducto, precioProducto, talleSeleccionado);
        talleSeleccionado = null;
        botonesTalles.forEach(boton => {
            boton.classList.remove('seleccionado');
        });
    });
});

carrito.addEventListener('click', (event) => {
    if (event.target.classList.contains('eliminar-producto')) {
        const productoAEliminar = event.target.parentNode;
        const nombreProductoAEliminar = productoAEliminar.querySelector('.nombre').textContent;
        const precioProductoAEliminar = productoAEliminar.querySelector('.precio').textContent;
        const precioProductoAEliminarNumerico = parseFloat(precioProductoAEliminar);
        const indiceProductoAEliminar = carritoCompras.findIndex(producto => producto.includes(nombreProductoAEliminar) && producto.includes(precioProductoAEliminar));
        if (indiceProductoAEliminar !== -1) {
            carritoCompras.splice(indiceProductoAEliminar, 1);
            localStorage.setItem('carrito', JSON.stringify(carritoCompras));
            productoAEliminar.remove();
            cantidadProductos--;
            contadorCarrito.textContent = cantidadProductos;
            // Calcular el precio total del carrito a partir de los productos restantes
            let totalCarritoActual = totalCarrito;
            carritoCompras.forEach(producto => {
                const precioProducto = producto.split(' - ')[1];
                const precioNumerico = parseFloat(precioProducto);
                if (!isNaN(precioNumerico)) {
                    totalCarritoActual += precioNumerico;
                }
            });
            totalCarrito = totalCarritoActual;
            const divTotalCarrito = document.querySelector("#totalCarrito");
            divTotalCarrito.innerHTML = `Total: ${totalCarrito.toFixed(2)}`;
        }
    }
});






