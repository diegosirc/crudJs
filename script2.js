document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById("file-input");
    const uploadButton = document.getElementById("upload-button");
    const fileList = document.getElementById("file-list");

    fileInput.addEventListener("change", function () {
        const files = fileInput.files;

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const listItem = document.createElement("li");
            listItem.textContent = file.name;
            fileList.appendChild(listItem);
        }
    });

    uploadButton.addEventListener("click", function () {
        // Aquí puedes agregar código para subir los archivos al servidor.
        alert("Archivos subidos correctamente.");
        fileInput.value = null; // Limpia la selección de archivos después de cargarlos.
    });
});
