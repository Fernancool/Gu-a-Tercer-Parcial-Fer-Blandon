let estudiantes = [];

function agregarEstudiante() {
  let nombre = document.getElementById("nombre").value;
  let n1 = parseFloat(document.getElementById("nota1").value);
  let n2 = parseFloat(document.getElementById("nota2").value);
  let n3 = parseFloat(document.getElementById("nota3").value);

  if (nombre === "" || isNaN(n1) || isNaN(n2) || isNaN(n3)) {
    alert("Ingrese todos los datos");
    return;
  }

  let promedio = (n1 + n2 + n3) / 3;
  let estado = promedio >= 60 ? "Aprobado" : "Reprobado";

  let estudiante = { nombre, promedio, estado };
  estudiantes.push(estudiante);

  agregarTabla(estudiante);
  calcularResultados();

  limpiarCampos();
}

function agregarTabla(est) {
  let tabla = document.querySelector("#tabla tbody");
  let fila = tabla.insertRow();

  fila.insertCell(0).innerText = est.nombre;
  fila.insertCell(1).innerText = est.promedio.toFixed(2);
  fila.insertCell(2).innerText = est.estado;
}

function calcularResultados() {
  let suma = 0;
  let mayor = estudiantes[0];
  let menor = estudiantes[0];
  let aprobados = 0;
  let reprobados = 0;

  estudiantes.forEach(est => {
    suma += est.promedio;

    if (est.promedio > mayor.promedio) mayor = est;
    if (est.promedio < menor.promedio) menor = est;

    if (est.estado === "Aprobado") aprobados++;
    else reprobados++;
  });

  let promedioGeneral = suma / estudiantes.length;

  document.getElementById("promedioGeneral").innerText =
    "Promedio General: " + promedioGeneral.toFixed(2);

  document.getElementById("mayor").innerText =
    "Mayor Promedio: " + mayor.nombre + " (" + mayor.promedio.toFixed(2) + ")";

  document.getElementById("menor").innerText =
    "Menor Promedio: " + menor.nombre + " (" + menor.promedio.toFixed(2) + ")";

  document.getElementById("aprobados").innerText =
    "Aprobados: " + aprobados;

  document.getElementById("reprobados").innerText =
    "Reprobados: " + reprobados;
}

function limpiarCampos() {
  document.getElementById("nombre").value = "";
  document.getElementById("nota1").value = "";
  document.getElementById("nota2").value = "";
  document.getElementById("nota3").value = "";
}