let pagos = [];

function agregarPago() {
  let nombre = document.getElementById("nombre").value;
  let mensualidad = parseFloat(document.getElementById("mensualidad").value);
  let recargos = parseFloat(document.getElementById("recargos").value);
  let descuentos = parseFloat(document.getElementById("descuentos").value);

  if (nombre === "" || isNaN(mensualidad) || isNaN(recargos) || isNaN(descuentos)) {
    alert("Ingrese todos los datos");
    return;
  }

  let total = mensualidad + recargos - descuentos;

  let pago = {
    nombre,
    total,
    descuentos
  };

  pagos.push(pago);

  agregarTabla(nombre, total);
  calcularResultados();

  limpiarCampos();
}

function agregarTabla(nombre, total) {
  let tabla = document.querySelector("#tabla tbody");
  let fila = tabla.insertRow();

  fila.insertCell(0).innerText = nombre;
  fila.insertCell(1).innerText = total.toFixed(2);
}

function calcularResultados() {
  let totalRecaudado = 0;
  let totalDescuentos = 0;
  let mayor = pagos[0];
  let menor = pagos[0];

  pagos.forEach(p => {
    totalRecaudado += p.total;
    totalDescuentos += p.descuentos;

    if (p.total > mayor.total) mayor = p;
    if (p.total < menor.total) menor = p;
  });

  document.getElementById("totalRecaudado").innerText =
    "Total Recaudado: " + totalRecaudado.toFixed(2);

  document.getElementById("totalDescuentos").innerText =
    "Total en Descuentos: " + totalDescuentos.toFixed(2);

  document.getElementById("mayor").innerText =
    "Pago Más Alto: " + mayor.nombre + " (" + mayor.total.toFixed(2) + ")";

  document.getElementById("menor").innerText =
    "Pago Más Bajo: " + menor.nombre + " (" + menor.total.toFixed(2) + ")";
}

function limpiarCampos() {
  document.getElementById("nombre").value = "";
  document.getElementById("mensualidad").value = "";
  document.getElementById("recargos").value = "";
  document.getElementById("descuentos").value = "";
}