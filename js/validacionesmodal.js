document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#compraForm");
    const modal = new bootstrap.Modal(document.getElementById("exampleModal"));

    // Bloquear caracteres no permitidos en nombres y apellidos
    function bloquearCaracteresInvalidos(input) {
        input.addEventListener("keydown", function (event) {
            const key = event.key;
            if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]$/.test(key) && key !== "Backspace" && key !== "Tab") {
                event.preventDefault();
            }
        });
    }

    // Formatear correctamente con mayúsculas solo al inicio de cada palabra
    function capitalizarPalabras(input) {
        input.addEventListener("input", function () {
            input.value = input.value
                .toLowerCase()
                .replace(/\b\w/g, letra => letra.toUpperCase()) // Primera letra de cada palabra en mayúscula
                .replace(/([ÁÉÍÓÚáéíóú])(\w+)/g, (_, tilde, resto) => tilde + resto.toLowerCase()); // Mantener minúsculas después de tildes
        });
    }

    // Limitar nombres y apellidos a solo dos palabras
    function limitarPalabras(input) {
        input.addEventListener("input", function () {
            let palabras = input.value.trim().split(/\s+/);
            if (palabras.length > 2) {
                input.value = palabras.slice(0, 2).join(" ");
            }
        });
    }

    // Validar dirección con solo una coma antes de la última palabra
    function validarDireccion(input, errorElement) {
        input.addEventListener("input", function () {
            let palabras = input.value.trim().split(/\s+/);
            let tieneComa = input.value.includes(",");
            let comaCount = (input.value.match(/,/g) || []).length;

            // Si hay más de una coma, eliminar la última escrita
            if (comaCount > 1) {
                input.value = input.value.substring(0, input.value.lastIndexOf(","));
            }

            // Validar si la coma está bien ubicada
            if (palabras.length >= 2 && (!tieneComa || comaCount > 1)) {
                errorElement.textContent = "Debe haber una sola coma antes de la última palabra.";
                input.setCustomValidity("Debe haber una sola coma antes de la última palabra.");
            } else {
                errorElement.textContent = "";
                input.setCustomValidity("");
            }
        });
    }

    // Validar teléfono (solo números, no iniciar con 0 y formato correcto)
    function validarTelefono(input, errorElement) {
        input.addEventListener("input", function () {
            input.value = input.value.replace(/\D/g, ""); // Eliminar caracteres no numéricos

            // Agregar el guion automáticamente en la posición correcta
            if (input.value.length > 4) {
                input.value = input.value.slice(0, 4) + "-" + input.value.slice(4);
            }

            // Validar formato y restricciones
            if (!/^\d{4}-\d{4}$/.test(input.value)) {
                errorElement.textContent = "Formato: 0000-0000.";
                input.setCustomValidity("Formato: 0000-0000.");
            } else if (/^(0000|0120)-\d{4}$/.test(input.value)) {
                errorElement.textContent = "Número no válido.";
                input.setCustomValidity("Número no válido.");
            } else {
                errorElement.textContent = "";
                input.setCustomValidity("");
            }
        });
    }

    // Obtener los campos y los mensajes de error
    const nombres = document.querySelector("#nombres");
    const apellidos = document.querySelector("#apellidos");
    const direccion = document.querySelector("#direccion");
    const telefono = document.querySelector("#telefono");
    const email = document.querySelector("#email");

    const nombresError = document.querySelector("#nombresError");
    const apellidosError = document.querySelector("#apellidosError");
    const direccionError = document.querySelector("#direccionError");
    const telefonoError = document.querySelector("#telefonoError");
    const emailError = document.querySelector("#emailError");

    // Expresiones regulares
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Aplicar validaciones
    bloquearCaracteresInvalidos(nombres);
    bloquearCaracteresInvalidos(apellidos);
    capitalizarPalabras(nombres);
    capitalizarPalabras(apellidos);
    capitalizarPalabras(direccion);
    limitarPalabras(nombres);
    limitarPalabras(apellidos);
    validarDireccion(direccion, direccionError);
    validarTelefono(telefono, telefonoError);

    // Validación final al enviar el formulario
    form.addEventListener("submit", function (event) {
        if (!form.checkValidity()) {
            event.preventDefault();
        } else {
            modal.hide();
            form.reset();
        }
    });
});


//modal de exito registro
function mostrarSuccessModal(event) {
    // Previene el comportamiento por defecto del enlace
    event.preventDefault();

    let modalElement = document.getElementById("staticBackdrop");
    let successModal = new bootstrap.Modal(modalElement);
    successModal.show();

    // Espera 2 segundos y cierra el modal automáticamente
    setTimeout(() => {
        let modalInstance = bootstrap.Modal.getInstance(modalElement);
        if (modalInstance) {
            modalInstance.hide(); // Cierra el modal correctamente
        }
    }, 2000); // Ahora el tiempo es 2 segundos
}


function incrementar(boton) {
    let producto = boton.closest(".producto");
    let inputNumero = producto.querySelector(".input-numero");
    let valor = parseInt(inputNumero.value);
    if (valor < 50) {
        inputNumero.value = valor + 1;
    }
}

function decrementar(boton) {
    let producto = boton.closest(".producto");
    let inputNumero = producto.querySelector(".input-numero");
    let valor = parseInt(inputNumero.value);
    if (valor > 1) {
        inputNumero.value = valor - 1;
    }
}

function seleccionarTalla(elemento) {
    let producto = elemento.closest(".producto");
    let botonTalla = producto.querySelector(".boton-talla");
    botonTalla.setAttribute("data-talla", elemento.textContent);
}

function actualizarTotalCarrito() {
    let total = 0;
    document.querySelectorAll("#tabla-carrito tbody tr").forEach(row => {
        total += parseFloat(row.cells[6].textContent.replace("$", ""));
    });
    document.querySelector("#total-carrito").textContent = "$" + total.toFixed(2);
}

function agregarAlCarrito(boton) {
    let producto = boton.closest(".producto");
    let nombreProducto = producto.querySelector("p").textContent;
    let precio = producto.querySelector(".precio").textContent;
    let cantidad = producto.querySelector(".input-numero").value;
    let talla = producto.querySelector(".boton-talla").getAttribute("data-talla") || "No seleccionada";
    let sexo = producto.querySelector(".talla:nth-child(2)").textContent.replace("Sexo:", "").trim();
    let imagenSrc = producto.querySelector("img").src;

    let modalBody = document.querySelector("#exampleModal .modal-content");
    let tabla = modalBody.querySelector("#tabla-carrito");
    if (!tabla) {
        tabla = document.createElement("table");
        tabla.id = "tabla-carrito";
        tabla.innerHTML = `
            <thead>
                <tr>
                    <th>Imagen</th>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>Talla</th>
                    <th>Sexo</th>
                    <th>Subtotal</th>
                </tr>
            </thead>
            <tbody></tbody>
        `;
        modalBody.appendChild(tabla);
    }

    let tbody = tabla.querySelector("tbody");
    let filas = tbody.querySelectorAll("tr");
    let productoExistente = Array.from(filas).find(row => row.cells[1].textContent === nombreProducto && row.cells[4].textContent === talla);

    if (productoExistente) {
        let cantidadCelda = productoExistente.cells[2];
        let subtotalCelda = productoExistente.cells[6];
        let nuevaCantidad = parseInt(cantidadCelda.textContent) + parseInt(cantidad);
        cantidadCelda.textContent = nuevaCantidad;
        subtotalCelda.textContent = "$" + (nuevaCantidad * parseFloat(precio.replace("$", ""))).toFixed(2);
    } else {
        let fila = document.createElement("tr");
        let subtotal = (parseFloat(precio.replace("$", "")) * parseInt(cantidad)).toFixed(2);
        fila.innerHTML = `
            <td><img src="${imagenSrc}" alt="${nombreProducto}" style="width: 50px; height: 50px;"></td>
            <td>${nombreProducto}</td>
            <td>${cantidad}</td>
            <td>${precio}</td>
            <td>${talla}</td>
            <td>${sexo}</td>
            <td>$${subtotal}</td>
        `;
        tbody.appendChild(fila);
    }
    actualizarTotalCarrito();
}

document.addEventListener("DOMContentLoaded", function () {
    let modalBody = document.querySelector("#exampleModal .modal-content");
    let totalContainer = document.createElement("div");
    totalContainer.innerHTML = `<strong>Total: <span id="total-carrito">$0.00</span></strong>`;
    modalBody.appendChild(totalContainer);

    let botonesAgregar = document.querySelectorAll(".btn-cesta");
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", function () {
            agregarAlCarrito(this);
        });
    });

    // Agregar evento para el botón de reservación
    document.getElementById("verReserva").addEventListener("click", function () {
        let modalReserva = new bootstrap.Modal(document.getElementById("exampleModalReserva"));
        modalReserva.show();
    });
});


