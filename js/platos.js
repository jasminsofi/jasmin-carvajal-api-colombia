const API_URL = 'https://api-colombia.com/api/v1/TypicalDish';

const contenedorPlatos = document.getElementById('lista-platos');
const contadorPlatos = document.getElementById('contador-platos');
const estadoCarga = document.getElementById('estado-carga');
const estadoError = document.getElementById('estado-error');

// Imagen de respaldo general en caso de enlace roto en la API
const IMAGEN_RESPALDO = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80';

// Reemplazos específicos si algún plato de la API trae URL caída
const REEMPLAZOS_IMAGENES = {
    'Bandeja paisa': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Bandeja_paisa_1.jpg/800px-Bandeja_paisa_1.jpg',
    'Ajiaco': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Ajiaco_bogotano.jpg/800px-Ajiaco_bogotano.jpg',
    'Sancocho': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Sancocho_de_gallina.jpg/800px-Sancocho_de_gallina.jpg'
};

function obtenerUrlImagen(plato) {
    if (REEMPLAZOS_IMAGENES[plato.name]) {
        return REEMPLAZOS_IMAGENES[plato.name];
    }
    if (plato.imageUrl && plato.imageUrl.startsWith('http')) {
        return plato.imageUrl;
    }
    return IMAGEN_RESPALDO;
}

function renderizarPlatos(platos) {
    // Extra: Contar total de platos
    contadorPlatos.textContent = `Total de platos típicos registrados: ${platos.length}`;
    contadorPlatos.classList.remove('hidden');

    contenedorPlatos.innerHTML = '';

    platos.forEach((plato) => {
        const departamento = plato.department?.name || 'Todo el país';
        const descripcion = plato.description || 'Plato tradicional de la gastronomía colombiana.';
        const imagenSrc = obtenerUrlImagen(plato);

        const tarjeta = document.createElement('article');
        tarjeta.className = 'card';

        tarjeta.innerHTML = `
            <img 
                src="${imagenSrc}" 
                alt="${plato.name}" 
                class="card-img"
                loading="lazy"
                onerror="this.onerror=null; this.src='${IMAGEN_RESPALDO}';"
            >
            <div class="card-body">
                <span class="card-tag">${departamento}</span>
                <h3 class="card-title">${plato.name}</h3>
                <p class="card-desc" title="${descripcion}">${descripcion}</p>
            </div>
        `;

        contenedorPlatos.appendChild(tarjeta);
    });
}

function cargarPlatos() {
    fetch(API_URL)
        .then((respuesta) => {
            if (!respuesta.ok) {
                throw new Error(`Error HTTP: ${respuesta.status}`);
            }
            return respuesta.json();
        })
        .then((datos) => {
            estadoCarga.classList.add('hidden');
            renderizarPlatos(datos);
        })
        .catch((error) => {
            estadoCarga.classList.add('hidden');
            estadoError.textContent = `Ocurrió un error al cargar los platos típicos: ${error.message}`;
            estadoError.classList.remove('hidden');
            console.error('Error en fetch platos:', error);
        });
}

cargarPlatos();