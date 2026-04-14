let ventas = [];

function obtenerDescuento(tipo) {
  if (tipo === "Normal") return 0;
  if (tipo === "Frecuente") return 0.10;
  if (tipo === "Mayorista") return 0.20;
}

function agregarVenta() {
  let repuesto = document.getElementById("repuesto").value;
  let precio = parseFloat(document.getElementById("precio").value);
  let cantidad = parseFloat(document.getElementById("cantidad").value);
  let tipo = document.getElementById("tipo").value;

  if (repuesto === "" || isNaN(precio) || isNaN(cantidad)) {
    alert("Ingrese todos los datos");
    return;
  }

  let subtotal = precio * cantidad;
  let porcentaje = obtenerDescuento(tipo);
  let descuento = subtotal * porcentaje;
  let total = subtotal - descuento;

  let venta = {
    repuesto,
    total,
    descuento
  };

  ventas.push(venta);

  agregarTabla(repuesto, tipo, subtotal, descuento, total);
  calcularResultados();

  limpiarCampos();
}

function agregarTabla(repuesto, tipo, subtotal, descuento, total) {
  let tabla = document.querySelector("#tabla tbody");
  let fila = tabla.insertRow();

  fila.insertCell(0).innerText = repuesto;
  fila.insertCell(1).innerText = tipo;
  fila.insertCell(2).innerText = subtotal.toFixed(2);
  fila.insertCell(3).innerText = descuento.toFixed(2);
  fila.insertCell(4).innerText = total.toFixed(2);
}

function calcularResultados() {
  let totalVendido = 0;
  let totalDescuentos = 0;

  let ingresosPorRepuesto = {};

  ventas.forEach(v => {
    totalVendido += v.total;
    totalDescuentos += v.descuento;

    if (!ingresosPorRepuesto[v.repuesto]) {
      ingresosPorRepuesto[v.repuesto] = 0;
    }
    ingresosPorRepuesto[v.repuesto] += v.total;
  });


  let mayorRepuesto = "";
  let maxIngreso = 0;

  for (let rep in ingresosPorRepuesto) {
    if (ingresosPorRepuesto[rep] > maxIngreso) {
      maxIngreso = ingresosPorRepuesto[rep];
      mayorRepuesto = rep;
    }
  }

  document.getElementById("totalVendido").innerText =
    "Total Vendido: " + totalVendido.toFixed(2);

  document.getElementById("mayorIngreso").innerText =
    "Repuesto con Mayor Ingreso: " + mayorRepuesto;

  document.getElementById("totalDescuentos").innerText =
    "Total Descuentos Aplicados: " + totalDescuentos.toFixed(2);
}

function limpiarCampos() {
  document.getElementById("repuesto").value = "";
  document.getElementById("precio").value = "";
  document.getElementById("cantidad").value = "";
}