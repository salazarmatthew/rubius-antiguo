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
        
        const categoriesSection = document.querySelector('.categories-section');
        const moreSection = document.querySelector('.more-section');
        const commentsSection = document.querySelector('.comments-section');
        const videosGrid = document.querySelector('.browse-videos-grid');
        const tabText = this.textContent.trim();
        
        if (tabText === 'Playlists') {
            // Mostrar categorías, ocultar lo demás
            categoriesSection.style.display = 'block';
            moreSection.style.display = 'none';
            commentsSection.style.display = 'none';
            videosGrid.style.display = 'none';
            updateCategoryCounts();
        } else if (tabText.startsWith('More')) {
            // Mostrar sección More, ocultar lo demás
            categoriesSection.style.display = 'none';
            moreSection.style.display = 'block';
            commentsSection.style.display = 'none';
            videosGrid.style.display = 'none';
        } else if (tabText === 'Comments') {
            // Mostrar sección Comments, ocultar lo demás
            categoriesSection.style.display = 'none';
            moreSection.style.display = 'none';
            commentsSection.style.display = 'block';
            videosGrid.style.display = 'none';
        } else {
            // Mostrar videos, ocultar lo demás
            categoriesSection.style.display = 'none';
            moreSection.style.display = 'none';
            commentsSection.style.display = 'none';
            videosGrid.style.display = 'grid';
            // Restaurar todos los videos si estaban filtrados
            if (isFiltered) {
                showAllVideos();
            }
        }
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
    
    // Mostrar todas las páginas
    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.className = 'page-btn';
        if (i === currentPage) btn.classList.add('active');
        btn.textContent = i;
        btn.onclick = () => changePage(i);
        paginationDiv.appendChild(btn);
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
        assignVideoCategories();
        setupCategoryFilters();
        // Guardar referencia a videos originales después de la inicialización
        setTimeout(() => {
            if (allVideos.length > 0 && originalVideos.length === 0) {
                originalVideos = [...allVideos];
            }
        }, 200);
    }, 100);
});

// ===== Sistema de Categorías =====
const videoCategories = {
    "El Reto De La Canela Es Para Vagiinas": "CHALLENGE",
    "After Effects - Desert Eagle First Test": "",
    "100 MANERAS DE MATAR A JUSTIN BIEBER | Happy Wheels ep. 7 |": "GAYPLAYS",
    "MEGAMIX | JUEGOS DE TERROR | Mejores sustos y partes GRASIOSAS": "THE BEST OF RUBIUS",
    "Sims 3 | NUEVA CASA Y LIGANDO LIKE OLD TIMES | Gordo y Follador a los 40 | ep.12": "GAYPLAYS",
    "SKYRIM NO ME QUIERE :'| Gameplay COD | 82 Moabs | PARTIDAZA!!! (NO)": "GAYPLAYS",
    "CHATROULETTE | HOMBRES CON TETAAS Y MAS HAMIJOS Ep. 2": "CHATTROULETTE",
    "Sims 3 | BARCOS Y BITCHES IN DA CITY | Gordo y Follador a los 40 | ep.13": "GAYPLAYS",
    "Chatroulette | EL TROLL SIENDO TROLEADO Y NUEVOS HAMIJOS! | Ep. 3": "CHATTROULETTE",
    "Haunt | SLENDER CON GRAFICAZOS Y CABALLOS EXCITADOS IN DA HOUSE": "GAYPLAYS",
    "GTA IV | SPIDERMAN Y SU PERRO TIMMY IN THE CITY | w/ Mangel": "GAYPLAYS",
    "Scribblenauts | NO LE TOQUES LAS PELOTAS A DIOS | Ep. 2": "GAYPLAYS",
    "Chatroulette | ENSEÑANDO ESPAÑOL A GUIRIS Y TETAS EVERYWHERE | Ep. 5": "CHATTROULETTE",
    "UN DIA NORMAL EN EL PARQUE": "VLOG",
    "ULTRA MEGA TARTAS SUPER ESPECIAL | 2 MILLONES": "THE BEST OF RUBIUS",
    "HAY QUE AMPUTAR! | Meet The Rubius": "THE BEST OF RUBIUS",
    "LOS DIOSES DEL BAILE | Just Dance 2014 con HEMBRAS": "THE BEST OF RUBIUS,CHALLENGE",
    "COCHES, INFECTADOS Y MOAR HEMBRAS | The Crew / The Division": "GAYPLAYS",
    "SOY UN ABUSÓN... Y ME ENCANTA | Bully": "GAYPLAYS",
    "SOY UN DINOSAURIO | Primal Carnage": "GAYPLAYS",
    "LLORANDO COMO UNA NENA | Alone in The Rift": "GAYPLAYS",
    "SOY LIBREEEE... A NO SER | Outlast | Ep. 5": "GAYPLAYS",
    "LA CONSPIRACION DEL CLON | GTA V | RANDOM Online": "GAYPLAYS",
    "MONTAJE ULTRAMIX TERROR 2013 | Especial Halloween": "THE BEST OF RUBIUS",
    "TRES RETARDS EN LONDRES": "VLOG",
    "Troll en Chatroulette | THE TROLL IS BACK": "CHATTROULETTE",
    "SIMULADOR DE CABRA EXTREMA 2014": "GAYPLAYS",
    "LA GRAN BUSQUEDA DE MI PENE": "GAYPLAYS",
    "SIMULADOR DE NYAN CAT CABRA": "GAYPLAYS",
    "INCOMODANDO A GENTE EN LA PIZZERIA | Camara Oculta": "VLOG,CHALLENGE",
    "VICTORIA LEGENDARIA | JUEGOS DEL HAMBRE": "VLOG",
    "EL PIANISTA QUE ESCAPÓ DE PEDOBEAR | GMOD RANDOM": "GAYPLAYS",
    "HACKEANDO POR LA JUSTICIA! | Watch Dogs PS4": "THE BEST OF RUBIUS",
    "EL LIBRO TROLL": "THE BEST OF RUBIUS",
    "E3, EPIC LUCES, CHUCHES Y RANDOM | Epic Vlog LA Day 2": "THE BEST OF RUBIUS",
    "LOS CAZA HIPSTERS | GTA V Random": "VLOG",
    "GENTE RARA EN CHATROULETTE | Clasicos Animados": "CHATTROULETTE",
    "LOS TEJONES SON MALAS MADRES | Shelter": "GAYPLAYS",
    "50 COSAS SOBRE MI by Rubius": "THE BEST OF RUBIUS",
    "LOS PILOTOS CIEGOS | GTA V Random": "GAYPLAYS",
    "DESTROZANDO COCHES SUPER CAROS | BeamNG": "GAYPLAYS",
    "EL ULTIMO PUZZLE SANGRIENTO | The Evil Within": "GAYPLAYS",
    "MANERAS DE NO HACER UNA PRIMERA CITA": "THE BEST OF RUBIUS,CHALLENGE",
    "REGALOS WTF, RAP BEYOND Y KIT ANTI-HATERS": "",
    "ATRAPADO EN UN REALITY?": "THE BEST OF RUBIUS",
    "TRES RETARDS EN AMSTERDAM": "VLOG",
    "PIKABOSS ES DIOS": "THE BEST OF RUBIUS",
    "RUMORES ESTUPIDOS SOBRE RUBIUS": "THE BEST OF RUBIUS",
    "CADAVER EN EL COCHE | Camara Oculta": "THE BEST OF RUBIUS,CHALLENGE",
    "MI ASISTENTA KAWAII | Random Apps": "",
    "SALSEO EN ZOMBIE LAND | H1Z1 Random": "GAYPLAYS",
    "COMO DESTROZAR A RUBIUS | Give Up 2": "GAYPLAYS",
    "EL KOMBATE LEGENDARIO": "GAYPLAYS",
    "NUEVAS MANERAS DE TROLEAR | Rust": "GAYPLAYS",
    "EL NIVEL IMPOSIBLE DE SKRILLEX | Geometry Dash": "GAYPLAYS",
    "Algo que necesitaba contaros.": "",
    "POR MI NOVIO, MATO | Yandere Simulator": "GAYPLAYS",
    "MATANDO DELANTE DE SENPAI | Yandere Simulator": "GAYPLAYS",
    "ATAQUE DE TITANES | Yandere Simulator": "GAYPLAYS",
    "MI XBOX ES RACISTA | Trollefono": "THE BEST OF RUBIUS",
    "SALSEO EN LOS BAÑOS | Yandere Simulator": "GAYPLAYS",
    "IRON MAN VS 1000 AVIONES | GTA V MODS": "GAYPLAYS",
    "MI PERRO Y YO CONTRA EL MUNDO | MGSV": "GAYPLAYS",
    "PLANTAS PIRAÑA AGRESIVAS | Super Mario Maker": "GAYPLAYS",
    "LAS SALCHICHAS EPICAS": "THE BEST OF RUBIUS,CHALLENGE",
    "REGALOS DE FANSES": "VLOG",
    "CELEBRITIES - ELRUBIUS": "",
    "EL NIÑO CALVO Y LA TARTA | Fallout 4 RANDOM": "GAYPLAYS",
    "MI PEOR APUESTA": "THE BEST OF RUBIUS",
    "RESCATANDO AL CALVO | Rainbow Six Siege": "GAYPLAYS",
    "TENGO UN SUEÑO | Just Cause 3": "GAYPLAYS",
    "ATRAPADO EN EL MISMO DIA PARA SIEMPRE | Garbage Day": "GAYPLAYS",
    "DE FIESTA CON AMIGOS Y OLIVER HELDENS | Normal Vlog": "VLOG",
    "TOP 7 MEJORES CULOS DE LOS VIDEOJUEGOS": "",
    "NO TOMES DROGAS DECIAN | Far Cry Primal": "GAYPLAYS",
    "ME REVIENTAN LA CARA | UFC 2": "GAYPLAYS",
    "MI MAYOR ENFADO | Slither.io": "GAYPLAYS",
    "COCINANDO EBOLA PARA SENPAI | Yandere Simulator": "GAYPLAYS",
    "RUBIUS APRENDE A CONDUCIR": "VLOG",
    "EL FACKIN BOSS DEL OVERWATCH": "THE BEST OF RUBIUS",
    "ESTA NOCHE NO DUERMO :(": "GAYPLAYS",
    "LA CAJA LEGENDARIA (Y TROLL) 4": "THE BEST OF RUBIUS",
    "EL BAILE ZOMBIE | Just Dance 2017": "VLOG,CHALLENGE",
    "NO ME CREO QUE ESTE JUGANDO A ESTO | Zelda Breath of The Wild": "GAYPLAYS",
    "DOS TONTOS CAZAN POKEMON EN LA VIDA REAL - Pokemon GO": "THE BEST OF RUBIUS",
    "REACCIONANDO A DIBUJOS DE SUSCRIPTORES": "",
    "SUPER MARIO MAKER CHALLENGE #1": "CHALLENGE",
    "SI TE RIES PIERDES CHALLENGE con Rubius": "CHALLENGE",
    "ABRIENDO LA PUERTA SECRETA | Hello Neighbor #3": "GAYPLAYS",
    "PELEAS ADORABLES | Gang Beasts (Momentos Divertidos)": "",
    "TE PUEDES SUICIDAR EN REALIDAD VIRTUAL? (HTC Vive)": "GAYPLAYS",
    "LA CAJA LEGENDARIA 5": "",
    "UNA APUESTA ES UNA APUESTA": "CHALLENGE,THE BEST OF RUBIUS",
    "MI HIJO ESTUPIDO HA VUELTO | Guts and Glory": "GAYPLAYS",
    "LA LEYENDA DE CRISTIANITO ES REAL | Higher or Lower": "",
    "BIENVENIDOS AL INFIERNO | Outlast 2": "",
    "NUEVO SETUP DE HABITACION Y ANUNCIO DE TV!": "THE BEST OF RUBIUS",
    "SEÑOR PRESIDENTE - Cancion Remix elrubius (by Jaimillo) 2017": "THE BEST OF RUBIUS",
    "MI MAYOR APUESTA": "THE BEST OF RUBIUS,CHALLENGE",
    "PORTERIA CHALLENGE by Rubius": "CHALLENGE,THE BEST OF RUBIUS",
    "MIS SUBS ME ENVIAN CANCIONES TROLL | Momentos Rubius #1": "THE BEST OF RUBIUS",
    "EL COMBATE LEGENDARIO Z": "GAYPLAYS",
    "REACCIONANDO A ROBLOX": "THE BEST OF RUBIUS",
    "EL MAYOR SORTEO DE LA HISTORIA DE YOUTUBE": "THE BEST OF RUBIUS"
};

function assignVideoCategories() {
    const videoItems = document.querySelectorAll('.browse-video-item');
    videoItems.forEach(item => {
        const titleEl = item.querySelector('.browse-video-title');
        if (titleEl) {
            const title = titleEl.textContent.trim();
            const category = videoCategories[title] || "";
            item.setAttribute('data-category', category);
        }
    });
}

function updateCategoryCounts() {
    const videoItems = document.querySelectorAll('.browse-video-item');
    const counts = {
        all: videoItems.length,
        CHALLENGE: 0,
        GAYPLAYS: 0,
        'THE BEST OF RUBIUS': 0,
        CHATTROULETTE: 0,
        VLOG: 0
    };
    
    videoItems.forEach(item => {
        const categories = item.getAttribute('data-category');
        if (categories) {
            const cats = categories.split(',');
            cats.forEach(cat => {
                if (counts[cat] !== undefined) {
                    counts[cat]++;
                }
            });
        }
    });
    
    document.querySelectorAll('.category-card').forEach(card => {
        const category = card.getAttribute('data-category');
        const countEl = card.querySelector('.category-count');
        if (countEl) {
            const count = category === 'all' ? counts.all : (counts[category] || 0);
            countEl.textContent = `${count} videos`;
        }
    });
}

function setupCategoryFilters() {
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', function() {
            document.querySelectorAll('.category-card').forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            filterVideosByCategory(category);
            
            // Cambiar a tab Uploads y mostrar videos filtrados
            document.querySelectorAll('.browse-subtab').forEach(t => t.classList.remove('active'));
            document.querySelector('.browse-subtab').classList.add('active');
            document.querySelector('.categories-section').style.display = 'none';
            document.querySelector('.browse-videos-grid').style.display = 'grid';
        });
    });
}

function filterVideosByCategory(category) {
    const videoItems = document.querySelectorAll('.browse-video-item');
    
    if (category === 'all') {
        isFiltered = false;
        allVideos = Array.from(videoItems);
    } else {
        isFiltered = true;
        allVideos = Array.from(videoItems).filter(item => {
            const categories = item.getAttribute('data-category');
            if (!categories) return false;
            return categories.split(',').includes(category);
        });
    }
    
    const totalPages = Math.ceil(allVideos.length / videosPerPage);
    currentPage = 1;
    updatePaginationButtons(totalPages);
    showPage(1);
}

function showAllVideos() {
    const videoItems = document.querySelectorAll('.browse-video-item');
    allVideos = Array.from(videoItems);
    isFiltered = false;
    const totalPages = Math.ceil(allVideos.length / videosPerPage);
    currentPage = 1;
    updatePaginationButtons(totalPages);
    showPage(1);
}

