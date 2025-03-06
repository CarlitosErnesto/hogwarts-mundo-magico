document.addEventListener("DOMContentLoaded", function () {
    const inputDireccion = document.getElementById("input-direccionreserva");
    const direccionError = document.getElementById("direccionError");

    // Ejecuta la validación en cada entrada de texto
    inputDireccion.addEventListener("input", validateReservaDireccion);

    function validateReservaDireccion() {
        let address = inputDireccion.value.trim();

        // Expresión regular para validar caracteres permitidos
        let addressRegex = /^[A-Za-z0-9áéíóúÁÉÍÓÚñÑ#.,\s-]+$/;

        if (address.length < 5) {
            direccionError.textContent = "La dirección debe tener al menos 5 caracteres.";
            direccionError.style.color = "red";
        } else if (address.length > 100) {
            direccionError.textContent = "La dirección no debe superar los 100 caracteres.";
            direccionError.style.color = "red";
        } else if (!addressRegex.test(address)) {
            direccionError.textContent = "Usa solo letras, números y los caracteres # , . -";
            direccionError.style.color = "red";
        } else {
            direccionError.textContent = ""; // Oculta el mensaje si la dirección es válida
        }
    }
});


///////////////////////////////////////////////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", function () {
    const inputTelefono = document.getElementById("input-telefono");
    const telefonoError = document.getElementById("telefonoError");
    const dropdownPais = document.getElementById("dropdownBtn"); // Botón de país

    // Definir códigos de país y validaciones
    const paises = {
        "Guatemala": { codigo: "+502", regex: /^[3-7]\d{3}-\d{4}$/, inicio: "3, 4, 5, 6 o 7" },
        "El Salvador": { codigo: "+503", regex: /^[6-7]\d{3}-\d{4}$/, inicio: "6 o 7" },
        "Honduras": { codigo: "+504", regex: /^[2-9]\d{3}-\d{4}$/, inicio: "2 a 9" },
        "Nicaragua": { codigo: "+505", regex: /^[5-8]\d{3}-\d{4}$/, inicio: "5, 6, 7 u 8" },
        "Costa Rica": { codigo: "+506", regex: /^[2-8]\d{3}-\d{4}$/, inicio: "2 a 8" }
    };

    let codigoSeleccionado = "+502"; // Valor inicial para Guatemala
    let prefijoPermitido = "3, 4, 5, 6 o 7"; // Prefijo inicial permitido para Guatemala

    // Función para cambiar el código según el país seleccionado
    function selectDestination(pais) {
        if (paises[pais]) {
            codigoSeleccionado = paises[pais].codigo;
            prefijoPermitido = paises[pais].inicio;
            inputTelefono.value = codigoSeleccionado + " ";
            telefonoError.textContent = "";
        }
    }

    // Evento para formatear y validar el número mientras se escribe
    inputTelefono.addEventListener("input", function (e) {
        let valor = inputTelefono.value.replace(/[^\d]/g, ""); // Eliminar caracteres no numéricos
        let codigoSinSigno = codigoSeleccionado.replace("+", ""); // Código sin "+"
        let numero = valor.replace(codigoSinSigno, ""); // Eliminar el código del número

        if (numero.length > 8) {
            numero = numero.slice(0, 8); // Limitar a 8 dígitos
        }

        // Insertar guion después de los primeros 4 dígitos
        if (numero.length > 4) {
            numero = numero.slice(0, 4) + "-" + numero.slice(4);
        }

        inputTelefono.value = codigoSeleccionado + " " + numero;

        // Validación del número según el país
        let paisSeleccionado = Object.keys(paises).find(p => paises[p].codigo === codigoSeleccionado);
        if (paisSeleccionado) {
            let regex = paises[paisSeleccionado].regex;
            let prefijoCorrecto = paises[paisSeleccionado].inicio;

            if (!regex.test(numero)) {
                telefonoError.textContent = `Formato incorrecto. Debe ser ${codigoSeleccionado} XXXX-XXXX y empezar con ${prefijoCorrecto}.`;
            } else {
                telefonoError.textContent = "";
            }
        }
    });

    // Simulación de la selección de país (debe estar enlazado con tu dropdown real)
    document.querySelectorAll(".dropdown-item").forEach(item => {
        item.addEventListener("click", function () {
            selectDestination(this.textContent.trim());
        });
    });
});

////////////////////////////////////////////////////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", function () {
    const divMetodoPago = document.getElementById("metodopago");
    const paisNombre = document.getElementById("paisNombre");
    const encomendistaNombre = document.getElementById("encomendistaNombre");
    const precioEncomendista = document.getElementById("precioEncomendista");

    // Definir encomendistas con nombres y precios
    const encomendistas = {
        "Guatemala": { nombre: "Comercializadora La Estrella del Pacífico", precio: 25.00 },
        "El Salvador": { nombre: "Compañía de Comercio El Águila Real", precio: 22.50 },
        "Honduras": { nombre: "Servicios Logísticos Atlántico", precio: 18.75 },
        "Nicaragua": { nombre: "Exportadora Mar de Oro", precio: 20.00 },
        "Costa Rica": { nombre: "Conexiones Globales del Caribe", precio: 15.50 }
    };

    // Evento para cambiar el método de pago según el país seleccionado
    function selectDestination(pais) {
        // Asignar el nombre del encomendista y el precio al div de método de pago
        if (encomendistas[pais]) {
            let encomendista = encomendistas[pais];
            paisNombre.textContent = pais;  // Mostrar el país
            encomendistaNombre.textContent = encomendista.nombre;  // Mostrar el nombre del encomendista
            precioEncomendista.innerHTML = `<span class="price">$${encomendista.precio.toFixed(2)}</span>`;  // Mostrar el precio en negrita y grande
        }
    }

    // Simulación de la selección de país (esto debería estar enlazado con el dropdown real)
    document.querySelectorAll(".dropdown-item").forEach(item => {
        item.addEventListener("click", function () {
            selectDestination(this.textContent.trim());
        });
    });
});
