export function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input);
    }

    if (input.validity.valid) {
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    } else {
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input);
    }
}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
]

const mensajesDeError = {
    nombre: {
        valueMissing: "Este espacio no puede estar vacío."
    },
    email: {
        valueMissing: "Este espacio no puede estar vacío.",
        typeMismatch: "El correo no es válido.",
    },
    password: {
        valueMissing: "Este espacio no puede estar vacío.",
        patternMismatch: "Debe incluir al menos 6 caracteres, máximo 12. Debe contener una letra minúscula, una mayuscúla, un número y no debe tener caracteres especiales.",
    },
    nacimiento: {
        valueMissing: "Este espacio no puede estar vacío.",
        customError: "Debes tener al menos 18 años para completar el registro.",
    }
};

const validadores = {
    nacimiento: (input) => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoDeInput, input) {
    let mensaje = ""
    tipoDeErrores.forEach( error => {
        if (input.validity[error]) {
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    })
    return mensaje
}

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