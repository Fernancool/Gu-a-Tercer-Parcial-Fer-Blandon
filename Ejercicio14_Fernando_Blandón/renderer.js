let prestamos = [];

function agregarPrestamo() {
  let estudiante = document.getElementById("estudiante").value;
  let libro = document.getElementById("libro").value;
  let dias = parseFloat(document.getElementById("dias").value);
  let multa = parseFloat(document.getElementById("multa").value);

  if (estudiante === "" || libro === "" || isNaN(dias) || isNaN(multa)) {
    alert("Ingrese todos los datos");
    return;
  }

  let total = multa; 

  let prestamo = {
    libro,
    multa
  };

  prestamos.push(prestamo);

  agregarTabla(estudiante, libro, total);
  calcularResultados();

  limpiarCampos();
}

function agregarTabla(estudiante, libro, total) {
  let tabla = document.querySelector("#tabla tbody");
  let fila = tabla.insertRow();

  fila.insertCell(0).innerText = estudiante;
  fila.insertCell(1).innerText = libro;
  fila.insertCell(2).innerText = total.toFixed(2);
}

function calcularResultados() {
  let totalMultas = 0;
  let conteoLibros = {};

  prestamos.forEach(p => {
    totalMultas += p.multa;

    if (!conteoLibros[p.libro]) {
      conteoLibros[p.libro] = 0;
    }
    conteoLibros[p.libro]++;
  });

  
  let libroMas = "";
  let max = 0;

  for (let l in conteoLibros) {
    if (conteoLibros[l] > max) {
      max = conteoLibros[l];
      libroMas = l;
    }
  }

  document.getElementById("totalPrestamos").innerText =
    "Total de Préstamos: " + prestamos.length;

  document.getElementById("totalMultas").innerText =
    "Total en Multas: " + totalMultas.toFixed(2);

  document.getElementById("libroMas").innerText =
    "Libro Más Solicitado: " + libroMas;
}

function limpiarCampos() {
  document.getElementById("estudiante").value = "";
  document.getElementById("libro").value = "";
  document.getElementById("dias").value = "";
  document.getElementById("multa").value = "";
}