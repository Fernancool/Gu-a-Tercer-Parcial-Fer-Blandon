let estudiantes = [];

function agregarEstudiante() {
  let nombre = document.getElementById("nombre").value;
  let carrera = document.getElementById("carrera").value;
  let clases = parseFloat(document.getElementById("clases").value);
  let costo = parseFloat(document.getElementById("costo").value);

  if (nombre === "" || carrera === "" || isNaN(clases) || isNaN(costo)) {
    alert("Ingrese todos los datos");
    return;
  }

  let subtotal = clases * costo;

  
  let descuento = 0;
  if (clases > 5) {
    descuento = subtotal * 0.15;
  }

  let total = subtotal - descuento;

  let estudiante = {
    nombre,
    carrera,
    total
  };

  estudiantes.push(estudiante);

  agregarTabla(nombre, carrera, subtotal, descuento, total);
  calcularResultados();

  limpiarCampos();
}

function agregarTabla(nombre, carrera, subtotal, descuento, total) {
  let tabla = document.querySelector("#tabla tbody");
  let fila = tabla.insertRow();

  fila.insertCell(0).innerText = nombre;
  fila.insertCell(1).innerText = carrera;
  fila.insertCell(2).innerText = subtotal.toFixed(2);
  fila.insertCell(3).innerText = descuento.toFixed(2);
  fila.insertCell(4).innerText = total.toFixed(2);
}

function calcularResultados() {
  let totalRecaudado = 0;
  let conteoCarreras = {};

  estudiantes.forEach(e => {
    totalRecaudado += e.total;

    if (!conteoCarreras[e.carrera]) {
      conteoCarreras[e.carrera] = 0;
    }
    conteoCarreras[e.carrera]++;
  });

  
  let carreraMas = "";
  let max = 0;

  for (let c in conteoCarreras) {
    if (conteoCarreras[c] > max) {
      max = conteoCarreras[c];
      carreraMas = c;
    }
  }

  document.getElementById("totalEstudiantes").innerText =
    "Total de Estudiantes: " + estudiantes.length;

  document.getElementById("totalRecaudado").innerText =
    "Total Recaudado: " + totalRecaudado.toFixed(2);

  document.getElementById("carreraMas").innerText =
    "Carrera con Más Estudiantes: " + carreraMas;
}

function limpiarCampos() {
  document.getElementById("nombre").value = "";
  document.getElementById("carrera").value = "";
  document.getElementById("clases").value = "";
  document.getElementById("costo").value = "";
}