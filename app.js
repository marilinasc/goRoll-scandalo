// Funciones
function nombreCliente () {
    alert (nombre + ", te mostraremos diferentes modelos de Rollers")
}

function importeCuotas () {
    switch (producto) {
        case "1":
            return (fusion/3)
        case "2":
            return (street/3)
        case "3":
            return (streetDark/3)
    }
}

function descuento () {
    switch (producto) {
        case "1":
            return (fusion - (fusion*0.15))
        case "2":
            return (street - (street*0.15))
        case "3":
            return (streetDark - (streetDark*0.15))
    }
}
// Variables
let nombre = prompt ("Bienvenido/a a Go Roll, la tienda online de Rollers. Ingrese su nombre:")
let fusion = 32000
let street = 28000
let streetDark = 35000

// Main
nombreCliente ()
let producto = prompt ("¿Que producto desea comprar? Indique una opcion: \n1: FUSION \n2: STREET \n3: STREET DARK")
switch (producto) {
    case "1":
        alert ("Seleccionaste el modelo FUSION, el precio es $" +fusion)
        break;
    case "2":
        alert ("Seleccionaste el modelo STREET, el precio es $" +street)
        break;
    case "3":
        alert ("Seleccionaste el modelo STREET DARK, el precio es $"+streetDark)
        break;
    default:
        alert ("No ingreso una opcion correcta")
        break
}

let formaPago = prompt ("Seleccione la forma de pago: \n1: Tarjeta de credito (3 cuotas) \n2: Efectivo")
if (formaPago == "1") {
    for (let i=1; i <= 3; i++) {
        alert (`El importe de la cuota ${i} es $` +importeCuotas())
    }
} else if(formaPago == "2") {
        alert ("Tienes un descuento del 15% por pago en Efectivo, el precio final es $" +descuento ())
} else {
        alert ("No ingreso una opcion correcta")
}

alert ("¡Gracias por su compra!")
