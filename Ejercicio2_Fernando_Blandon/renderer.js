let empleados = [];

function agregarEmpleado() {
  let nombre = document.getElementById("nombre").value;
  let salarioHora = parseFloat(document.getElementById("salarioHora").value);
  let horas = parseFloat(document.getElementById("horas").value);

  if (nombre === "" || isNaN(salarioHora) || isNaN(horas)) {
    alert("Ingrese todos los datos");
    return;
  }

  let salarioBase = 0;
  let horasExtra = 0;
  let pagoExtra = 0;

  if (horas > 40) {
    salarioBase = 40 * salarioHora;
    horasExtra = horas - 40;
    pagoExtra = horasExtra * salarioHora * 2;
  } else {
    salarioBase = horas * salarioHora;
  }

  let salarioFinal = salarioBase + pagoExtra;

  let empleado = {
    nombre,
    salarioBase,
    horasExtra,
    salarioFinal
  };

  empleados.push(empleado);

  agregarTabla(empleado);
  calcularResultados();

  limpiarCampos();
}

function agregarTabla(emp) {
  let tabla = document.querySelector("#tabla tbody");
  let fila = tabla.insertRow();

  fila.insertCell(0).innerText = emp.nombre;
  fila.insertCell(1).innerText = emp.salarioBase.toFixed(2);
  fila.insertCell(2).innerText = emp.horasExtra;
  fila.insertCell(3).innerText = emp.salarioFinal.toFixed(2);
}

function calcularResultados() {
  let total = 0;
  let mayor = empleados[0];
  let menor = empleados[0];

  empleados.forEach(emp => {
    total += emp.salarioFinal;

    if (emp.salarioFinal > mayor.salarioFinal) mayor = emp;
    if (emp.salarioFinal < menor.salarioFinal) menor = emp;
  });

  document.getElementById("total").innerText =
    "Total Pagado: " + total.toFixed(2);

  document.getElementById("mayor").innerText =
    "Mayor Salario: " + mayor.nombre + " (" + mayor.salarioFinal.toFixed(2) + ")";

  document.getElementById("menor").innerText =
    "Menor Salario: " + menor.nombre + " (" + menor.salarioFinal.toFixed(2) + ")";
}

function limpiarCampos() {
  document.getElementById("nombre").value = "";
  document.getElementById("salarioHora").value = "";
  document.getElementById("horas").value = "";
}