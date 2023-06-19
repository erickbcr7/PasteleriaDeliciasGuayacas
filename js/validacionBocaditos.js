//Validacion formBocaditos
var form = document.querySelector("#formBocaditos");
form.addEventListener('submit', validarBocaditos);

function validarBocaditos(event) {
    var resultado = true;
    var selectBocadito = document.getElementById("bocadito");
    var nCantidad = document.getElementById("cantidad");
    var pedidoFecha = document.getElementById("fecha");
    var pedidoHora = document.getElementById("hora");
    var domicilio = document.getElementById("direccion");
    var radiosPago = document.getElementsByName("metodoPago");

    // expresiones regulares (RegEx)
    var letrasNumero = /^[a-zA-Z0-9\s]+$/;

    limpiarMensajes();

    //validacion select bocadito
    if (selectBocadito.value === null || selectBocadito.value === '0') {
        resultado = false;
        mensaje("Debe seleccionar un bocadito", selectBocadito);
    }
    //validacion cantidad
    var numero = parseInt(nCantidad.value);
    if (nCantidad.value === '') {
        resultado = false;
        mensaje("Se requiere una cantidad", nCantidad);
    } else if (isNaN(numero)) { //si Not a Number
        resultado = false;
        mensaje("La cantidad debe ser numerica", nCantidad);
    } else if (numero < 1 || numero > 100) { // si es numero
        resultado = false;
        mensaje("La cantidad debe ser desde 1 hasta 100", nCantidad);
    }

    // validacion de fecha
    var dato = pedidoFecha.value;
    var fechaNueva = new Date(dato);// convertir a fecha
    var fechaActual = new Date()// fecha actual
    if (pedidoFecha.value ===''){
        resultado = false;
        mensaje("Se requiere ingresar una fecha", pedidoFecha);
    } else if (fechaNueva < fechaActual) {
        resultado = false;
        mensaje("La fecha no puede ser anterior a la actual", pedidoFecha);
    } 

    // validacion de hora 
    var hora = parseInt(pedidoHora.value);
    if (pedidoHora.value ===''){
        resultado = false;
        mensaje("Se requiere ingresar una hora", pedidoHora);
    } else if (hora < 9 || hora >= 23) {
        resultado = false;
        mensaje("El horario de atención es desde las 9:00 am hasta las 11:00 pm", pedidoHora);
    } 

    // validacion de domicilio
    if (domicilio.value === '') {
        resultado = false;
        mensaje("El domicilio es requerido", domicilio);

    } else if (!letrasNumero.test(domicilio.value)) { 
        resultado = false;
        mensaje("El domicilio solo debe contener letras y Numeros", domicilio);
    }

    // validacion pago
    let op = false;
    for (let i = 0; i < radiosPago.length; i++) {
        if (radiosPago[i].checked) {
            if (radiosPago[i].value === "paypal") {
            }
            op = true;
            let res = radiosPago[i].value;
            break;
        }
    }
    if (!op) {
        resultado = false;
        mensaje("Debe seleccionar un metodo de pago",radiosPago[3]);
    }

    if (!resultado) {
        event.preventDefault();  // detener el evento
    } else {
        alert("FORMULARIO ENVIADO CORRECTAMENTE");
    }
}

function mensaje(cadenaMensaje, elemento) {
    elemento.focus();
    var nodoPadre = elemento.parentNode;
    var nodoMensaje = document.createElement("span");
    nodoMensaje.textContent = cadenaMensaje;
    nodoMensaje.setAttribute("class", "mensajeError");
    nodoPadre.appendChild(nodoMensaje);
}

function limpiarMensajes() {
    var mensajes = document.querySelectorAll(".mensajeError");
    for (let i = 0; i < mensajes.length; i++) {
        mensajes[i].remove();// remueve o elimina un elemento de mi doc html
    }
}