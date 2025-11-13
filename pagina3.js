// Script específico para Página 3
document.addEventListener('DOMContentLoaded', function() {
    // Verificar si hay datos del usuario
    const nombreGuardado = sessionStorage.getItem('nombreUsuario');
    const apellidoGuardado = sessionStorage.getItem('apellidoUsuario');
    
    if (nombreGuardado && apellidoGuardado) {
        mostrarSaludoPagina3(nombreGuardado, apellidoGuardado);
    } else {
        // Si no hay datos, redirigir a la página principal
        alert('Por favor, ingresa tus datos en la página principal primero.');
        window.location.href = 'index.html';
    }
    
    // Agregar efecto de hover interactivo a las celdas
    agregarEfectosTabla();
    
    // Animar las estadísticas al hacer scroll
    animarEstadisticas();
});

// Función para mostrar el saludo en página 3
function mostrarSaludoPagina3(nombre, apellido) {
    const mensajeUsuario = document.getElementById('mensaje-usuario-p3');
    const tituloPagina = document.getElementById('titulo-pagina3');
    
    tituloPagina.textContent = `Tabla de Información - ${nombre}`;
    mensajeUsuario.textContent = `Bienvenido ${nombre} ${apellido}`;
}

// Función para agregar efectos interactivos a la tabla
function agregarEfectosTabla() {
    const filas = document.querySelectorAll('.fila-datos');
    
    filas.forEach((fila, index) => {
        // Efecto de resaltado al hacer clic
        fila.addEventListener('click', function() {
            // Remover clase activa de todas las filas
            filas.forEach(f => f.classList.remove('fila-activa'));
            
            // Agregar clase activa a la fila clickeada
            this.classList.add('fila-activa');
            
            // Obtener datos de la fila
            const celdas = this.querySelectorAll('td');
            const nombre = celdas[0].textContent;
            const edad = celdas[1].textContent;
            const promedio = celdas[2].textContent;
            
            // Mostrar información adicional (opcional)
            console.log(`Seleccionado: ${nombre}, Edad: ${edad}, Promedio: ${promedio}`);
        });
        
        // Efecto de color alternado mejorado
        if (index % 2 === 0) {
            fila.style.backgroundColor = 'rgba(245, 247, 250, 0.5)';
        }
    });
    
    // Agregar efecto a las celdas individuales
    const celdas = document.querySelectorAll('.tabla-animada td');
    celdas.forEach(celda => {
        celda.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.fontWeight = '700';
        });
        
        celda.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            if (!this.closest('tr').matches(':hover')) {
                this.style.fontWeight = '400';
            }
        });
    });
}

// Función para animar las estadísticas
function animarEstadisticas() {
    const statNumeros = document.querySelectorAll('.stat-numero');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animarNumero(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumeros.forEach(numero => {
        observer.observe(numero);
    });
}

// Función para animar números contadores
function animarNumero(elemento) {
    const valorFinal = parseFloat(elemento.textContent);
    const duracion = 1500; // 1.5 segundos
    const pasos = 60;
    const incremento = valorFinal / pasos;
    let valorActual = 0;
    let contador = 0;
    
    const intervalo = setInterval(() => {
        valorActual += incremento;
        contador++;
        
        if (contador >= pasos) {
            elemento.textContent = valorFinal;
            clearInterval(intervalo);
        } else {
            elemento.textContent = valorActual.toFixed(2);
        }
    }, duracion / pasos);
}

// Agregar estilos dinámicos para la fila activa
const style = document.createElement('style');
style.textContent = `
    .fila-activa {
        background: linear-gradient(90deg, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.3) 100%) !important;
        border-left: 4px solid #667eea;
        transform: scale(1.02) !important;
    }
    
    .fila-activa td {
        color: #667eea !important;
        font-weight: 600 !important;
    }
`;
document.head.appendChild(style);

// Efecto de partículas en los encabezados (opcional y sutil)
document.addEventListener('DOMContentLoaded', function() {
    const headers = document.querySelectorAll('.header-animado');
    
    headers.forEach(header => {
        header.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        header.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});