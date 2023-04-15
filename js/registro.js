//la solucion que encontre fue poner en distintos JS porque los dos en MAIN.JS
// EL REGISTRO NO ME FUNCIONABA ME HACIA REFERENCIA AL MIIMSO "SUBMIT" Y NO SABIA COMO ARREGLARLO 

//Registro

const formRegistro = document.querySelector('#registroNuevo'),
    apellidoNuevoInput = document.querySelector('#apellidoNuevo'),
    tarjetaNuevaInput = document.querySelector('#tarjetaNueva'),
    alertaRegistro = document.querySelector('#alertaRegistro');
        
    formRegistro.addEventListener('submit',function(e){
        e.preventDefault();
        const apellidoNuevo = apellidoNuevoInput.value;
        const tarjetaNueva = tarjetaNuevaInput.value;
            if (!apellidoNuevo || !tarjetaNueva) {
                alertaRegistro.innerHTML = 'Ingrese el apellido y la tarjeta';
                return;
            }
        const usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios')) || [];
        const usuarioExistente = usuariosRegistrados.find(usuario => usuario.apellido === apellidoNuevo && usuario.tarjeta === tarjetaNueva);
            if (usuarioExistente) {
                alertaRegistro.innerHTML = 'El usuario ya existe';
                return;
            }
        const usuarioNuevo = {
            apellido: apellidoNuevo,
            tarjeta: tarjetaNueva
        };
        usuariosRegistrados.push(usuarioNuevo);
        localStorage.setItem('usuarios', JSON.stringify(usuariosRegistrados));
        alertaRegistro.innerHTML = 'Registro exitoso!';
        formRegistro.reset();
});