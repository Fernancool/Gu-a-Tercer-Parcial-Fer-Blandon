let clientes = [];

function obtenerTarifa(tipo) {
  if (tipo === "Individual") return 500;
  if (tipo === "Doble") return 800;
  if (tipo === "Suite") return 1200;
}

function agregarCliente() {
  let nombre = document.getElementById("nombre").value;
  let tipo = document.getElementById("tipo").value;
  let dias = parseFloat(document.getElementById("dias").value);

  if (nombre === "" || isNaN(dias)) {
    alert("Ingrese todos los datos");
    return;
  }

  let tarifa = obtenerTarifa(tipo);
  let subtotal = tarifa * dias;
  let impuesto = subtotal * 0.15;
  let total = subtotal + impuesto;

  let cliente = {
    nombre,
    tipo,
    total
  };

  clientes.push(cliente);

  agregarTabla(nombre, tipo, subtotal, impuesto, total);
  calcularResultados();

  limpiarCampos();
}

function agregarTabla(nombre, tipo, subtotal, impuesto, total) {
  let tabla = document.querySelector("#tabla tbody");
  let fila = tabla.insertRow();

  fila.insertCell(0).innerText = nombre;
  fila.insertCell(1).innerText = tipo;
  fila.insertCell(2).innerText = subtotal.toFixed(2);
  fila.insertCell(3).innerText = impuesto.toFixed(2);
  fila.insertCell(4).innerText = total.toFixed(2);
}

function calcularResultados() {
  let totalRecaudado = 0;
  let conteoTipos = {
    Individual: 0,
    Doble: 0,
    Suite: 0
  };

  clientes.forEach(c => {
    totalRecaudado += c.total;
    conteoTipos[c.tipo]++;
  });

  let masSolicitado = "Individual";
  if (conteoTipos["Doble"] > conteoTipos[masSolicitado]) {
    masSolicitado = "Doble";
  }
  if (conteoTipos["Suite"] > conteoTipos[masSolicitado]) {
    masSolicitado = "Suite";
  }

  document.getElementById("clientes").innerText =
    "Total de Clientes: " + clientes.length;

  document.getElementById("recaudado").innerText =
    "Total Recaudado: " + totalRecaudado.toFixed(2);

  document.getElementById("masSolicitado").innerText =
    "Tipo de Habitación Más Solicitado: " + masSolicitado;
}

function limpiarCampos() {
  document.getElementById("nombre").value = "";
  document.getElementById("dias").value = "";
}