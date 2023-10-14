// Paneles y botones principales.
const generadorButton = document.getElementById('generador');
const calculadoraButton = document.getElementById('calculadora');
const container = document.getElementById('container');
const resultadosDiv = document.getElementById('resultados');
const historialTable = document.getElementById('historialTable');
const tbody = historialTable.querySelector('tbody');
const guardarBoton = document.getElementById('guardarHistorial');
const mostrarHistorialBtn = document.getElementById("mostrarHistorial");
const historialContainer = document.querySelector(".table-container");
const generarBoton = document.getElementById('generarBoton');
const volverButton = document.getElementById('volver');

// Eventos para trasladar paneles.
generadorButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

calculadoraButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});

// Función para calcular e interpretar el IMC.
function calcularIMC(peso, altura) {
    let imc = peso / (altura * altura);
    return imc;
}

function interpretarIMC(imc) {
    if (imc < 18) {
        return "Bajo peso (insuficiencia ponderal)";
    } else if (imc < 25) {
        return "Peso saludable";
    } else if (imc < 30) {
        return "Sobrepeso leve";
    } else if (imc < 35) {
        return "Sobrepeso moderado";
    } else if (imc < 40) {
        return "Obesidad";
    } else {
        return "Obesidad grave";
    }
}

// Función para calcular e interpretar la TMB.
function calcularTMB(sexo, peso, altura, edad, nivelActividad) {
    let tmb;
    if (sexo === 'masculino') {
        tmb = 88.362 + (13.397 * peso) + (4.799 * altura * 100) - (5.677 * edad);
    } else if (sexo === 'femenino') {
        tmb = 447.593 + (9.247 * peso) + (3.098 * altura * 100) - (4.330 * edad);
    } else {
        throw new Error("Sexo no válido");
    }

    if (nivelActividad === 'ligero') {
        tmb *= 1.375;
    } else if (nivelActividad === 'moderado') {
        tmb *= 1.55;
    } else if (nivelActividad === 'intenso') {
        tmb *= 1.725;
    }

    return tmb;
}

function interpretarTMB(tmb) {
    let tmbEntero = Math.round(tmb);
    let mensaje = "Tu TMB es: " + tmbEntero + " kcal por día.\n";
    return mensaje;
}

// Función principal de la aplicación web.
function calcularIMCyTMB() {
	event.preventDefault();
    // Obtener los valores ingresados por el usuario desde los campos del formulario.
    let peso = parseFloat(document.getElementById("peso").value);
    let altura = parseFloat(document.getElementById("estatura").value);
    let sexo = document.querySelector('input[name="sexo"]:checked').value;
    let edad = parseInt(document.getElementById("edad").value);
    let nivelActividad = document.querySelector('input[name="actividad"]:checked').value;

    // Llamar a las funciones para calcular IMC y TMB.
    let imc = calcularIMC(peso, altura);
    let interpretacionIMC = interpretarIMC(imc);
    let tmb = calcularTMB(sexo, peso, altura, edad, nivelActividad);
    let interpretacionTMB = interpretarTMB(tmb);

    // Mostrar los resultados en el div de resultados.
    resultadosDiv.innerHTML = `<p>Tu IMC es: ${imc.toFixed(2)} ${interpretacionIMC}</p>`;
    resultadosDiv.innerHTML += `<p>${interpretacionTMB}</p>`;
}

// Función para generar datos aleatorios.
function generarNumeroAleatorio(min, max) {
    return Math.random() * (max - min) + min;
}

function generarDatosAleatorios() {
    const pesoAleatorio = generarNumeroAleatorio(30, 200);
    const alturaAleatoria = generarNumeroAleatorio(1.3, 2.3);
    const generoAleatorio = Math.random() < 0.5 ? 'masculino' : 'femenino';
    const edadAleatoria = Math.floor(generarNumeroAleatorio(15, 115));
    const nivelesActividad = ['ligero', 'moderado', 'intenso'];
    const nivelActividadAleatorio = nivelesActividad[Math.floor(generarNumeroAleatorio(0, nivelesActividad.length))];
    return {
        peso: pesoAleatorio,
        altura: alturaAleatoria,
        genero: generoAleatorio,
        edad: edadAleatoria,
        nivelActividad: nivelActividadAleatorio,
    };
}

// Función para mostrar un ejemplo de cómo funciona la calculadora.
function aprenderCalculadora() {
    const ejemploPersona = generarDatosAleatorios();

    const imcEjemplo = calcularIMC(ejemploPersona.peso, ejemploPersona.altura);
    const interpretacionIMCEjemplo = interpretarIMC(imcEjemplo);
    const tmbEjemplo = calcularTMB(ejemploPersona.genero, ejemploPersona.peso, ejemploPersona.altura, ejemploPersona.edad, ejemploPersona.nivelActividad);
    const interpretacionTMBEjemplo = interpretarTMB(tmbEjemplo);

    // Actualizar los textos con los datos generados y mostrar los resultados.
    const pesoLabel = document.getElementById('pesoej');
    const alturaLabel = document.getElementById('estaturaej');
    const edadLabel = document.getElementById('edadej');
    const nivelActividadLabel = document.getElementById('actividadej');
    const generoLabel = document.getElementById('sexoej');

    pesoLabel.textContent = `Peso: ${ejemploPersona.peso.toFixed(2)} kg`;
    alturaLabel.textContent = `Estatura: ${ejemploPersona.altura.toFixed(2)} mts`;
    edadLabel.textContent = `Edad: ${ejemploPersona.edad} años`;
    nivelActividadLabel.textContent = `Nivel de actividad física: ${ejemploPersona.nivelActividad}`;
    generoLabel.textContent = `Sexo: ${ejemploPersona.genero}`;

    const resultadosEjDiv = document.getElementById('resultadosej');
    resultadosEjDiv.innerHTML = `
        <p>Resultados:</p>
        <p>IMC: ${imcEjemplo.toFixed(2)} ${interpretacionIMCEjemplo}</p>
        <p>TMB: ${Math.round(tmbEjemplo)} kcal por día</p>
    `;
}

// Evento para el botón "Generar".
generarBoton.addEventListener('click', function () {
	event.preventDefault();
    aprenderCalculadora();
});

// Evento para mostrar el historial.
mostrarHistorialBtn.addEventListener("click", function () {
	event.preventDefault();
    historialContainer.classList.toggle("active");
});

// Evento para el botón "Guardar".
guardarBoton.addEventListener('click', () => {
	event.preventDefault();
	
    // Obtener los datos y resultados del usuario.
    const peso = parseFloat(document.getElementById("peso").value);
    const altura = parseFloat(document.getElementById("estatura").value);
    const sexo = document.querySelector('input[name="sexo"]:checked').value;
    const edad = parseInt(document.getElementById("edad").value);
    const nivelActividad = document.querySelector('input[name="actividad"]:checked').value;
    const imc = calcularIMC(peso, altura);
    const interpretacionIMC = interpretarIMC(imc);
    const tmb = calcularTMB(sexo, peso, altura, edad, nivelActividad);
    const interpretacionTMB = interpretarTMB(tmb);

    // Crear un objeto JSON con los datos del usuario.
    const usuarioDatos = {
        peso: peso,
        altura: altura,
        sexo: sexo,
        edad: edad,
        nivelActividad: nivelActividad,
        imc: imc,
        interpretacionIMC: interpretarIMC(imc),
        tmb: tmb,
        interpretacionTMB: interpretarTMB(tmb)
    };

    // Convertir el objeto JSON a una cadena JSON.
    const datosJSON = JSON.stringify(usuarioDatos);

    // Guardar la cadena JSON en el almacenamiento local con un identificador único.
    const historial = JSON.parse(localStorage.getItem('historial')) || [];
    historial.push(usuarioDatos);
    localStorage.setItem('historial', JSON.stringify(historial));

    // Actualizar la tabla del historial con los datos guardados.
    actualizarTablaHistorial();
});

// Evento para borrar una fila del historial (por implementar).

// Evento para vaciar todo el historial.
const vaciarHistorialBoton = document.getElementById('vaciarHistorial');
vaciarHistorialBoton.addEventListener('click', () => {
    localStorage.removeItem('historial');
    actualizarTablaHistorial();
});

// Función para llenar la tabla con los datos del historial.
function actualizarTablaHistorial() {
    const historial = JSON.parse(localStorage.getItem('historial')) || [];

    // Limpiar la tabla antes de volver a llenarla.
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }

    // Llenar la tabla con los datos del historial.
    historial.forEach((usuarioDatos, index) => {
        const newRow = tbody.insertRow();
        newRow.insertCell().textContent = new Date().toLocaleDateString();
        newRow.insertCell().textContent = usuarioDatos.peso;
        newRow.insertCell().textContent = usuarioDatos.altura;
        newRow.insertCell().textContent = usuarioDatos.sexo;
        newRow.insertCell().textContent = usuarioDatos.edad;
        newRow.insertCell().textContent = usuarioDatos.nivelActividad;
        newRow.insertCell().textContent = usuarioDatos.imc.toFixed(2);
        newRow.insertCell().textContent = usuarioDatos.tmb.toFixed(2);
    });
}

// Evento para el botón "Volver" del historial.
volverButton.addEventListener('click', () => {
    historialContainer.classList.remove('active');
});

// Llamar a la función para cargar el historial cuando la página se cargue.
window.addEventListener('DOMContentLoaded', () => {
    actualizarTablaHistorial();
});
