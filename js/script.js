// Cambio de pestañas Featured/Browse videos
document.querySelectorAll('.channel-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        // Remover active de todas las pestañas
        document.querySelectorAll('.channel-tab').forEach(t => t.classList.remove('active'));
        // Agregar active a la pestaña clickeada
        this.classList.add('active');
        
        // Mostrar/ocultar contenido
        if (this.textContent.trim() === 'Featured') {
            document.getElementById('featured-content').style.display = 'block';
            document.getElementById('browse-videos-content').style.display = 'none';
        } else {
            document.getElementById('featured-content').style.display = 'none';
            document.getElementById('browse-videos-content').style.display = 'block';
        }
    });
});

// Cambio de sub-pestañas en Browse videos
document.querySelectorAll('.browse-subtab').forEach(subtab => {
    subtab.addEventListener('click', function() {
        document.querySelectorAll('.browse-subtab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
    });
});
