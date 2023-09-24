alert("El IMC (Índice de Masa Corporal) es una medida que evalúa si tu peso es saludable en relación con tu altura. La TMB (Tasa Metabólica Basal) es la cantidad mínima de calorías que tu cuerpo necesita para realizar funciones vitales en reposo.");

// Función para calcular e interpretar el IMC.
function calcularIMC(peso, altura) {
    let imc = peso / (altura * altura);
    return imc;
}
function interpretarIMC(imc) {
    alert("El IMC es una herramienta inicial para evaluar el peso y la salud general, pero no proporciona una imagen completa de la salud de una persona. Las interpretaciones del IMC pueden variar de persona a persona. Algunas personas pueden tener un IMC en la categoría de sobrepeso u obesidad, pero estar en buena salud debido a una mayor masa muscular o una distribución de grasa favorable. Para una evaluación más precisa, es importante considerar otros factores, como la dieta, el nivel de actividad física, las medidas de la circunferencia de la cintura y la opinión de un profesional de la salud.");

    if (imc < 18) {
        return "Bajo peso (insuficiencia ponderal)";
    } else if (imc < 25) {
        return "Peso saludable";
    } else if (imc < 30) {
        return "Sobrepeso leve";
    } else if (imc < 35) {
        return "sobrepeso moderado";
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
        return "Sexo no válido";
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
    alert("Diversas fórmulas y herramientas están disponibles para calcular la TMB, pero es importante recordar que estas son solo estimaciones y que las necesidades calóricas individuales pueden variar. Calcular tu tasa metabólica basal es importante para determinar tus necesidades calóricas diarias y planificar una alimentación adecuada para tus objetivos, ya sea perder peso, mantenerlo o ganar masa muscular. Si tienes objetivos específicos relacionados con tu peso o tu salud, es aconsejable consultar a un profesional de la salud para obtener orientación personalizada.");
	let tmbEntero = Math.round(tmb);
    let mensaje = "Tu TMB es: " + tmbEntero + " kcal por día.\n";  
    return mensaje;
}

// Funcion principal de la aplicacion web.
function calcularIMCyTMB() {
    
	// Obténer los valores ingresados por el usuario desde los campos del formulario.
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
    let resultadosDiv = document.getElementById("resultados");
    resultadosDiv.innerHTML = `<p>Tu IMC es: ${imc.toFixed(2)} ${interpretacionIMC}</p>`;
    resultadosDiv.innerHTML += `<p>${interpretacionTMB}</p>`;
}