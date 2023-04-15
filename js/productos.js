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

