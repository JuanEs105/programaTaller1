document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('actividad-form');
    const tablaActividades = document.getElementById('tabla-actividades');
    let editId = null;

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const actividad = document.getElementById('actividad').value;
        const nota = document.getElementById('nota').value;

        if (editId !== null) {
            // Editar fila existente
            const row = document.getElementById(editId);
            row.cells[1].textContent = actividad;
            row.cells[2].textContent = nota;
            editId = null;
        } else {
            // Agregar nueva fila
            const newRow = tablaActividades.insertRow();
            newRow.id = `row-${Date.now()}`; // Generar un ID único para la fila
            
            const cell1 = newRow.insertCell(0);
            const cell2 = newRow.insertCell(1);
            const cell3 = newRow.insertCell(2);
            const cell4 = newRow.insertCell(3);

            cell1.textContent = tablaActividades.rows.length; // ID basado en el número de filas
            cell2.textContent = actividad;
            cell3.textContent = nota;

            const editButton = document.createElement('button');
            editButton.textContent = 'Modificar';
            editButton.onclick = () => editRow(newRow.id);
            
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.onclick = () => deleteRow(newRow.id);
            
            cell4.appendChild(editButton);
            cell4.appendChild(deleteButton);
        }

        // Limpiar formulario
        form.reset();
    });

    function editRow(id) {
        const row = document.getElementById(id);
        document.getElementById('actividad').value = row.cells[1].textContent;
        document.getElementById('nota').value = row.cells[2].textContent;
        editId = id;
    }

    function deleteRow(id) {
        const row = document.getElementById(id);
        row.remove();
    }
});
