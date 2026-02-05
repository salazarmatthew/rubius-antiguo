// Script para cargar videos de Gumlet directamente
function loadGumletVideo(videoId, containerId) {
    // Gumlet normalmente expone el video en formatos directos
    // Intentamos diferentes URLs comunes
    const possibleUrls = [
        `https://video.gumlet.io/${videoId}/master.m3u8`,
        `https://video.gumlet.io/${videoId}/video.mp4`,
        `https://cdn.gumlet.io/${videoId}/master.m3u8`,
    ];
    
    const container = document.getElementById(containerId);
    
    // Crear reproductor HTML5
    const video = document.createElement('video');
    video.controls = true;
    video.style.width = '100%';
    video.style.height = '100%';
    video.style.backgroundColor = '#000';
    
    // Intentar cargar el video
    const source = document.createElement('source');
    source.src = possibleUrls[0];
    source.type = 'application/x-mpegURL';
    video.appendChild(source);
    
    container.innerHTML = '';
    container.appendChild(video);
    
    // Si no carga, mostrar mensaje
    video.addEventListener('error', function() {
        container.innerHTML = `
            <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: #000; color: white; flex-direction: column;">
                <p style="font-size: 18px; margin-bottom: 20px;">Este video requiere verlo en Gumlet</p>
                <button onclick="window.open('https://gumlet.tv/watch/${videoId}/', '_blank')" 
                        style="padding: 10px 30px; font-size: 16px; cursor: pointer; background: #cc181e; color: white; border: none; border-radius: 3px;">
                    Ver Video
                </button>
            </div>
        `;
    });
}

// Función alternativa usando fetch para obtener la URL real del video
async function fetchGumletVideoUrl(gumletUrl) {
    try {
        // Intentar obtener la página y extraer la URL del video
        const response = await fetch(gumletUrl);
        const html = await response.text();
        
        // Buscar URLs de video en el HTML (m3u8, mp4, etc)
        const videoUrlMatch = html.match(/(https:\/\/[^\s"']+\.(m3u8|mp4))/);
        
        if (videoUrlMatch) {
            return videoUrlMatch[0];
        }
    } catch (error) {
        console.error('Error fetching video URL:', error);
    }
    return null;
}
