let pedidos = [];

function agregarPedido() {
  let cliente = document.getElementById("cliente").value;
  let producto = document.getElementById("producto").value;
  let cantidad = parseFloat(document.getElementById("cantidad").value);
  let precio = parseFloat(document.getElementById("precio").value);

  if (cliente === "" || producto === "" || isNaN(cantidad) || isNaN(precio)) {
    alert("Ingrese todos los datos");
    return;
  }

  let subtotal = cantidad * precio;

  // Descuento: si subtotal > 500 → 10%
  let descuento = 0;
  if (subtotal > 500) {
    descuento = subtotal * 0.10;
  }

  let total = subtotal - descuento;

  let pedido = {
    cliente,
    producto,
    cantidad,
    total
  };

  pedidos.push(pedido);

  agregarTabla(cliente, producto, subtotal, descuento, total);
  calcularResultados();

  limpiarCampos();
}

function agregarTabla(cliente, producto, subtotal, descuento, total) {
  let tabla = document.querySelector("#tabla tbody");
  let fila = tabla.insertRow();

  fila.insertCell(0).innerText = cliente;
  fila.insertCell(1).innerText = producto;
  fila.insertCell(2).innerText = subtotal.toFixed(2);
  fila.insertCell(3).innerText = descuento.toFixed(2);
  fila.insertCell(4).innerText = total.toFixed(2);
}

function calcularResultados() {
  let totalVendido = 0;

  let conteoProductos = {};
  let comprasClientes = {};

  pedidos.forEach(p => {
    totalVendido += p.total;

    // contar productos
    if (!conteoProductos[p.producto]) {
      conteoProductos[p.producto] = 0;
    }
    conteoProductos[p.producto] += p.cantidad;

    // total por cliente
    if (!comprasClientes[p.cliente]) {
      comprasClientes[p.cliente] = 0;
    }
    comprasClientes[p.cliente] += p.total;
  });

  // producto más solicitado
  let productoMas = "";
  let maxCantidad = 0;

  for (let prod in conteoProductos) {
    if (conteoProductos[prod] > maxCantidad) {
      maxCantidad = conteoProductos[prod];
      productoMas = prod;
    }
  }

  // cliente con mayor compra
  let clienteMayor = "";
  let maxCompra = 0;

  for (let cli in comprasClientes) {
    if (comprasClientes[cli] > maxCompra) {
      maxCompra = comprasClientes[cli];
      clienteMayor = cli;
    }
  }

  document.getElementById("totalVendido").innerText =
    "Total Vendido: " + totalVendido.toFixed(2);

  document.getElementById("productoMas").innerText =
    "Producto Más Solicitado: " + productoMas;

  document.getElementById("clienteMayor").innerText =
    "Cliente con Mayor Compra: " + clienteMayor;
}

function limpiarCampos() {
  document.getElementById("cliente").value = "";
  document.getElementById("producto").value = "";
  document.getElementById("cantidad").value = "";
  document.getElementById("precio").value = "";
}