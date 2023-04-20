

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
            alertaInicio.innerHTML ='Ingrese el apellido y la tarjeta' 
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

