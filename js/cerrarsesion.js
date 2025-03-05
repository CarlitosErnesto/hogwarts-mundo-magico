function cerrarSesion() {
    localStorage.removeItem("authUser");
    window.location.href = "login.html"; // Redirigir al login cuando cierran sesión
}