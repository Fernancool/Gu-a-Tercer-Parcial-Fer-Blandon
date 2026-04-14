// 🔥 PRODUCTOS INICIALES (OBLIGATORIO)
let productos = [
{ nombre: 'Cuaderno 100 hojas', precio: 35, cantidad: 100 },
{ nombre: 'Lápiz de madera', precio: 10, cantidad: 150 },
{ nombre: 'Resaltador amarillo', precio: 20, cantidad: 50 },
{ nombre: 'Tijeras escolares', precio: 45, cantidad: 30 },
{ nombre: 'Carpeta con anillos', precio: 80, cantidad: 70 },
{ nombre: 'Bolígrafo 4 colores', precio: 25, cantidad: 80 },
{ nombre: 'Regla 30 cm', precio: 15, cantidad: 100 },
{ nombre: 'Calculadora de bolsillo', precio: 120, cantidad: 40 },
{ nombre: 'Pegamento en barra', precio: 18, cantidad: 200 },
{ nombre: 'Cartulina (paquete 10)', precio: 50, cantidad: 60 }
];

// 🔥 ARRAY DE VENTAS
let ventas = [];

// 🔥 AL INICIAR
window.onload = () => {
  mostrarProductos();
  cargarSelect();
};

// 🔹 MOSTRAR INVENTARIO
function mostrarProductos() {
  let tabla = document.querySelector("#tabla tbody");
  tabla.innerHTML = "";

  productos.forEach(p => {
    let fila = tabla.insertRow();
    fila.insertCell(0).innerText = p.nombre;
    fila.insertCell(1).innerText = p.precio;
    fila.insertCell(2).innerText = p.cantidad;
  });
}

// 🔹 CARGAR SELECT
function cargarSelect() {
  let select = document.getElementById("productoSelect");
  select.innerHTML = "";

  productos.forEach((p, i) => {
    let opcion = document.createElement("option");
    opcion.value = i;
    opcion.text = p.nombre;
    select.add(opcion);
  });
}

// 🔹 AGREGAR PRODUCTO
function agregarProducto() {
  let nombre = document.getElementById("nombreProducto").value;
  let precio = parseFloat(document.getElementById("precioProducto").value);
  let cantidad = parseFloat(document.getElementById("cantidadProducto").value);

  if (nombre === "" || isNaN(precio) || isNaN(cantidad)) {
    alert("Ingrese todos los datos");
    return;
  }

  productos.push({ nombre, precio, cantidad });

  mostrarProductos();
  cargarSelect();

  document.getElementById("nombreProducto").value = "";
  document.getElementById("precioProducto").value = "";
  document.getElementById("cantidadProducto").value = "";
}

// 🔹 REGISTRAR VENTA
function registrarVenta() {
  let index = document.getElementById("productoSelect").value;
  let cantidad = parseFloat(document.getElementById("cantidadVenta").value);

  let producto = productos[index];

  if (isNaN(cantidad) || cantidad <= 0) {
    alert("Ingrese cantidad válida");
    return;
  }

  if (cantidad > producto.cantidad) {
    alert("Stock insuficiente");
    return;
  }

  let total = cantidad * producto.precio;

  // guardar venta
  ventas.push({
    nombre: producto.nombre,
    cantidad,
    total
  });

  // actualizar inventario
  producto.cantidad -= cantidad;

  mostrarProductos();
  calcularReporte();

  document.getElementById("cantidadVenta").value = "";
}

// 🔹 REPORTE
function calcularReporte() {
  let totalVentas = ventas.length;
  let totalGanancia = 0;

  let conteo = {};

  ventas.forEach(v => {
    totalGanancia += v.total;

    if (!conteo[v.nombre]) {
      conteo[v.nombre] = 0;
    }
    conteo[v.nombre] += v.cantidad;
  });

  let masVendido = "";
  let max = 0;

  for (let p in conteo) {
    if (conteo[p] > max) {
      max = conteo[p];
      masVendido = p;
    }
  }

  document.getElementById("totalVentas").innerText =
    "Total de Ventas: " + totalVentas;

  document.getElementById("masVendido").innerText =
    "Producto más vendido: " + masVendido;

  document.getElementById("mayorGanancia").innerText =
    "Total generado: " + totalGanancia.toFixed(2);
}