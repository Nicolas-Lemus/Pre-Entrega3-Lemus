
let ingreso = false;
let carrito = [];

 //FUNCION DE PROCESAR COMPRA
function procesarCompra(productoSeleccionado){
    saldo=40000;
    if(saldo < productoSeleccionado.precio){
        alert("Saldo no disponible. Saldo actual: $" + saldo);
    }else{
        saldo -= productoSeleccionado.precio;
        alert("Gracias por su compra!. Su saldo es de $" + saldo);
        let index = carrito.indexOf(productoSeleccionado);
        carrito.splice(index, 1);
    }
}
//Funcion cancelar compras.
function cancelarCompra(){
    if(saldo != 40000){
        alert("Se han cancelado todas sus compras.");
        carrito=0;
        saldo = 40000;
        alert("Saldo actual $ " + saldo);
    }else{
        alert("Usted aun no tiene compras realizadas");
    }
}
//funcion salida
function salida(){
    let ingreso = true;
    while (ingreso) {
        let opcion = prompt("¿Desea salir de la tienda?\n1. Si\n2. No");
        switch(opcion){
            case "1":
                alert("¡Gracias! ¡Vuelva pronto!");
                ingreso = false;
                break;
            case "2":
                ingresoExitoso();
                break;
            default:
                alert("Opcion invalida. Por favor, elija nuevamente.");
                break;
        }
    }
}
//Carrito de compras5
function agregarAlCarrito(productos) {
    if (productos.length === 0) {
        alert("No se encontraron productos en la busqueda.");
    } else {
        let mensaje = "Seleccione un producto para agregar al carrito: \n";
        for (let i = 0; i < productos.length; i++) {
            mensaje += `${i + 1}. ${productos[i].nombre} - $${productos[i].precio}\n`;
        }
        let seleccion = parseInt(prompt(mensaje));
        if (seleccion > 0 && seleccion <= productos.length) {
            let productoSeleccionado = productos[seleccion - 1];
            carrito.push(productoSeleccionado);
            alert(`${productoSeleccionado.nombre} ha sido agregado al carrito.`);
            mostrarCarritoCompras();
        } else {
            alert("Seleccion invalida.");
        }
    }
}
//Funcion agregar producto del carrito
function mostrarCarritoCompras() {
    let mensaje = "Productos en el carrito:\n";
    for (let i = 0; i < carrito.length; i++) {
        mensaje += `${i + 1}. ${carrito[i].nombre} - $${carrito[i].precio}\n`;
    }
    alert(mensaje);
}
//funcion confirmar compra
function confirmarCompras() {
    let afirmacion = prompt("Opciones: \n1. Comprar \n2. Seguir navegando");
    switch (afirmacion) {
        case "1":
            if (carrito.length > 0) {
                mostrarCarritoCompras();

                let seleccion = parseInt(prompt("Ingrese el numero del producto que desea comprar:"));
                
                if (seleccion > 0 && seleccion <= carrito.length) {
                    let productoSeleccionado = carrito[seleccion - 1];
                    procesarCompra(productoSeleccionado);
                    mostrarCarritoCompras();
                } else {
                    alert("Seleccion invalida.");
                }
            } else {
                alert("El carrito de compras vacio.");
            }
            break;
        case "2":
            ingresoExitoso();
            break;
        default:
            alert("Opcion invalida.");1
            break;
    }
}
//funcion agregar producto mediante this


/// INICIO DE SECCION 
const formInicio = document.querySelector('#formularioInicio'),
    apellidoInput = document.querySelector('#apellido'),
    tarjetaInput = document.querySelector('#tarjeta'),
    alertaInicio = document.querySelector('#alertaInicio'),
    enviar = document.querySelector("#botonregistrar");

formInicio.addEventListener('submit',function(e){
    e.preventDefault();
    const apellido = apellidoInput.value;
    const tarjeta = tarjetaInput.value;
        if (!apellido || !tarjeta) {
            alertaInicio.innerHTML = 'Ingrese el apellido y la tarjeta';
            return;
        }
    const usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuarioExistente = usuariosRegistrados.find(usuario => usuario.apellido === apellido && usuario.tarjeta === tarjeta);
    if (!usuarioExistente) {
        alertaInicio.innerHTML = 'Usuario no registrado';
        return;
    }else{
        window.location.href = "pages/compras.html";
    }
});
