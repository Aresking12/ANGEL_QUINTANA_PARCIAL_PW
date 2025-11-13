// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Verificar si el usuario ya ingresó sus datos
    const nombreGuardado = sessionStorage.getItem('nombreUsuario');
    const apellidoGuardado = sessionStorage.getItem('apellidoUsuario');
    
    if (nombreGuardado && apellidoGuardado) {
        // Si ya hay datos guardados, mostrar bienvenida personalizada
        mostrarBienvenida(nombreGuardado, apellidoGuardado);
        ocultarModal();
    } else {
        // Si no hay datos, mostrar el modal
        mostrarModal();
    }
    
    // Manejar el envío del formulario
    const form = document.getElementById('form-usuario');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nombre = document.getElementById('nombre').value.trim();
        const apellido = document.getElementById('apellido').value.trim();
        
        if (nombre && apellido) {
            // Guardar en sessionStorage
            sessionStorage.setItem('nombreUsuario', nombre);
            sessionStorage.setItem('apellidoUsuario', apellido);
            
            // Mostrar bienvenida personalizada
            mostrarBienvenida(nombre, apellido);
            
            // Ocultar modal con animación
            ocultarModal();
        }
    });
});

// Función para mostrar la bienvenida personalizada
function mostrarBienvenida(nombre, apellido) {
    const mensajeUsuario = document.getElementById('mensaje-usuario');
    const tituloBienvenida = document.getElementById('titulo-bienvenida');
    
    // Actualizar el título
    tituloBienvenida.textContent = `¡Bienvenido, ${nombre} ${apellido}!`;
    
    // Mostrar mensaje adicional
    mensajeUsuario.textContent = `Nos alegra tenerte aquí`;
    mensajeUsuario.style.display = 'block';
}

// Función para mostrar el modal
function mostrarModal() {
    const modal = document.getElementById('modal-bienvenida');
    modal.style.display = 'flex';
}

// Función para ocultar el modal
function ocultarModal() {
    const modal = document.getElementById('modal-bienvenida');
    modal.style.animation = 'fadeOut 0.3s ease-out';
    
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// Función para navegar a otras páginas
function irAPagina(url) {
    // Agregar animación antes de navegar
    document.body.style.animation = 'fadeOut 0.3s ease-out';
    
    setTimeout(() => {
        window.location.href = url;
    }, 300);
}

// Agregar animación de fadeOut al CSS dinámicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Validación en tiempo real de los campos
document.addEventListener('DOMContentLoaded', function() {
    const nombreInput = document.getElementById('nombre');
    const apellidoInput = document.getElementById('apellido');
    
    if (nombreInput && apellidoInput) {
        // Validar que solo se ingresen letras y espacios
        [nombreInput, apellidoInput].forEach(input => {
            input.addEventListener('input', function(e) {
                this.value = this.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
            });
        });
    }
});