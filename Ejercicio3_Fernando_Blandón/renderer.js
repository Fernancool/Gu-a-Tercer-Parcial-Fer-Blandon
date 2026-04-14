let productos = [];

function agregarProducto() {
  let nombre = document.getElementById("nombre").value;
  let categoria = document.getElementById("categoria").value;
  let precioCompra = parseFloat(document.getElementById("precioCompra").value);
  let precioVenta = parseFloat(document.getElementById("precioVenta").value);
  let cantidad = parseFloat(document.getElementById("cantidad").value);

  if (nombre === "" || categoria === "" || isNaN(precioCompra) || isNaN(precioVenta) || isNaN(cantidad)) {
    alert("Ingrese todos los datos");
    return;
  }

  let valorTotal = precioCompra * cantidad;
  let ganancia = (precioVenta - precioCompra) * cantidad;

  let producto = {
    nombre,
    categoria,
    valorTotal,
    ganancia
  };

  productos.push(producto);

  agregarTabla(producto);
  calcularResultados();

  limpiarCampos();
}

function agregarTabla(prod) {
  let tabla = document.querySelector("#tabla tbody");
  let fila = tabla.insertRow();

  fila.insertCell(0).innerText = prod.nombre;
  fila.insertCell(1).innerText = prod.categoria;
  fila.insertCell(2).innerText = prod.valorTotal.toFixed(2);
  fila.insertCell(3).innerText = prod.ganancia.toFixed(2);
}

function calcularResultados() {
  let totalInventario = 0;
  let gananciaTotal = 0;
  let mayor = productos[0];

  productos.forEach(prod => {
    totalInventario += prod.valorTotal;
    gananciaTotal += prod.ganancia;

    if (prod.valorTotal > mayor.valorTotal) {
      mayor = prod;
    }
  });

  document.getElementById("totalInventario").innerText =
    "Valor Total del Inventario: " + totalInventario.toFixed(2);

  document.getElementById("gananciaTotal").innerText =
    "Ganancia Total Potencial: " + gananciaTotal.toFixed(2);

  document.getElementById("mayorProducto").innerText =
    "Producto con Mayor Valor: " + mayor.nombre + " (" + mayor.valorTotal.toFixed(2) + ")";
}

function limpiarCampos() {
  document.getElementById("nombre").value = "";
  document.getElementById("categoria").value = "";
  document.getElementById("precioCompra").value = "";
  document.getElementById("precioVenta").value = "";
  document.getElementById("cantidad").value = "";
}