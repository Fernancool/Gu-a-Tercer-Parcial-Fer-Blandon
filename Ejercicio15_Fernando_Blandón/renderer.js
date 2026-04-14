let produccion = [];

function agregarProduccion() {
  let empleado = document.getElementById("empleado").value;
  let unidades = parseFloat(document.getElementById("unidades").value);
  let pagoUnidad = parseFloat(document.getElementById("pagoUnidad").value);

  if (empleado === "" || isNaN(unidades) || isNaN(pagoUnidad)) {
    alert("Ingrese todos los datos");
    return;
  }

  let subtotal = unidades * pagoUnidad;

  
  let bono = 0;
  if (unidades > 100) {
    bono = subtotal * 0.20;
  }

  let total = subtotal + bono;

  let registro = {
    empleado,
    unidades,
    total
  };

  produccion.push(registro);

  agregarTabla(empleado, unidades, total);
  calcularResultados();

  limpiarCampos();
}

function agregarTabla(empleado, unidades, total) {
  let tabla = document.querySelector("#tabla tbody");
  let fila = tabla.insertRow();

  fila.insertCell(0).innerText = empleado;
  fila.insertCell(1).innerText = unidades;
  fila.insertCell(2).innerText = total.toFixed(2);
}

function calcularResultados() {
  let totalPagado = 0;
  let sumaUnidades = 0;
  let mayor = produccion[0];
  let menor = produccion[0];

  produccion.forEach(p => {
    totalPagado += p.total;
    sumaUnidades += p.unidades;

    if (p.unidades > mayor.unidades) mayor = p;
    if (p.unidades < menor.unidades) menor = p;
  });

  let promedio = sumaUnidades / produccion.length;

  document.getElementById("totalPagado").innerText =
    "Total Pagado: " + totalPagado.toFixed(2);

  document.getElementById("mayor").innerText =
    "Mayor Producción: " + mayor.empleado + " (" + mayor.unidades + ")";

  document.getElementById("menor").innerText =
    "Menor Producción: " + menor.empleado + " (" + menor.unidades + ")";

  document.getElementById("promedio").innerText =
    "Promedio de Producción: " + promedio.toFixed(2);
}

function limpiarCampos() {
  document.getElementById("empleado").value = "";
  document.getElementById("unidades").value = "";
  document.getElementById("pagoUnidad").value = "";
}