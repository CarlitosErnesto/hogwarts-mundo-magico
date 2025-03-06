function cerrarSesion() {
    localStorage.removeItem("authUser");
    window.location.href = "login.html"; // Redirigir al login cuando cierran sesión
}


const regiones = {
    "Guatemala": ["Alta Verapaz", "Baja Verapaz", "Chimaltenango", "Chiquimula", "Escuintla", "Guatemala", "Huehuetenango", "Izabal", "Jalapa", "Jutiapa","El Petén","El Progreso","El Quiché","Quetzaltenango","Retalhuleu","Sacatepéquez","San Marcos","Santa Rosa","Sololá","Suchitepéquez"],
    "Honduras": ["Atlántida", "Choluteca", "Colón", "Comayagua", "Copán", "Cortés", "El Paraíso", "Francisco Morazán", "Gracias a Dios", "Intibucá","Isla de la Bahía","La Paz","Lempira","Ocotepeque","Olancho","Santa Bárbara","Valle","Yoro"],
    "El Salvador": ["Ahuachapán", "Cabañas", "Chalatenango", "Cuscatlán", "La Libertad", "La Paz", "La Unión", "Morazán", "San Miguel", "San Salvador"],
    "Nicaragua": ["Boaco", "Carazo", "Chinandega", "Chontales", "Estelí", "Granada", "Jinotega", "León", "Madriz", "Managua","Masaya","Matagalpa","Nueva Segovia","Rivas","Río San Juan"],
    "Costa Rica": ["San José", "Alajuela", "Cartago", "Heredia", "Guanacaste", "Puntarenas", "Limón"]
};

function selectDestination(pais) {
    document.getElementById("dropdownBtn").textContent = pais;

    let regionBtn = document.getElementById("regionBtn");
    let regionMenu = document.getElementById("regionMenu");

    // Cambia "Departamento" por "Provincia" si el país es Costa Rica
    regionBtn.textContent = (pais === "Costa Rica") ? "Provincia" : "Departamento";

    // Limpiar opciones anteriores
    regionMenu.innerHTML = "";

    // Agregar las regiones según el país seleccionado
    regiones[pais].forEach(region => {
        let li = document.createElement("li");
        let a = document.createElement("a");
        a.classList.add("dropdown-item");
        //a.href = "";
        a.textContent = region;
        a.onclick = function () {
            regionBtn.textContent = region;
        };
        li.appendChild(a);
        regionMenu.appendChild(li);
    });
}