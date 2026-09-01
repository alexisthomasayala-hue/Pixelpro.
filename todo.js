document.addEventListener("DOMContentLoaded", function() {

    // ==========================================
    // 1. MOSTRAR MENSAJE O ALERTA (SOLO LA PRIMERA VEZ EN LA SESIÓN)
    // ==========================================
    if (!sessionStorage.getItem('alertaMostrada')) {
        alert("¡Bienvenido a PixelPro🎮! Disfruta de la experiencia.");
        sessionStorage.setItem('alertaMostrada', 'true');
    }


    // ==========================================
    // 2 & 7. VALIDACIÓN DE FORMULARIOS Y RESUMEN PREVIO
    // ==========================================
    const form = document.getElementById('formRegistro');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Evita que se recargue o busque una ruta externa

            const nombre = document.getElementById('nombre');
            const email = document.getElementById('email');
            const password = document.getElementById('password');
            const terminos = document.getElementById('terminos');

            const errorNombre = document.getElementById('errorNombre');
            const errorEmail = document.getElementById('errorEmail');
            const errorPassword = document.getElementById('errorPassword');
            const errorTerminos = document.getElementById('errorTerminos');
            const contenedorResumen = document.getElementById('contenedorResumen');

            let esValido = true;

            // Limpiar errores previos
            if (errorNombre) errorNombre.textContent = '';
            if (errorEmail) errorEmail.textContent = '';
            if (errorPassword) errorPassword.textContent = '';
            if (errorTerminos) errorTerminos.textContent = '';

            // Validar campos vacíos
            if (nombre && nombre.value.trim() === '') {
                errorNombre.textContent = 'Por favor, ingresa tu nombre completo.';
                esValido = false;
            }

            // Validar correo no vacío y formato correcto
            if (email && email.value.trim() === '') {
                errorEmail.textContent = 'El correo electrónico es obligatorio.';
                esValido = false;
            } else if (email) {
                const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!formatoEmail.test(email.value)) {
                    errorEmail.textContent = 'Ingresa un formato de correo válido (ej: usuario@correo.com).';
                    esValido = false;
                }
            }

            // Validar contraseña vacía
            if (password && password.value.trim() === '') {
                errorPassword.textContent = 'La contraseña no puede estar vacía.';
                esValido = false;
            }

            // Validar términos y condiciones
            if (terminos && !terminos.checked) {
                errorTerminos.textContent = 'Debes aceptar los términos y condiciones.';
                esValido = false;
            }

            // Si todo es válido, mostramos el resumen antes de guardar
            if (esValido) {
                const fechaNac = document.getElementById('fecha_nacimiento') ? document.getElementById('fecha_nacimiento').value : 'No especificada';
                const generoSeleccionado = document.querySelector('input[name="genero"]:checked') ? document.querySelector('input[name="genero"]:checked').value : 'No especificado';

                if (contenedorResumen) {
                    contenedorResumen.innerHTML = `
                        <div style="background: rgba(0,0,0,0.05); padding: 15px; border-radius: 5px; margin-top: 15px;">
                            <h3>Resumen de tus datos:</h3>
                            <p><strong>Nombre:</strong> ${nombre.value}</p>
                            <p><strong>Correo:</strong> ${email.value}</p>
                            <p><strong>Fecha de Nacimiento:</strong> ${fechaNac}</p>
                            <p><strong>Género:</strong> ${generoSeleccionado}</p>
                            <button type="button" id="confirmarEnvio" style="background: #4bb543; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; margin-top: 10px;">Confirmar y Guardar</button>
                        </div>
                    `;
                    contenedorResumen.style.display = 'block';

                    // Acción al confirmar el resumen (Guarda en LocalStorage de forma simulada)
                    document.getElementById('confirmarEnvio').addEventListener('click', function() {
                        const datosUsuario = {
                            nombre: nombre.value,
                            email: email.value,
                            fechaNacimiento: fechaNac,
                            genero: generoSeleccionado
                        };
                        localStorage.setItem('usuarioRegistrado', JSON.stringify(datosUsuario));
                        alert('¡Datos guardados con éxito en el navegador!');
                        form.reset();
                        contenedorResumen.style.display = 'none';
                    });
                } else {
                    alert('¡Formulario validado con éxito!');
                }
            }
        });
    }


    // ==========================================
    // 3. FECHA Y HORA EN TIEMPO REAL
    // ==========================================
    const relojElemento = document.getElementById('reloj');
    if (relojElemento) {
        setInterval(() => {
            const ahora = new Date();
            relojElemento.textContent = ahora.toLocaleDateString() + ' - ' + ahora.toLocaleTimeString();
        }, 1000);
    }


    // ==========================================
    // 4. MENÚS INTERACTIVOS (Acordeón o Desplegable)
    // ==========================================
    const botonesAcordeon = document.querySelectorAll('.accordion-btn');
    botonesAcordeon.forEach(boton => {
        boton.addEventListener('click', function() {
            this.classList.toggle('activo');
            const contenido = this.nextElementSibling;
            if (contenido) {
                if (contenido.style.display === 'block') {
                    contenido.style.display = 'none';
                } else {
                    contenido.style.display = 'block';
                }
            }
        });
    });


    // ==========================================
    // 5. GALERÍA DE IMÁGENES (Zoom + Siguiente / Anterior)
    // ==========================================
    const imagenesGaleria = document.querySelectorAll('.galeria-img');
    const modalZoom = document.getElementById('modalZoom');
    const imagenAmpliada = document.getElementById('imagenAmpliada');
    let indiceActual = 0;

    if (imagenesGaleria.length > 0 && modalZoom && imagenAmpliada) {
        imagenesGaleria.forEach((img, index) => {
            img.addEventListener('click', () => {
                indiceActual = index;
                imagenAmpliada.src = img.src;
                modalZoom.style.display = 'flex';
            });
        });

        const btnSiguiente = document.getElementById('btnSiguiente');
        const btnAnterior = document.getElementById('btnAnterior');

        if (btnSiguiente) {
            btnSiguiente.addEventListener('click', () => {
                indiceActual = (indiceActual + 1) % imagenesGaleria.length;
                imagenAmpliada.src = imagenesGaleria[indiceActual].src;
            });
        }

        if (btnAnterior) {
            btnAnterior.addEventListener('click', () => {
                indiceActual = (indiceActual - 1 + imagenesGaleria.length) % imagenesGaleria.length;
                imagenAmpliada.src = imagenesGaleria[indiceActual].src;
            });
        }

        modalZoom.addEventListener('click', (e) => {
            if (e.target === modalZoom) {
                modalZoom.style.display = 'none';
            }
        });
    }


    // ==========================================
    // 6. CAMBIAR TEMA DE LA PÁGINA (Modo Oscuro Toggle)
    // ==========================================
    const interruptorTema = document.getElementById('modoOscuroToggle');
    
    if (localStorage.getItem('temaOscuro') === 'activo') {
        document.body.classList.add('dark-mode');
        if (interruptorTema) interruptorTema.checked = true;
    }

    if (interruptorTema) {
        interruptorTema.addEventListener('change', function() {
            if (this.checked) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('temaOscuro', 'activo');
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('temaOscuro', 'inactivo');
            }
        });
    }
});