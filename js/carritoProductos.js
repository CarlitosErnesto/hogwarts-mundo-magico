document.addEventListener("DOMContentLoaded", function () {
    const btnComprar = document.querySelector(".btn-comprarC"); // Botón de "Comprar"
    const carritoProductos = document.getElementById("carritoProductos"); // Contenedor del carrito

    btnComprar.addEventListener("click", function (event) {
        if (!carritoProductos || carritoProductos.children.length === 0) {
            event.preventDefault(); // Evita que se abra el modal de reserva
            alert("El carrito está vacío. Agrega productos antes de continuar.");
        }
    });
});
