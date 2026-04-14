let envios = [];

function obtenerTarifa(tipo) {
  if (tipo === "Normal") return 50;
  if (tipo === "Express") return 80;
  if (tipo === "Urgente") return 120;
}

function obtenerRecargo(tipo) {
  if (tipo === "Express") return 0.20;
  if (tipo === "Urgente") return 0.40;
  return 0;
}

function agregarEnvio() {
  let remitente = document.getElementById("remitente").value;
  let destino = document.getElementById("destino").value;
  let peso = parseFloat(document.getElementById("peso").value);
  let tipo = document.getElementById("tipo").value;

  if (remitente === "" || destino === "" || isNaN(peso)) {
    alert("Ingrese todos los datos");
    return;
  }

  let tarifa = obtenerTarifa(tipo);
  let subtotal = peso * tarifa;
  let recargo = subtotal * obtenerRecargo(tipo);
  let total = subtotal + recargo;

  let envio = {
    tipo,
    total
  };

  envios.push(envio);

  agregarTabla(remitente, destino, tipo, total);
  calcularResultados();

  limpiarCampos();
}

function agregarTabla(remitente, destino, tipo, total) {
  let tabla = document.querySelector("#tabla tbody");
  let fila = tabla.insertRow();

  fila.insertCell(0).innerText = remitente;
  fila.insertCell(1).innerText = destino;
  fila.insertCell(2).innerText = tipo;
  fila.insertCell(3).innerText = total.toFixed(2);
}

function calcularResultados() {
  let totalRecaudado = 0;
  let conteoTipos = {};
  let mayor = envios[0];

  envios.forEach(e => {
    totalRecaudado += e.total;

    if (!conteoTipos[e.tipo]) {
      conteoTipos[e.tipo] = 0;
    }
    conteoTipos[e.tipo]++;

    if (e.total > mayor.total) mayor = e;
  });

  
  let tipoMas = "";
  let max = 0;

  for (let t in conteoTipos) {
    if (conteoTipos[t] > max) {
      max = conteoTipos[t];
      tipoMas = t;
    }
  }

  document.getElementById("totalEnvios").innerText =
    "Total de Envíos: " + envios.length;

  document.getElementById("totalRecaudado").innerText =
    "Total Recaudado: " + totalRecaudado.toFixed(2);

  document.getElementById("tipoMas").innerText =
    "Tipo Más Utilizado: " + tipoMas;

  document.getElementById("masCostoso").innerText =
    "Envío Más Costoso: " + mayor.total.toFixed(2);
}

function limpiarCampos() {
  document.getElementById("remitente").value = "";
  document.getElementById("destino").value = "";
  document.getElementById("peso").value = "";
}