// Funciones
function nombreCliente () {
    alert (nombre + ", te mostraremos diferentes modelos de Rollers")
}

// Variables
let nombre = prompt ("Bienvenido/a a Go Roll, la tienda online de Rollers. Ingrese su nombre:")
let entrada = 0 

// Objetos
class Producto  {
    constructor (nombre,precio) {
    this.nombre = nombre
    this.precio = precio
    }
    descuento () {
        alert ("Tienes un 15% off, el precio final del modelo " +this.nombre +" es $" +(this.precio -(this.precio*0.15)))
    }
    cuotas (){
        alert ("El precio de cada cuota del modelo " +this.nombre +" es $" +(this.precio /3))
    }
}

//Arrays
const carrito = []

// Main
nombreCliente ()
entrada = prompt ("¿Que producto desea comprar? Indique una opcion: \n1: FUSION \n2: STREET \n3: STREET DARK \n4: Finalizar")

while (entrada !=4) {
    switch (entrada){
        case "1":
            carrito.push (new Producto ("FUSION",32000))
            alert ("Producto añadido al carrito")
            break;
        case "2":
            carrito.push (new Producto ("STREET",28000))
            alert ("Producto añadido al carrito")
            break;
        case "3":
            carrito.push (new Producto ("STREET DARK",35000))
            alert ("Producto añadido al carrito")
            break;
    }
    entrada = prompt ("¿Desea comprar otro producto? Indique una opcion: \n1: FUSION \n2: STREET \n3: STREET DARK \n4: Finalizar")    
}

for (const producto of carrito) {
    alert ("Seleccionaste el modelo " +producto.nombre +", el precio es $" +producto.precio)
}
alert ("Total de productos pendientes para comprar: " +carrito.length)


let formaPago = prompt ("Seleccione la forma de pago: \n1: Tarjeta de credito (3 cuotas) \n2: Efectivo")
if (formaPago == "1") {
    for (const producto of carrito) {
        producto.cuotas ()
    }
} else if(formaPago == "2") {
    for (const producto of carrito) {
        producto.descuento ()
    }
}

alert ("¡Gracias por su compra!")
