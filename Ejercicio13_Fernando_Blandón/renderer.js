let ventas = [];

function agregarVenta() {
  let vendedor = document.getElementById("vendedor").value;
  let monto = parseFloat(document.getElementById("monto").value);
  let comision = parseFloat(document.getElementById("comision").value);

  if (vendedor === "" || isNaN(monto) || isNaN(comision)) {
    alert("Ingrese todos los datos");
    return;
  }

  let valorComision = monto * (comision / 100);
  let totalRecibido = monto + valorComision;

  let venta = {
    vendedor,
    monto,
    valorComision
  };

  ventas.push(venta);

  agregarTabla(vendedor, monto, valorComision, totalRecibido);
  calcularResultados();

  limpiarCampos();
}

function agregarTabla(vendedor, monto, comision, total) {
  let tabla = document.querySelector("#tabla tbody");
  let fila = tabla.insertRow();

  fila.insertCell(0).innerText = vendedor;
  fila.insertCell(1).innerText = monto.toFixed(2);
  fila.insertCell(2).innerText = comision.toFixed(2);
  fila.insertCell(3).innerText = total.toFixed(2);
}

function calcularResultados() {
  let totalVendido = 0;
  let totalComisiones = 0;
  let mayor = ventas[0];
  let menor = ventas[0];

  ventas.forEach(v => {
    totalVendido += v.monto;
    totalComisiones += v.valorComision;

    if (v.monto > mayor.monto) mayor = v;
    if (v.monto < menor.monto) menor = v;
  });

  document.getElementById("totalVendido").innerText =
    "Total Vendido: " + totalVendido.toFixed(2);

  document.getElementById("totalComisiones").innerText =
    "Total en Comisiones: " + totalComisiones.toFixed(2);

  document.getElementById("mayor").innerText =
    "Mayor Venta: " + mayor.vendedor + " (" + mayor.monto.toFixed(2) + ")";

  document.getElementById("menor").innerText =
    "Menor Venta: " + menor.vendedor + " (" + menor.monto.toFixed(2) + ")";
}

function limpiarCampos() {
  document.getElementById("vendedor").value = "";
  document.getElementById("monto").value = "";
  document.getElementById("comision").value = "";
}