document.addEventListener('DOMContentLoaded', () => {

    // --- CONFIGURACIÓN ---
    // ¡¡¡CAMBIA ESTE PIN POR EL QUE QUIERAS!!!
    const PING_CORRECTO = '2023'; 
    const PAGINA_SECRETA = 'carta.html'; // El archivo al que redirigirá
    // -------------------

    const PING_LENGTH = PING_CORRECTO.length;
    const pingDisplay = document.getElementById('ping-display');
    const keypadButtons = document.querySelectorAll('.btn-key[data-number]');
    const deleteBtn = document.getElementById('delete-btn');
    const pingBoard = document.querySelector('.ping-board');

    let pingIngresado = '';

    // Actualiza el display mostrando círculos llenos y vacíos
    function actualizarDisplay() {
        let dots = '●'.repeat(pingIngresado.length);
        let placeholders = '○'.repeat(PING_LENGTH - pingIngresado.length);
        pingDisplay.innerHTML = `<span style="color:#343a40;">${dots}</span><span style="color:#ced4da;">${placeholders}</span>`;
    }

    // Verifica el PIN
    function verificarPing() {
        if (pingIngresado === PING_CORRECTO) {
            // ÉXITO: Redirige a la página de la carta
            document.body.style.transition = "opacity 0.5s ease-out";
            document.body.style.opacity = "0";
            setTimeout(() => {
                window.location.href = PAGINA_SECRETA;
            }, 500);
        } else {
            // ERROR: Anima el tablero y lo resetea
            pingBoard.classList.add('shake');
            pingDisplay.style.backgroundColor = '#f8d7da'; // Color de error de Bootstrap
            
            setTimeout(() => {
                pingBoard.classList.remove('shake');
                pingDisplay.style.backgroundColor = '#f1f3f5';
                pingIngresado = '';
                actualizarDisplay();
            }, 600);
        }
    }

    // Event listener para los botones numéricos
    keypadButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (pingIngresado.length < PING_LENGTH) {
                pingIngresado += button.dataset.number;
                actualizarDisplay();

                if (pingIngresado.length === PING_LENGTH) {
                    setTimeout(verificarPing, 250); // Pequeña pausa para que se vea el último punto
                }
            }
        });
    });

    // Event listener para el botón de borrar
    deleteBtn.addEventListener('click', () => {
        if (pingIngresado.length > 0) {
            pingIngresado = pingIngresado.slice(0, -1);
            actualizarDisplay();
        }
    });

    // Inicializa el display al cargar la página
    actualizarDisplay();
});