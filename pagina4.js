// Script específico para Página 4 - Calculadora
document.addEventListener('DOMContentLoaded', function() {
    // Verificar si hay datos del usuario
    const nombreGuardado = sessionStorage.getItem('nombreUsuario');
    const apellidoGuardado = sessionStorage.getItem('apellidoUsuario');
    
    if (nombreGuardado && apellidoGuardado) {
        mostrarSaludoPagina4(nombreGuardado, apellidoGuardado);
    } else {
        // Si no hay datos, redirigir a la página principal
        alert('Por favor, ingresa tus datos en la página principal primero.');
        window.location.href = 'index.html';
    }
    
    // Cargar historial si existe
    cargarHistorial();
});

// Función para mostrar el saludo en página 4
function mostrarSaludoPagina4(nombre, apellido) {
    const mensajeUsuario = document.getElementById('mensaje-usuario-p4');
    const tituloPagina = document.getElementById('titulo-pagina4');
    
    tituloPagina.textContent = `Calculadora de Operaciones`;
    mensajeUsuario.textContent = `Bienvenido ${nombre} ${apellido}`;
}

// Función principal para realizar operaciones
function realizarOperacion(tipoOperacion) {
    // Solicitar el primer número
    let numero1 = prompt('Ingrese el primer número:');
    
    // Validar que se ingresó algo
    if (numero1 === null) {
        return; // Usuario canceló
    }
    
    // Convertir a número
    numero1 = parseFloat(numero1);
    
    // Validar que es un número válido
    if (isNaN(numero1)) {
        alert('Error: Debe ingresar un número válido');
        return;
    }
    
    // Solicitar el segundo número
    let numero2 = prompt('Ingrese el segundo número:');
    
    // Validar que se ingresó algo
    if (numero2 === null) {
        return; // Usuario canceló
    }
    
    // Convertir a número
    numero2 = parseFloat(numero2);
    
    // Validar que es un número válido
    if (isNaN(numero2)) {
        alert('Error: Debe ingresar un número válido');
        return;
    }
    
    // Realizar el cálculo según el tipo de operación
    let resultado;
    let operacionTexto;
    let calculoDetalle;
    
    switch(tipoOperacion) {
        case 'suma':
            resultado = numero1 + numero2;
            operacionTexto = 'SUMA';
            calculoDetalle = `${numero1} + ${numero2} = ${resultado}`;
            break;
            
        case 'division':
            // Validar división por cero
            if (numero2 === 0) {
                alert('Error: No se puede dividir por cero');
                return;
            }
            resultado = numero1 / numero2;
            operacionTexto = 'DIVISIÓN';
            calculoDetalle = `${numero1} ÷ ${numero2} = ${resultado.toFixed(4)}`;
            break;
            
        case 'promedio':
            resultado = (numero1 + numero2) / 2;
            operacionTexto = 'PROMEDIO';
            calculoDetalle = `(${numero1} + ${numero2}) ÷ 2 = ${resultado.toFixed(2)}`;
            break;
            
        default:
            alert('Operación no válida');
            return;
    }
    
    // Mostrar el resultado en el panel
    mostrarResultado(operacionTexto, calculoDetalle, resultado, numero1, numero2);
    
    // Agregar al historial
    agregarAlHistorial(operacionTexto, numero1, numero2, resultado);
}

// Función para mostrar el resultado en el panel
function mostrarResultado(operacion, detalle, resultado, num1, num2) {
    const panel = document.getElementById('panel-resultados');
    const operacionRealizada = document.getElementById('operacion-realizada');
    const calculoDetalle = document.getElementById('calculo-detalle');
    const resultadoFinal = document.getElementById('resultado-final');
    
    // Actualizar contenido
    operacionRealizada.innerHTML = `<strong>Operación:</strong> ${operacion}`;
    calculoDetalle.innerHTML = `<strong>Cálculo:</strong> ${detalle}`;
    resultadoFinal.textContent = `Resultado: ${typeof resultado === 'number' ? resultado.toFixed(2) : resultado}`;
    
    // Mostrar panel con animación
    panel.style.display = 'block';
    panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Función para cerrar el panel de resultados
function cerrarResultado() {
    const panel = document.getElementById('panel-resultados');
    panel.style.animation = 'fadeOut 0.3s ease';
    
    setTimeout(() => {
        panel.style.display = 'none';
        panel.style.animation = '';
    }, 300);
}

// Función para agregar operación al historial
function agregarAlHistorial(operacion, num1, num2, resultado) {
    // Obtener historial actual
    let historial = JSON.parse(localStorage.getItem('historialCalculadora')) || [];
    
    // Crear nueva entrada
    const nuevaEntrada = {
        operacion: operacion,
        numero1: num1,
        numero2: num2,
        resultado: typeof resultado === 'number' ? resultado.toFixed(2) : resultado,
        fecha: new Date().toLocaleString('es-ES')
    };
    
    // Agregar al inicio del historial
    historial.unshift(nuevaEntrada);
    
    // Limitar a 10 entradas
    if (historial.length > 10) {
        historial = historial.slice(0, 10);
    }
    
    // Guardar en localStorage
    localStorage.setItem('historialCalculadora', JSON.stringify(historial));
    
    // Actualizar visualización
    mostrarHistorial();
}

// Función para cargar historial al cargar la página
function cargarHistorial() {
    mostrarHistorial();
}

// Función para mostrar el historial
function mostrarHistorial() {
    const historialLista = document.getElementById('historial-lista');
    const historial = JSON.parse(localStorage.getItem('historialCalculadora')) || [];
    
    if (historial.length === 0) {
        historialLista.innerHTML = '<p class="historial-vacio">No hay operaciones realizadas aún</p>';
        return;
    }
    
    let html = '';
    historial.forEach((entrada, index) => {
        html += `
            <div class="historial-item" style="animation-delay: ${index * 0.1}s">
                <p><strong>${entrada.operacion}</strong></p>
                <p>Números: ${entrada.numero1} y ${entrada.numero2}</p>
                <p>Resultado: <strong>${entrada.resultado}</strong></p>
                <p class="hora">${entrada.fecha}</p>
            </div>
        `;
    });
    
    historialLista.innerHTML = html;
}

// Función para limpiar el historial
function limpiarHistorial() {
    if (confirm('¿Estás seguro de que deseas limpiar todo el historial?')) {
        localStorage.removeItem('historialCalculadora');
        mostrarHistorial();
        alert('Historial limpiado correctamente');
    }
}

// Agregar efecto visual a los botones de operación
document.addEventListener('DOMContentLoaded', function() {
    const botonesOperacion = document.querySelectorAll('.btn-operacion');
    
    botonesOperacion.forEach(boton => {
        boton.addEventListener('click', function() {
            // Efecto de pulso al hacer clic
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 100);
        });
    });
    
    // Agregar efecto a las filas de la tabla
    const filasOperacion = document.querySelectorAll('.fila-operacion');
    filasOperacion.forEach((fila, index) => {
        fila.style.opacity = '0';
        fila.style.animation = `fadeInUp 0.6s ease forwards ${index * 0.1}s`;
    });
});