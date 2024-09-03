// Obtener referencias a cada elemento por su ID y almacenarlos en variables
var i_nombre = document.getElementById('i_nombre');
var i_fechanac = document.getElementById('i_fechanac');
var i_correo = document.getElementById('i_correo');
var i_telefono = document.getElementById('i_telefono');
var i_direccion = document.getElementById('i_direccion');
var i_departamento = document.getElementById('i_departamento');
var i_cbox = document.getElementById('i_cbox');
var i_nombreC = document.getElementById('i_nombrec');
var i_fechanacC = document.getElementById('i_fechanacc');
var i_correoC = document.getElementById('i_correoc');
var i_telefonoC = document.getElementById('i_telefonoc');
var i_direccionC = document.getElementById('i_direccionc');
var i_departamentoC = document.getElementById('i_departamentoc');
var i_fechacasamientoC = document.getElementById('i_fechacasamientoc');
var div_conyuge = document.getElementById('div_conyuge');
var form = document.getElementById('form')
var i_submit = document.getElementById('i_submit')


// VALIDAR TODOS LOS INPUT

function validarFormulario() {
    form;
    var camposRequeridos = form.querySelectorAll('[required]');
    var todosValidos = true;

    camposRequeridos.forEach(function (campo) {
        if (!campo.checkValidity()) {
            todosValidos = false;
        }
    });

    if (todosValidos) {
        console.log('Todos los campos requeridos son válidos.');
        i_submit.removeAttribute('disabled')
        // Aquí puedes realizar alguna acción si todos los campos requeridos son válidos
    }
}

// FUNCION DE ENVIO DE DATOS
form.addEventListener('submit', (event) => {
    event.preventDefault();

    window.comunicacion.registroValido([
        i_nombre.value,
        i_fechanac.value,
        i_correo.value,
        i_telefono.value,
        i_direccion.value,
        i_departamento.value,
        i_cbox.checked,
        i_nombreC.value,
        i_fechanacC.value,
        i_correoC.value,
        i_telefonoC.value,
        i_direccionC.value,
        i_departamentoC.value,
        i_fechacasamientoC.value
    ])
})

document.addEventListener('change', (event) => {
    validarFormulario();
})

// Funcion para mostrar u oculatar el formulario del conyugue
i_cbox.addEventListener('change', (event) => {
    if (i_cbox.checked) {
        i_submit.setAttribute('disabled', 'true')
        div_conyuge.style.display = "block";
        //Configurar campos como obligatorios
        i_nombreC.required = true;
        i_fechanacC.srequired = true;
        i_correoC.required = true;
        i_telefonoC.required = true;
        i_direccionC.required = true;
        i_departamentoC.required = true;
        i_fechacasamientoC.required = true;
    } else {
        validarFormulario();
        div_conyuge.style.display = "none";
        // quitar atributo obligatorio
        i_nombreC.required = false;
        i_fechanacC.required = false;
        i_correoC.required = false;
        i_telefonoC.required = false;
        i_direccionC.required = false;
        i_departamentoC.required = false;
        i_fechacasamientoC.required = false;
    }
})

// Funcion para poner en rojo los campos invalidos
function formatInvalid(tag) {
    tag.setAttribute('class', 'inputInvalid')
}

//Funcion para poner en verde los campos validos
function formatValid(tag) {
    tag.setAttribute('class', 'inputValid');
}

// Funcion para devolver la primera letra de una oracion en mayusculas
function nombreFormato(cadena) {
    // Dividir la cadena en palabras
    var palabras = cadena.split(/\s+/);

    // Iterar sobre cada palabra y formatearla
    for (var i = 0; i < palabras.length; i++) {
        palabras[i] = palabras[i].charAt(0).toUpperCase() + palabras[i].slice(1).toLowerCase();
    }

    // Unir las palabras formateadas en una cadena
    var cadenaFormateada = palabras.join(' ');

    return cadenaFormateada;
}




/* ********************* VALIDACIONES *****************/

// Validacino de nombre
var regexNombre = /^([a-zA-Z]+(?:\s+[a-zA-Z]+)*){3,}$/;
var regexNo = /^[a-zA-Z\s]+$/;

i_nombre.addEventListener("change", (event) => {
    if (regexNombre.test(i_nombre.value)) { // si cumple con los parametros dar formato
        i_nombre.value = nombreFormato(i_nombre.value);
        formatValid(i_nombre);
    } else if (!regexNo.test(i_nombre.value)) { // si la cadena posee algún número
        i_nombre.value = "";
        i_nombre.setAttribute("placeholder", 'No ingrese datos alfanumericos')
        formatInvalid(i_nombre);
    } else {
        i_nombre.value = "";
        i_nombre.setAttribute("placeholder", 'Ingrese un nombre valido')
        formatInvalid(i_nombre);
    }
})

// Validacion de fecha
i_fechanac.max = new Date().toISOString().split("T")[0];



//Validacion de correo
var regexEmail = /^[a-zA-Z0-9._%+-]+\@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
i_correo.addEventListener('change', (event) => {
    if (!regexEmail.test(i_correo.value)) {
        i_correo.value = "";
        i_correo.setAttribute('placeholder', 'Ingrese un correo valido');
        formatInvalid(i_correo);
    } else {
        formatValid(i_correo);
    }
})

//Validacion de numero
let telefono = "";
i_telefono.addEventListener('input', (event) => {

    if (i_telefono.value.length < 8) {
        formatInvalid(i_telefono)
    } else if (i_telefono.value.length < 11) {
        telefono = i_telefono.value;
        formatValid(i_telefono);
    } else {
        i_telefono.value = telefono;
    }
    i_telefono.value = i_telefono.value.replace(/\D/g, '');
})

i_telefono.addEventListener('change', (event) => {
    if (i_telefono.value.length < 8) {
        i_telefono.value = "";
        i_telefono.setAttribute('placeholder', 'Numero telefonico corto');
        formatInvalid(i_telefono)
    }
})

// Validacion de direccion
var regexDireccion = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
i_direccion.addEventListener('change', (event) => {
    if (regexDireccion.test(i_direccion.value)) {
        // bloque para envio de datos correcto
        formatValid(i_direccion);
    } else {
        i_direccion.value = "";
        i_direccion.setAttribute('placeholder', 'Ingrese una direccion valida');
        formatInvalid(i_direccion);
    }
})

i_departamento.addEventListener('change', (event) => {
    if (i_departamento.value.length > 1) {
        formatValid(i_departamento)
    }
})

/******************* VALIDACIONES DEL CONYUGUE ************************/

i_nombreC.addEventListener("change", (event) => {
    if (regexNombre.test(i_nombreC.value)) { // si cumple con los parametros dar formato
        i_nombreC.value = nombreFormato(i_nombreC.value);
        formatValid(i_nombreC);
    } else if (!regexNo.test(i_nombreC.value)) { // si la cadena posee algún número
        i_nombreC.value = "";
        i_nombreC.setAttribute("placeholder", 'No ingrese datos alfanumericos')
        formatInvalid(i_nombre);
    } else {
        i_nombreC.value = "";
        i_nombreC.setAttribute("placeholder", 'Ingrese un nombre valido')
        formatInvalid(i_nombre);
    }
})

// Validacion de fecha
i_fechanacC.max = new Date().toISOString().split("T")[0];
if (i_fechanacC.value != "") {
    formatValid(i_fechanac);
}


//Validacion de correo
i_correoC.addEventListener('change', (event) => {
    if (!regexEmail.test(i_correoC.value)) {
        i_correoC.value = "";
        i_correoC.setAttribute('placeholder', 'Ingrese un correo valido');
        formatInvalid(i_correoC);
    } else {
        // De ser correcto el correo hacer este bloque
        formatValid(i_correoC);
    }
})

//Validacion de numero
let telefonoC = "";
i_telefonoC.addEventListener('input', (event) => {

    if (i_telefonoC.value.length < 8) {
        formatInvalid(i_telefonoC)
    } else if (i_telefonoC.value.length < 11) {
        telefonoC = i_telefonoC.value;
        formatValid(i_telefonoC);
    } else {
        i_telefonoC.value = telefono;
    }
    i_telefonoC.value = i_telefonoC.value.replace(/\D/g, '');
})

i_telefonoC.addEventListener('change', (event) => {
    if (i_telefonoC.value.length < 8) {
        i_telefonoC.value = "";
        i_telefonoC.setAttribute('placeholder', 'Numero telefonico corto');
        formatInvalid(i_telefonoC)
    }
})

// Validacion de direccion
i_direccionC.addEventListener('change', (event) => {
    if (regexDireccion.test(i_direccionC.value)) {
        // bloque para envio de datos correcto
        formatValid(i_direccionC);
    } else {
        i_direccionC.value = "";
        i_direccionC.setAttribute('placeholder', 'Ingrese una direccion valida');
        formatInvalid(i_direccionC);
    }
})

// Validacion de fecha de casamiento
i_fechacasamientoC.max = new Date().toISOString().split("T")[0];
if (i_fechacasamientoC.value != "") {
    formatValid(i_telefonoC);
}


