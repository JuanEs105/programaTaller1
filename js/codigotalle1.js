const actividadInput = document.getElementById("nombre-actividad");
const notaInput = document.getElementById("nota-actividad");
const listaActividades = document.getElementById("lista-actividades");
const valorPromedio = document.getElementById("valor-promedio");

let actividades = [];

function agregarActividad() {
    const nombreActividad = actividadInput.value;
    const notaActividad = parseFloat(notaInput.value);

    if (nombreActividad === "" || isNaN(notaActividad) || notaActividad < 0 || notaActividad > 5) {
        alert("Por favor, completa los campos correctamente.");
        return;
    }

    actividades.push({ nombre: nombreActividad, nota: notaActividad });
    actividadInput.value = '';
    notaInput.value = '';
    mostrarActividades();
    calcularPromedio();
}

function mostrarActividades() {
    listaActividades.innerHTML = '';
    actividades.forEach((actividad, index) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>
                <button onclick="eliminarActividad(${index})">
                    <img src="https://www.pngall.com/wp-content/uploads/5/Delete-PNG-Clipart.png" width="25" />
                </button>
            </td>
            <td>
                <button onclick="modificarActividad(${index})">
                    <img src="https://cdn-icons-png.flaticon.com/512/84/84380.png" width="25" />
                </button>
            </td>
            <td>${actividad.nombre}</td>
            <td>${actividad.nota}</td>
        `;
        listaActividades.appendChild(fila);
    });
}

function eliminarActividad(index) {
    actividades.splice(index, 1);
    mostrarActividades();
    calcularPromedio();
}

function modificarActividad(index) {
    const nuevaActividad = prompt("Modificar actividad:", actividades[index].nombre);
    const nuevaNota = prompt("Modificar nota:", actividades[index].nota);
    
    if (nuevaActividad !== null && nuevaNota !== null) {
        actividades[index].nombre = nuevaActividad;
        actividades[index].nota = parseFloat(nuevaNota);
        mostrarActividades();
        calcularPromedio();
    }
}

function calcularPromedio() {
    if (actividades.length === 0) {
        valorPromedio.textContent = "0";
        return;
    }
    
    const totalNotas = actividades.reduce((sum, actividad) => sum + actividad.nota, 0);
    const promedio = totalNotas / actividades.length;
    
    valorPromedio.textContent = promedio.toFixed(2);
    
    // Mensaje de alerta sobre el promedio
    if (promedio >= 3) {
        alert(`¡Aprobaste la actividad! Promedio: ${promedio.toFixed(2)}`);
    } else {
        alert(`No aprobaste la actividad. Promedio: ${promedio.toFixed(2)}`);
    }
}

// Asignar el evento al botón "Agregar Actividad"
document.getElementById("agregar-actividad").addEventListener("click", agregarActividad);
