/*function sumar(){

}

function restar(){

}

function dividir(){

}

function multiplicar(){

}

function resultado(){
    let total = 0;
}

let contador = 0;
document.getElementsByClassName("calcular-boton").addEventListener("click", function() {
    let uno = document.getElementById("#uno").addEventListener("click", function() {
        if(uno == "1"){
            contador += 1;
            pantalla.innerText = contador;
        }
    });
}); */


// Seleccionar la pantalla
const pantalla = document.querySelector('.pantalla');

// Seleccionar todos los botones
const botones = document.querySelectorAll('.calcular-boton, .calcular-boton-igual');

// Variables para almacenar valores
let valorActual = '';
let valorAnterior = '';
let operacion = undefined;

// Función para actualizar la pantalla
function actualizarPantalla() {
    pantalla.innerText = valorActual;
}

// Función para agregar números a la pantalla
function agregarNumero(numero) {
    if (valorActual.includes('.') && numero === '.') return; // Evita múltiples puntos decimales
    valorActual = valorActual.toString() + numero.toString();
    actualizarPantalla();
}

// Función para seleccionar la operación
function seleccionarOperacion(op) {
    if (valorActual === '') return;
    if (valorAnterior !== '') {
        calcular();
    }
    operacion = op;
    valorAnterior = valorActual;
    valorActual = '';
}

// Función para calcular el resultado
function calcular() {
    let calculo;
    const anterior = parseFloat(valorAnterior);
    const actual = parseFloat(valorActual);

    if (isNaN(anterior) || isNaN(actual)) return;

    switch (operacion) {
        case '+':
            calculo = anterior + actual;
            break;
        case '-':
            calculo = anterior - actual;
            break;
        case '*':
            calculo = anterior * actual;
            break;
        case '/':
            calculo = anterior / actual;
            break;
        default:
            return;
    }

    valorActual = calculo.toString(); // Convertir el resultado a cadena
    operacion = undefined;
    valorAnterior = '';
    actualizarPantalla();
}

// Función para borrar todo
function borrarTodo() {
    valorActual = '';
    valorAnterior = '';
    operacion = undefined;
    actualizarPantalla();
}

// Función para borrar el último dígito
function borrar() {
    valorActual = valorActual.toString().slice(0, -1);
    actualizarPantalla();
}

// Asignar eventos a los botones
botones.forEach(boton => {
    boton.addEventListener('click', () => {
        if (boton.id === 'borrar-todo') {
            borrarTodo();
        } else if (boton.id === 'borrar') {
            borrar();
        } else if (boton.id === 'igual') {
            calcular();
        } else if (boton.classList.contains('calcular-boton')) {
            if (boton.id === 'sumar' || boton.id === 'restar' || boton.id === 'multiplicar' || boton.id === 'dividir') {
                seleccionarOperacion(boton.innerText);
            } else {
                agregarNumero(boton.innerText);
            }
        }
    });
});