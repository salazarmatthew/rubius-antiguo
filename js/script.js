// ===== Sistema de Contraseña =====
const PASSWORD = "rubius2014"; // Cambia esto por la contraseña que quieras

document.addEventListener('DOMContentLoaded', function() {
    const passwordForm = document.getElementById('password-form');
    const passwordInput = document.getElementById('password-input');
    const passwordError = document.getElementById('password-error');
    const passwordScreen = document.getElementById('password-screen');
    const mainContent = document.getElementById('main-content');

    // Enfocar input al cargar
    if (passwordInput) {
        passwordInput.focus();
    }

    if (passwordForm) {
        passwordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const enteredPassword = passwordInput.value;
            
            if (enteredPassword === PASSWORD) {
                // Contraseña correcta
                passwordScreen.style.animation = 'fadeOut 0.5s ease-in-out';
                
                setTimeout(() => {
                    passwordScreen.style.display = 'none';
                    mainContent.style.display = 'block';
                    
                    // Inicializar funcionalidades después de mostrar contenido
                    initializePage();
                }, 500);
            } else {
                // Contraseña incorrecta
                passwordError.textContent = '❌ Contraseña incorrecta';
                passwordInput.value = '';
                passwordInput.style.animation = 'none';
                passwordInput.offsetHeight; // Trigger reflow
                passwordInput.style.animation = 'shake 0.5s ease-in-out';
                passwordInput.focus();
                
                setTimeout(() => {
                    passwordError.textContent = '';
                }, 3000);
            }
        });
    }
});

// Añadir animación de fadeOut al CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(style);

// Función para inicializar la página después del login
function initializePage() {
    initPagination();
    setupTabListeners();
}

// ===== Fin Sistema de Contraseña =====

// Cambio de pestañas Featured/Browse videos
function setupTabListeners() {
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
}

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

// Sistema de paginación
let currentPage = 1;
const videosPerPage = 12;
let allVideos = [];

function initPagination() {
    // Obtener todos los videos de browse
    allVideos = Array.from(document.querySelectorAll('.browse-videos-grid .browse-video-item'));
    const totalPages = Math.ceil(allVideos.length / videosPerPage);
    
    // Crear botones de paginación dinámicamente
    updatePaginationButtons(totalPages);
    
    // Mostrar primera página
    showPage(1);
}

function showPage(pageNumber, shouldScroll = true) {
    currentPage = pageNumber;
    
    // Primero ocultar TODOS los videos originales para evitar duplicados
    if (originalVideos.length > 0) {
        originalVideos.forEach(video => video.style.display = 'none');
    }
    
    // Luego ocultar todos los videos del array actual
    allVideos.forEach(video => video.style.display = 'none');
    
    // Calcular qué videos mostrar
    const start = (pageNumber - 1) * videosPerPage;
    const end = start + videosPerPage;
    
    // Mostrar solo los videos de esta página
    for (let i = start; i < end && i < allVideos.length; i++) {
        allVideos[i].style.display = 'block';
    }
    
    // Actualizar botones activos
    updateActiveButton();
    
    // Scroll al inicio de la sección solo si se indica
    if (shouldScroll) {
        const grid = document.querySelector('.browse-videos-grid');
        if (grid) {
            grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
}

function changePage(pageNumber) {
    showPage(pageNumber);
}

function nextPage() {
    const totalPages = Math.ceil(allVideos.length / videosPerPage);
    if (currentPage < totalPages) {
        showPage(currentPage + 1);
    }
}

function prevPage() {
    if (currentPage > 1) {
        showPage(currentPage - 1);
    }
}

function updateActiveButton() {
    document.querySelectorAll('.page-btn').forEach(btn => {
        btn.classList.remove('active');
        const btnNumber = parseInt(btn.textContent);
        if (btnNumber === currentPage) {
            btn.classList.add('active');
        }
    });
}

function updatePaginationButtons(totalPages) {
    const paginationDiv = document.querySelector('.pagination');
    if (!paginationDiv) return;
    
    paginationDiv.innerHTML = '';
    
    // Botón anterior
    if (currentPage > 1) {
        const prevBtn = document.createElement('button');
        prevBtn.className = 'page-btn';
        prevBtn.textContent = '← Prev';
        prevBtn.onclick = prevPage;
        paginationDiv.appendChild(prevBtn);
    }
    
    // Si hay pocas páginas (7 o menos), mostrar todas
    if (totalPages <= 7) {
        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement('button');
            btn.className = 'page-btn';
            if (i === currentPage) btn.classList.add('active');
            btn.textContent = i;
            btn.onclick = () => changePage(i);
            paginationDiv.appendChild(btn);
        }
    } else {
        // Para muchas páginas, mostrar con puntos suspensivos
        let lastShown = 0;
        for (let i = 1; i <= totalPages; i++) {
            let showButton = false;
            
            // Siempre mostrar primera página, última página, y páginas cercanas a la actual
            if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
                showButton = true;
            }
            
            if (showButton) {
                // Si hay gap, mostrar puntos suspensivos
                if (lastShown > 0 && i > lastShown + 1) {
                    const dots = document.createElement('span');
                    dots.className = 'page-dots';
                    dots.textContent = '...';
                    paginationDiv.appendChild(dots);
                }
                
                const btn = document.createElement('button');
                btn.className = 'page-btn';
                if (i === currentPage) btn.classList.add('active');
                btn.textContent = i;
                btn.onclick = () => changePage(i);
                paginationDiv.appendChild(btn);
                lastShown = i;
            }
        }
    }
    
    // Botón siguiente
    if (currentPage < totalPages) {
        const nextBtn = document.createElement('button');
        nextBtn.className = 'page-btn next-btn';
        nextBtn.textContent = 'Next →';
        nextBtn.onclick = nextPage;
        paginationDiv.appendChild(nextBtn);
    }
}

// Inicializar paginación cuando se carga la página o se cambia a Browse videos
document.addEventListener('DOMContentLoaded', function() {
    // Esperar un poco para asegurarse de que todo esté cargado
    setTimeout(initPagination, 100);
});

// Re-inicializar cuando se cambia a la pestaña Browse videos
document.querySelectorAll('.channel-tab').forEach(tab => {
    const originalClick = tab.onclick;
    tab.addEventListener('click', function() {
        if (this.textContent.trim() === 'Browse videos') {
            setTimeout(initPagination, 100);
        }
    });
});

// Funcionalidad de búsqueda
let originalVideos = [];
let isFiltered = false;
let searchTimeout = null;

function initSearch() {
    const headerSearchInput = document.getElementById('masthead-search-term');
    const headerSearchBtn = document.getElementById('search-btn');
    
    // Búsqueda al hacer clic en el botón
    if (headerSearchBtn) {
        headerSearchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (searchTimeout) clearTimeout(searchTimeout);
            performSearch(headerSearchInput.value);
        });
    }
    
    // Búsqueda al presionar Enter
    if (headerSearchInput) {
        headerSearchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                if (searchTimeout) clearTimeout(searchTimeout);
                performSearch(this.value);
            }
        });
        
        // Búsqueda en tiempo real con debounce
        headerSearchInput.addEventListener('input', function() {
            const value = this.value;
            
            // Cancelar búsqueda anterior si existe
            if (searchTimeout) {
                clearTimeout(searchTimeout);
            }
            
            // Esperar 300ms después de que el usuario deje de escribir
            searchTimeout = setTimeout(() => {
                performSearch(value);
            }, 300);
        });
    }
}

function performSearch(searchTerm) {
    const term = searchTerm.toLowerCase().trim();
    
    // Cambiar a la pestaña Browse videos si no está activa
    const browseTab = Array.from(document.querySelectorAll('.channel-tab')).find(tab => 
        tab.textContent.trim() === 'Browse videos'
    );
    if (browseTab && !browseTab.classList.contains('active')) {
        browseTab.click();
        setTimeout(() => doSearch(term), 200);
    } else {
        doSearch(term);
    }
}

function doSearch(term) {
    // Asegurarse de que tenemos los videos originales guardados
    if (originalVideos.length === 0 && allVideos.length > 0) {
        originalVideos = [...allVideos];
    }
    
    // Ocultar TODOS los videos originales primero
    originalVideos.forEach(video => video.style.display = 'none');
    
    if (term === '') {
        // Restaurar todos los videos
        allVideos = [...originalVideos];
        isFiltered = false;
    } else {
        // Filtrar videos por título
        allVideos = originalVideos.filter(video => {
            const title = video.querySelector('.browse-video-title');
            if (title) {
                return title.textContent.toLowerCase().includes(term);
            }
            return false;
        });
        isFiltered = true;
    }
    
    // Calcular total de páginas
    const totalPages = Math.ceil(allVideos.length / videosPerPage);
    
    // Siempre mantener la paginación visible
    const pagination = document.querySelector('.pagination');
    if (pagination) {
        pagination.style.display = 'flex';
        pagination.style.minHeight = '50px';
    }
    
    // Si no hay resultados
    if (allVideos.length === 0) {
        const grid = document.querySelector('.browse-videos-grid');
        if (grid) {
            // Mostrar mensaje de no resultados
            let noResults = grid.querySelector('.no-results-message');
            if (!noResults) {
                noResults = document.createElement('div');
                noResults.className = 'no-results-message';
                noResults.style.cssText = 'grid-column: 1/-1; text-align: center; padding: 40px; font-size: 18px; color: #666;';
                noResults.textContent = `No se encontraron videos para "${term}"`;
                grid.appendChild(noResults);
            } else {
                noResults.style.display = 'block';
                noResults.textContent = `No se encontraron videos para "${term}"`;
            }
        }
        
        // Limpiar botones de paginación pero mantener el contenedor
        if (pagination) {
            pagination.innerHTML = '<span style="color: #999; font-size: 14px;">Sin resultados</span>';
        }
    } else {
        // Remover mensaje de no resultados si existe
        const noResults = document.querySelector('.no-results-message');
        if (noResults) noResults.style.display = 'none';
        
        // Actualizar paginación y mostrar página sin scroll
        if (currentPage > totalPages) {
            currentPage = 1;
        }
        updatePaginationButtons(totalPages);
        showPage(currentPage, false); // false para no hacer scroll
    }
}

// Inicializar búsqueda cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        initSearch();
        // Guardar referencia a videos originales después de la inicialización
        setTimeout(() => {
            if (allVideos.length > 0 && originalVideos.length === 0) {
                originalVideos = [...allVideos];
            }
        }, 200);
    }, 100);
});
