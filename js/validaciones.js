export function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input);
    }
}

const validadores = {
    nacimiento: (input) => validarNacimiento(input),
};

inputNacimiento.addEventListener("blur", (evento) => {
    validarNacimiento(evento.target);
})

function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    let mensaje = "";

    if(!mayorDeEdad(fechaCliente)) {
        mensaje = "Debes tener al menos 18 años para completar el registro."
    }

    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(fecha.getUTCFullYear() + 18, fecha.getUTCMonth(), fecha.getUTCDate());

    return diferenciaFechas <= fechaActual;
}