// Funciones
function nombreCliente () {
    alert (nombre + ", te mostraremos diferentes modelos de Rollers")
}

function irAlCarrito () {
    const importeTotal= carrito.reduce((acumulador, producto)=> acumulador + producto.precio,0)
    alert ("Total de productos pendientes para comprar: " +carrito.length +"\nEl importe total de la compra es: $"+importeTotal)
}

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
        alert ("El precio de cada cuota del modelo " +this.nombre +" es $" + Math.round((this.precio /3)))
    }
}

//Arrays
const tallesFusion =[36,37,38,39,40,41]
const tallesStreet =[38,40,42]
const tallesStreetDark =[38,39,40,41,42]
const carrito = []

// Main
let nombre = prompt ("Bienvenido/a a Go Roll, la tienda online de Rollers. Ingrese su nombre:")
nombreCliente ()
entrada = prompt ("¿Que producto desea comprar? Indique una opcion: \n1: FUSION \n2: STREET \n3: STREET DARK \n4: Ir al carrito")
while (entrada !=4) {
    switch (entrada){
        case "1":
            talle = Number (prompt ("Ingrese el talle"))
            if ((tallesFusion.indexOf (talle)) !== -1) {
                carrito.push (new Producto ("FUSION",32000))
                alert ("Producto añadido al carrito")
            } else {
                alert (`No tenemos el modelo FUSION con el talle ${talle}`)
            }       
            break;
        case "2":
            talle = Number (prompt ("Ingrese el talle"))
            if ((tallesStreet.indexOf (talle)) !== -1) {
                carrito.push (new Producto ("STREET",28000))
                alert ("Producto añadido al carrito")
            } else {
                alert (`No tenemos el modelo STREET con el talle ${talle}`)
            }       
            break;
        case "3":
            talle = Number (prompt ("Ingrese el talle"))
            if ((tallesStreetDark.indexOf (talle)) !== -1) {
                carrito.push (new Producto ("STREET DARK",35000))
                alert ("Producto añadido al carrito")
            } else {
                alert (`No tenemos el modelo STREET DARK con el talle ${talle}`)
            }       
            break;
    }
    entrada = prompt ("¿Desea comprar otro producto? Indique una opcion: \n1: FUSION \n2: STREET \n3: STREET DARK \n4: Ir al carrito")    
}

irAlCarrito ()

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
