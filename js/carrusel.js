const carrusel = document.getElementById('carrusel');
    let productos = document.querySelectorAll('.producto');
    let desplazamiento = productos[0].offsetWidth + 20; // El +20 es por el gap
    let moviendo = false;

    // Cada vez que redimensionamos la ventana, recalculamos 'desplazamiento'
    window.addEventListener('resize', () => {
      productos = document.querySelectorAll('.producto');
      desplazamiento = productos[0].offsetWidth + 20;
    });

    function moverCarrusel(direccion) {
      if (moviendo) return;
      moviendo = true;

      if (direccion === 1) {
        // Mover a la izquierda
        carrusel.style.transition = "transform 0.5s ease-in-out";
        carrusel.style.transform = `translateX(-${desplazamiento}px)`;

        setTimeout(() => {
          let primerElemento = carrusel.firstElementChild;
          carrusel.appendChild(primerElemento);
          carrusel.style.transition = "none";
          carrusel.style.transform = "translateX(0)";
          moviendo = false;
        }, 500);
      } else {
        // Mover a la derecha
        let ultimoElemento = carrusel.lastElementChild;
        carrusel.insertBefore(ultimoElemento, carrusel.firstElementChild);
        carrusel.style.transition = "none";
        carrusel.style.transform = `translateX(-${desplazamiento}px)`;

        setTimeout(() => {
          carrusel.style.transition = "transform 0.5s ease-in-out";
          carrusel.style.transform = "translateX(0)";
          moviendo = false;
        }, 20);
      }
    }