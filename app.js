let productos = []

const carrito = JSON.parse(localStorage.getItem ("productosCarrito")) || []

// Calcular cantidad de productos en el carrito
function cantidadProductosCarrito () {
    let totalProductos = 0
    carrito.forEach((producto)=>(totalProductos+= (producto.cantidad)))
    return totalProductos
}


// Calcular del importe total de la compra
function totalCarrito () {
    let total = 0
    carrito.forEach((producto)=>(total+= (producto.precio*producto.cantidad)))
    return total
}

// Listar los productos del carrito 
function productosCarrito (indice) {
    let listaCarrito = document.querySelector ("#items")
    listaCarrito.innerHTML = ""
    carrito.forEach ((producto,indice) => {
            let listado = document.createElement ("tr")
            listado.className = "item"
            listado.innerHTML =
            `<th> ${producto.nombre} </th>
            <th> ${producto.cantidad} </th>
            <th> $ ${producto.precio} </th>
            <th> $ ${producto.precio * producto.cantidad} </th>
            <button type="button" class="btn btn-outline-danger" onClick= "eliminarProducto (${indice})"> Eliminar </button>
            `
            listaCarrito.appendChild (listado) 
    })
    document.querySelector ("#importeTotal").innerHTML = "Total de la compra: $" +totalCarrito ()
    document.querySelector ("#procederCompra").innerHTML = `<button type="button" class="btn btn-danger btn-sm"> Iniciar compra </button>`
}
productosCarrito ()

// Mostrar informacion de LocalStorage
document.querySelector ("#cantidadProductos").innerHTML = +cantidadProductosCarrito ()

// Listar los productos en la pagina principal
const listarProductos = async () => {
    const respuesta = await fetch ("data.json")
    const data = await respuesta.json()
    let listaProductos = document.querySelector (".card-group")
    data.forEach ((producto,indice) => {
        let nombreProducto = document.createElement ("div")
        nombreProducto.innerHTML = `
            <div class="col">
                <div class="card">
                <img src="${producto.imagen}" class="card-img-top">
                <div class="card-body">
                    <div class="accordion">
                        <div class="accordion-item">
                            <h2 class="accordion-header">
                                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne"> ${producto.nombre}</button>
                            </h2>
                            <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                <div class="accordion-body">
                                    <strong></strong> 
                                    Precio: $${producto.precio}
                                    <br>
                                    Talles: ${producto.talle}
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="button" class="btn btn-danger btn-sm" onClick= "agregarProducto (${indice})"> Agregar al carrito </button>
                </div>
            </div>           
    `
        listaProductos.appendChild (nombreProducto)
    })
    productos.push (...data)
}
listarProductos ()

// Guardar carrito en Local Storage
function guardarCarrito (indice) {
    const productosGuardados = JSON.stringify (carrito)
    localStorage.setItem ("productosCarrito", productosGuardados)
} 

// Listar las formas de pago y calcular cuotas en caso de tarjeta o descuento en caso de efectivo
function metodoPago () {
    document.querySelector ("#metodoPago").innerHTML= `
        <select id="metodoSeleccionado" class="form-select">
            <option value="" selected> Seleccione una forma de pago </option>
            <option value="1"> Tarjeta de credito </option>
            <option value="2"> Efectivo </option>
        </select>
    `
    let metodoSeleccionado = document.querySelector("#metodoSeleccionado")
    metodoSeleccionado.addEventListener("change", (e)=> {
    if (e.target.value === "1") {
        document.querySelector ("#importeCuotas").innerHTML= ""
        document.querySelector ("#cuotas").innerHTML= `
        <input id="cantidadCuotas" class="form-control" type="text" placeholder="Ingrese la cantidad de cuotas" aria-label="default input example">`
        const formName = document.querySelector("#cantidadCuotas")
        formName.addEventListener ("input", (e)=> {
            e.target.value > 0 && e.target.value <= 12? (
            document.querySelector ("#importeCuotas").innerHTML= "El importe de cada cuota es: $" + Math.round(((totalCarrito ())/(e.target.value))),
            document.querySelector ("#datosTarjeta").innerHTML= `
            <h5> Ingrese los datos de la tarjeta de credito: </h5>
            <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="inputGroup-sizing-sm">Numero</span>
                <input id="numero" type="number" required class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
            </div>
            <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="inputGroup-sizing-sm">Fecha vencimiento</span>
                <input id="vencimiento" type="date" required class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
            </div>
            <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="inputGroup-sizing-sm">Codigo de seguridad</span>
                <input id="codigo" type="text" required class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
            </div>
            `
            ) : (
                document.querySelector ("#importeCuotas").innerHTML= `<h5 class = "text-danger"> Error: Ingrese un numero entre 1 y 12 </h5>`
            )
        })
    } else if (e.target.value === "2") {
        document.querySelector ("#datosTarjeta").innerHTML= ""
        document.querySelector ("#cuotas").innerHTML= ""
        document.querySelector ("#importeCuotas").innerHTML= "Tienes un 15% OFF! El precio final es: $" + Math.round(totalCarrito()-(totalCarrito()*0.15))
    }
})
}
// Sweet Alert: agregar producto al carrito
function alertProductoAgregado () {
    Swal.fire({
        position: 'top-end',
        title: 'Producto agregado al carrito!',
        icon: 'success',
        width: '30%',
    })
}
// Sweet Alert: carrito vacio
function alertCarritoVacio () {
    Swal.fire({
        position: 'top-center',
        title: 'El carrito esta vacio!',
        icon: 'error',
        width: '30%',
    })
}

// Solicitar los datos del cliente
function datosCliente () {
    let mostrarDatosCliente = document.querySelector ("#datosCliente")
    mostrarDatosCliente.style.visibility = "visible"
    recuperarDatos ()
    metodoPago ()
}


// Agregar productos al carrito
function agregarProducto (indice){
    const mostrarDatosCliente = document.querySelector ("#datosCliente")
    mostrarDatosCliente.style.visibility = "hidden"
    // A traves del ID que tiene el indice, verifica si el producto que estoy agregando ya existe en el carrito
    const productoEncontrado = carrito.findIndex ((productoCarrito)=> {
        return productoCarrito.id === productos[indice].id
    })
    if (productoEncontrado === -1) {
        const productoAgregar = productos[indice]
        // Se crea una nueva propiedad al objeto
        productoAgregar.cantidad = 1
        carrito.push (productoAgregar)
        document.querySelector ("#cantidadProductos").innerHTML = +cantidadProductosCarrito ()
        productosCarrito ()
        totalCarrito ()
        guardarCarrito ()
        alertProductoAgregado ()
    } else {
        carrito [productoEncontrado].cantidad +=1
        document.querySelector ("#cantidadProductos").innerHTML = +cantidadProductosCarrito ()
        productosCarrito ()
        totalCarrito ()
        guardarCarrito ()
        alertProductoAgregado ()
    }
}

// Eliminar productos del carrito
function eliminarProducto (indice) {
    const mostrarDatosCliente = document.querySelector ("#datosCliente")
    mostrarDatosCliente.style.visibility = "hidden"
    carrito.splice (indice,1)
    document.querySelector ("#cantidadProductos").innerHTML = +cantidadProductosCarrito ()
    productosCarrito ()
    totalCarrito ()
    guardarCarrito ()
}


// Validar si el carrito esta vacio antes de iniciar compra
function validarCarrito () {
    carrito.length===0? alertCarritoVacio () : datosCliente()
}

// Boton "Iniciar compra"
document.getElementById ("procederCompra").onclick = function() {validarCarrito ()}



// Recuperar datos del cliente
const nombre = document.querySelector("#nombre")
nombre.addEventListener ("input", (e)=> {
    e.preventDefault ()
    localStorage.setItem ("nombre", nombre.value)
})
const apellido = document.querySelector("#apellido")
apellido.addEventListener ("input", (e)=> {
    e.preventDefault ()
    localStorage.setItem ("apellido", apellido.value)
})

const direccion = document.querySelector("#direccion")
direccion.addEventListener ("input", (e)=> {
    e.preventDefault ()
    localStorage.setItem ("direccion", direccion.value)
})

const codigoPostal = document.querySelector("#codigoPostal")
codigoPostal.addEventListener ("input", (e)=> {
    e.preventDefault ()
    localStorage.setItem ("codigoPostal", codigoPostal.value)
})

function recuperarDatos () {
    nombre.value = localStorage.getItem ("nombre")
    apellido.value = localStorage.getItem ("apellido")
    direccion.value = localStorage.getItem ("direccion")
    codigoPostal.value = localStorage.getItem ("codigoPostal")
}


// Sweet Alert: validacion de datos del formulario
function datosCompletos () {
    Swal.fire({
        position: 'top-center',
        title: `Gracias por su compra ${nombre.value}!`,
        icon: 'success',
        width: '30%',
    })
}

function datosIncompletos () {
    Swal.fire({
        position: 'top-center',
        title: `Faltan completar datos del formulario`,
        icon: 'error',
        width: '30%',
    })
}

// Boton "Confirmar compra"
const confirmarCompra = document.querySelector("#confirmarCompra")
confirmarCompra.addEventListener ("click", (e)=> {
    if (nombre.value ==="" || apellido.value ==="" || direccion.value ==="" || codigoPostal.value ==="" ||metodoSeleccionado.value === "")  {
        datosIncompletos () 
    } else if (metodoSeleccionado.value === "1" && (cantidadCuotas.value === "" || numero.value === "" || vencimiento.value === "" || codigo.value === "")) {
        datosIncompletos () }
    else {
     datosCompletos ()
    }
})