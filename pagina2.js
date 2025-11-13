// Script específico para Página 2
document.addEventListener('DOMContentLoaded', function() {
    // Verificar si hay datos del usuario
    const nombreGuardado = sessionStorage.getItem('nombreUsuario');
    const apellidoGuardado = sessionStorage.getItem('apellidoUsuario');
    const edadGuardada = sessionStorage.getItem('edadUsuario');
    
    if (nombreGuardado && apellidoGuardado) {
        mostrarSaludoPagina2(nombreGuardado, apellidoGuardado);
        
        if (edadGuardada) {
            // Si ya tiene edad guardada, mostrar mensaje
            mostrarMensajeEdad(parseInt(edadGuardada));
            document.getElementById('modal-edad').style.display = 'none';
        } else {
            // Si no tiene edad, mostrar modal
            mostrarModalEdad(nombreGuardado, apellidoGuardado);
        }
    } else {
        // Si no hay datos, redirigir a la página principal
        alert('Por favor, ingresa tus datos en la página principal primero.');
        window.location.href = 'index.html';
    }
    
    // Manejar el formulario de edad
    const formEdad = document.getElementById('form-edad');
    formEdad.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const edad = parseInt(document.getElementById('edad').value);
        
        if (edad && edad > 0 && edad <= 120) {
            // Guardar edad en sessionStorage
            sessionStorage.setItem('edadUsuario', edad);
            
            // Mostrar mensaje según la edad
            mostrarMensajeEdad(edad);
            
            // Ocultar modal
            ocultarModalEdad();
        }
    });
});

// Función para mostrar el saludo en página 2
function mostrarSaludoPagina2(nombre, apellido) {
    const mensajeUsuario = document.getElementById('mensaje-usuario-p2');
    const tituloPagina = document.getElementById('titulo-pagina2');
    
    tituloPagina.textContent = `Galería de Imágenes - Bienvenido ${nombre}`;
    mensajeUsuario.textContent = `${nombre} ${apellido}`;
}

// Función para mostrar el modal de edad
function mostrarModalEdad(nombre, apellido) {
    const modal = document.getElementById('modal-edad');
    const saludoNombre = document.getElementById('saludo-nombre');
    
    saludoNombre.textContent = `Hola ${nombre} ${apellido}`;
    modal.style.display = 'flex';
}

// Función para ocultar el modal de edad
function ocultarModalEdad() {
    const modal = document.getElementById('modal-edad');
    modal.style.animation = 'fadeOut 0.3s ease-out';
    
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// Función para mostrar mensaje según la edad
function mostrarMensajeEdad(edad) {
    const mensajeEdad = document.getElementById('mensaje-edad');
    
    if (edad > 20) {
        mensajeEdad.innerHTML = `
            <strong>Edad: ${edad} años</strong><br>
            ✅ Eres mayor de 20 años
        `;
        mensajeEdad.style.background = 'rgba(76, 175, 80, 0.2)';
        mensajeEdad.style.color = '#2e7d32';
    } else {
        mensajeEdad.innerHTML = `
            <strong>Edad: ${edad} años</strong><br>
            ℹ️ Eres menor o igual a 20 años
        `;
        mensajeEdad.style.background = 'rgba(33, 150, 243, 0.2)';
        mensajeEdad.style.color = '#1565c0';
    }
    
    mensajeEdad.style.display = 'block';
}

// Añadir efectos de sonido o feedback visual al hover (opcional)
document.addEventListener('DOMContentLoaded', function() {
    const galeriaItems = document.querySelectorAll('.galeria-item');
    
    galeriaItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.4)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
        });
    });
});