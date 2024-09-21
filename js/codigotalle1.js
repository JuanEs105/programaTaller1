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
                <button onclick="activarEdicion(${index})">
                    <img src="https://cdn-icons-png.flaticon.com/512/84/84380.png" width="25" />
                </button>
            </td>
            <td>
                <input type="text" value="${actividad.nombre}" id="nombre-actividad-${index}" disabled />
            </td>
            <td>
                <input type="number" value="${actividad.nota}" id="nota-actividad-${index}" disabled />
            </td>
        `;
        listaActividades.appendChild(fila);
    });
}

function activarEdicion(index) {
    const nombreInput = document.getElementById(`nombre-actividad-${index}`);
    const notaInput = document.getElementById(`nota-actividad-${index}`);

    // Habilitar los campos de entrada
    nombreInput.disabled = false;
    notaInput.disabled = false;

    // Cambiar el texto del botón a "Guardar"
    const button = document.querySelectorAll("button")[index + 1]; // Asegúrate de apuntar al botón correcto
    button.innerHTML = `<img src="https://cdn-icons-png.flaticon.com/512/84/84380.png" width="25" /> Guardar`;
    button.setAttribute("onclick", `guardarActividad(${index})`);
}

function guardarActividad(index) {
    const nombreInput = document.getElementById(`nombre-actividad-${index}`);
    const notaInput = document.getElementById(`nota-actividad-${index}`);

    const nuevaActividad = nombreInput.value;
    const nuevaNota = parseFloat(notaInput.value);

    if (nuevaActividad === "" || isNaN(nuevaNota) || nuevaNota < 0 || nuevaNota > 5) {
        alert("Por favor, completa los campos correctamente.");
        return;
    }

    actividades[index].nombre = nuevaActividad;
    actividades[index].nota = nuevaNota;

    mostrarActividades();
    calcularPromedio();
}

function eliminarActividad(index) {
    const confirmacion = confirm("¿Deseas eliminar esta actividad?");
    if (confirmacion) {
        actividades.splice(index, 1);
        mostrarActividades();
        calcularPromedio();
    }
}

function calcularPromedio() {
    if (actividades.length === 0) {
        valorPromedio.textContent = "0";
        document.getElementById("valor-estado").textContent = "No evaluado";
        return;
    }
    
    const totalNotas = actividades.reduce((sum, actividad) => sum + actividad.nota, 0);
    const promedio = totalNotas / actividades.length;
    
    valorPromedio.textContent = promedio.toFixed(2);
    
    // Determinar el estado de la actividad
    const estadoActividad = promedio >= 3 ? "Aprobada" : "No aprobada";
    document.getElementById("valor-estado").textContent = estadoActividad;
}

// Asignar el evento al botón "Agregar Actividad"
document.getElementById("agregar-actividad").addEventListener("click", agregarActividad);
