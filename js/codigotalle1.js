document.getElementById('formulario-actividad').addEventListener('submit', function(event) {
    event.preventDefault();

    const Actividad = document.getElementById('nombre-actividad').value;
    const Nota = parseFloat(document.getElementById('nota-actividad').value);
    agregarActividad(actividad, nota);
    calcularPromedio();
});

function agregarActividad(actividad, nota) {
    const tabla = document.getElementById('lista-actividades');
    const fila = tabla.insertRow();
    const celdaActividad = fila.insertCell();
    const celdaNota = fila.insertCell();
    const celdaAcciones = fila.insertCell();

    celdaActividad.textContent = actividad;
    celdaNota.textContent = nota.toFixed(1);
    celdaAcciones.innerHTML = `
        <button onclick="editarActividad(this)">Editar</button>
        <button onclick="eliminarActividad(this)">Eliminar</button>
    `;

    document.getElementById('nombre-actividad').value = '';
    document.getElementById('nota-actividad').value = '';
}

function calcularPromedio() {
    const notas = Array.from(document.querySelectorAll('#lista-actividades td:nth-child(2)')).map(td => parseFloat(td.textContent));
    const promedio = notas.reduce((a, b) => a + b, 0) / notas.length;

    document.getElementById('valor-promedio').textContent = promedio.toFixed(1);
    mostrarResultado(promedio);
}

function eliminarActividad(boton) {
    const fila = boton.parentNode.parentNode;
    fila.parentNode.removeChild(fila);
    calcularPromedio();
}

function editarActividad(boton) {
    const fila = boton.parentNode.parentNode;
    const celdaActividad = fila.cells[0];
    const celdaNota = fila.cells[1];

    // Crear inputs para editar la actividad y la nota
    const nuevoActividadInput = document.createElement('input');
    nuevoActividadInput.type = 'text';
    nuevoActividadInput.value = celdaActividad.textContent;

    const nuevoNotaInput = document.createElement('input');
    nuevoNotaInput.type = 'number';
    nuevoNotaInput.min = 0;
    nuevoNotaInput.max = 5;
    nuevoNotaInput.step = 0.1;
    nuevoNotaInput.value = celdaNota.textContent;

    celdaActividad.innerHTML = '';
    celdaNota.innerHTML = '';
    celdaActividad.appendChild(nuevoActividadInput);
    celdaNota.appendChild(nuevoNotaInput);

    boton.textContent = 'Guardar';
    boton.onclick = function () {
        guardarCambios(fila, nuevoActividadInput, nuevoNotaInput);
    };
}

function guardarCambios(fila, nuevoActividadInput, nuevoNotaInput) {
    const nuevaActividad = nuevoActividadInput.value;
    const nuevaNota = parseFloat(nuevoNotaInput.value);

    fila.cells[0].textContent = nuevaActividad;
    fila.cells[1].textContent = nuevaNota.toFixed(1);

    // Restaurar el botón de editar
    fila.cells[2].innerHTML = `
        <button onclick="editarActividad(this)">Editar</button>
        <button onclick="eliminarActividad(this)">Eliminar</button>
    `;

    calcularPromedio();
}

function mostrarResultado(promedio) {
    let mensaje = promedio >= 3 ? `Pasó con ${promedio.toFixed(1)}` : `No pasó con ${promedio.toFixed(1)}`;
    alert(mensaje);
}