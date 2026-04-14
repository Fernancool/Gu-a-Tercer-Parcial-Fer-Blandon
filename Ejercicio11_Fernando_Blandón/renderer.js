let servicios = [];

function agregarServicio() {
  let cliente = document.getElementById("cliente").value;
  let servicio = document.getElementById("servicio").value;
  let costo = parseFloat(document.getElementById("costo").value);
  let recargo = parseFloat(document.getElementById("recargo").value);

  if (cliente === "" || servicio === "" || isNaN(costo) || isNaN(recargo)) {
    alert("Ingrese todos los datos");
    return;
  }

  let total = costo + recargo;

  let registro = {
    cliente,
    servicio,
    total
  };

  servicios.push(registro);

  agregarTabla(cliente, servicio, total);
  calcularResultados();

  limpiarCampos();
}

function agregarTabla(cliente, servicio, total) {
  let tabla = document.querySelector("#tabla tbody");
  let fila = tabla.insertRow();

  fila.insertCell(0).innerText = cliente;
  fila.insertCell(1).innerText = servicio;
  fila.insertCell(2).innerText = total.toFixed(2);
}

function calcularResultados() {
  let totalRecaudado = 0;
  let conteoServicios = {};

  servicios.forEach(s => {
    totalRecaudado += s.total;

    if (!conteoServicios[s.servicio]) {
      conteoServicios[s.servicio] = 0;
    }
    conteoServicios[s.servicio]++;
  });


  let servicioMas = "";
  let max = 0;

  for (let s in conteoServicios) {
    if (conteoServicios[s] > max) {
      max = conteoServicios[s];
      servicioMas = s;
    }
  }

  document.getElementById("totalServicios").innerText =
    "Total de Servicios: " + servicios.length;

  document.getElementById("totalRecaudado").innerText =
    "Total Recaudado: " + totalRecaudado.toFixed(2);

  document.getElementById("servicioMas").innerText =
    "Servicio Más Solicitado: " + servicioMas;
}

function limpiarCampos() {
  document.getElementById("cliente").value = "";
  document.getElementById("servicio").value = "";
  document.getElementById("costo").value = "";
  document.getElementById("recargo").value = "";
}