let pacientes = [];

function obtenerCostoBase(tipo) {
  if (tipo === "General") return 300;
  if (tipo === "Especialista") return 600;
  if (tipo === "Emergencia") return 1000;
}

function agregarPaciente() {
  let nombre = document.getElementById("nombre").value;
  let edad = parseFloat(document.getElementById("edad").value);
  let tipo = document.getElementById("tipo").value;

  if (nombre === "" || isNaN(edad)) {
    alert("Ingrese todos los datos");
    return;
  }

  let costo = obtenerCostoBase(tipo);

  // Descuento o recargo
  if (edad < 12) {
    costo *= 0.8; // 20% descuento
  } else if (edad > 60) {
    costo *= 0.7; // 30% descuento
  } else if (tipo === "Emergencia") {
    costo *= 1.2; // 20% recargo
  }

  let paciente = {
    nombre,
    edad,
    tipo,
    total: costo
  };

  pacientes.push(paciente);

  agregarTabla(paciente);
  calcularResultados();

  limpiarCampos();
}

function agregarTabla(p) {
  let tabla = document.querySelector("#tabla tbody");
  let fila = tabla.insertRow();

  fila.insertCell(0).innerText = p.nombre;
  fila.insertCell(1).innerText = p.edad;
  fila.insertCell(2).innerText = p.tipo;
  fila.insertCell(3).innerText = p.total.toFixed(2);
}

function calcularResultados() {
  let totalRecaudado = 0;

  let conteo = {
    General: 0,
    Especialista: 0,
    Emergencia: 0
  };

  pacientes.forEach(p => {
    totalRecaudado += p.total;
    conteo[p.tipo]++;
  });

  document.getElementById("totalPacientes").innerText =
    "Total de Pacientes: " + pacientes.length;

  document.getElementById("totalRecaudado").innerText =
    "Total Recaudado: " + totalRecaudado.toFixed(2);

  document.getElementById("porTipo").innerText =
    "General: " + conteo.General +
    " | Especialista: " + conteo.Especialista +
    " | Emergencia: " + conteo.Emergencia;
}

function limpiarCampos() {
  document.getElementById("nombre").value = "";
  document.getElementById("edad").value = "";
}