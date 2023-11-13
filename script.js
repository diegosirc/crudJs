document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("patient-form");
    const tableBody = document.getElementById("patient-table-body");
    let selectedRow = null;

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Obtén los valores del formulario
        const name = document.getElementById("name").value;
        const dni = document.getElementById("dni").value;
        const age = document.getElementById("age").value;
        const insurance = document.getElementById("insurance").value;
        const appointmentInput = document.getElementById("appointment");
        const appointmentValue = appointmentInput.value;

        // Formatea la fecha y hora en el formato deseado (dd/mm/yyyy HH:MM).
        const formattedAppointment = formatAppointmentDate(appointmentValue);

        if (selectedRow) {
            // Si hay una fila seleccionada, actualiza los datos en lugar de agregar uno nuevo.
            selectedRow.cells[0].textContent = name;
            selectedRow.cells[1].textContent = dni;
            selectedRow.cells[2].textContent = age;
            selectedRow.cells[3].textContent = insurance;
            selectedRow.cells[4].textContent = formattedAppointment;
            selectedRow = null;
        } else {
            // Inserta una nueva fila en la tabla con los datos ingresados y el botón de editar/eliminar.
            const newRow = tableBody.insertRow();
            newRow.innerHTML = `
                <td>${name}</td>
                <td>${dni}</td>
                <td>${age}</td>
                <td>${insurance}</td>
                <td>${formattedAppointment}</td>
                <td>
                    <button class="edit-btn btn-yellow"><i class="fas fa-pencil-alt"></i> Editar</button>
                    <button class="delete-btn btn-red"><i class="fas fa-trash"></i> Eliminar</button>
                </td>
            `;

            // Agrega oyentes de eventos para los botones de editar y eliminar.
            const editButton = newRow.querySelector(".edit-btn");
            editButton.addEventListener("click", function () {
                editPatient(newRow);
            });

            const deleteButton = newRow.querySelector(".delete-btn");
            deleteButton.addEventListener("click", function () {
                tableBody.removeChild(newRow);
            });
        }

        // Restablece el formulario después de enviar los datos.
        form.reset();
    });

    function editPatient(row) {
        selectedRow = row;
        const cells = row.getElementsByTagName("td");
        document.getElementById("name").value = cells[0].textContent;
        document.getElementById("dni").value = cells[1].textContent;
        document.getElementById("age").value = cells[2].textContent;
        document.getElementById("insurance").value = cells[3].textContent;

        const formattedAppointment = cells[4].textContent;
        const appointmentInput = document.getElementById("appointment");
        appointmentInput.value = parseAppointmentDate(formattedAppointment);
    }

    function formatAppointmentDate(dateString) {
        const date = new Date(dateString);
        const formattedDate = `${addZero(date.getDate())}/${addZero(date.getMonth() + 1)}/${date.getFullYear()} ${addZero(date.getHours())}:${addZero(date.getMinutes())}`;
        return formattedDate;
    }

    function parseAppointmentDate(formattedDate) {
        const parts = formattedDate.split(" ");
        const dateParts = parts[0].split("/");
        const timeParts = parts[1].split(":");
        const year = parseInt(dateParts[2], 10);
        const month = parseInt(dateParts[1], 10) - 1;
        const day = parseInt(dateParts[0], 10);
        const hours = parseInt(timeParts[0], 10);
        const minutes = parseInt(timeParts[1], 10);
        const date = new Date(year, month, day, hours, minutes);
        return date.toISOString().slice(0, 16);
    }

    function addZero(number) {
        return number < 10 ? `0${number}` : number;
    }
});
