//Arrays
let productos = [
    {
        id:1,
        nombre: "FUSION",
        precio: 32000,
        imagen: "./assets/pro1.PNG"
    },
    {
        id: 2,
        nombre: "STREET",
        precio: 28000,
        imagen: "./assets/pro2.PNG"
    },
    {
        id: 3,
        nombre: "STREET DARK",
        precio: 35000,
        imagen: "./assets/pro3.PNG"
    },
]
const carrito = []

// Funciones
// Listar los productos en la pagina principal
const listarProductos = () => {
    let listaProductos = document.querySelector (".card-group")
    productos.forEach ((producto,indice) => {
        let nombreProducto = document.createElement ("div")
        nombreProducto.innerHTML = 
        `<div class="card">
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
                        </div>
                    </div>
                </div>
            </div>
            <button type="button" class="btn btn-danger btn-sm" onClick= "agregarProducto (${indice})"> Agregar al carrito </button>
        </div>`
        listaProductos.appendChild (nombreProducto)
    })
}
listarProductos ()

// Calcular del importe total de la compra
function totalCarrito () {
    let total = 0
    carrito.forEach((producto)=>(total+= producto.precio))
    return total
}

// Listar las formas de pago y calcular cuotas en caso de tarjeta o descuento en caso de efecto.
function metodoPago () {
    document.querySelector ("#metodoPago").innerHTML= `
    <select id="metodoSeleccionado" class="form-select" aria-label="Default select example">
    <option selected> Seleccione una forma de pago </option>
    <option value="1"> Tarjeta de credito </option>
    <option value="2"> Efectivo </option>`
    let metodoSeleccionado = document.querySelector("#metodoSeleccionado")
    metodoSeleccionado.addEventListener("change", (e)=> {
    if (e.target.value === "1") {
        document.querySelector ("#cuotas").innerHTML= `
        <input id="cantidadCuotas" class="form-control" type="text" placeholder="Ingrese la cantidad de cuotas" aria-label="default input example">`
        const formName = document.querySelector("#cantidadCuotas")
        formName.addEventListener ("input", (e)=> {
            if (e.target.value > 0 && e.target.value <= 12) {
            document.querySelector ("#importeCuotas").innerHTML= "El importe de cada cuota es: $" + Math.round(((totalCarrito ())/(e.target.value)))
            } else {
                document.querySelector ("#importeCuotas").innerHTML= `<h5 class = "text-danger"> Error: Ingrese un numero entre 1 y 12 </h5>`
            }
        })
    } else if (e.target.value === "2") {
        document.querySelector ("#importeCuotas").innerHTML= "Tienes un 15% OFF! El precio final es: $" + Math.round(totalCarrito()-(totalCarrito()*0.15))
    }
})
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
            <th> ${producto.precio} </th>
            <button type="button" class="btn btn-outline-danger" onClick= "eliminarProducto (${indice})"> Eliminar </button>
            `
            listaCarrito.appendChild (listado) 
    })
    const importeTotal = carrito.reduce ((acumulador,producto)=>acumulador + producto.precio,0)
    document.querySelector ("#importeTotal").innerHTML = "El importe total de la compra es: $" +importeTotal
    document.querySelector ("#procederCompra").innerHTML = `<button type="button" class="btn btn-danger btn-sm"> Proceder a la compra </button>`
}

// Agregar productos al carrito
function agregarProducto (indice) {
    carrito.push (productos [indice])
    document.querySelector ("#cantidadProductos").innerHTML = +carrito.length
    productosCarrito ()
    totalCarrito ()
}

// Eliminar productos del carrito
function eliminarProducto (indice) {
    carrito.splice (indice,1)
    document.querySelector ("#cantidadProductos").innerHTML = +carrito.length
    productosCarrito ()
    totalCarrito ()
}

// Escuchar boton "proceder compra"
document.getElementById ("procederCompra").onclick = function() {metodoPago()}