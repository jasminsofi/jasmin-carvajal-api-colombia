const API_URL = 'https://api-colombia.com/api/v1/Department';

const contenedorLista = document.getElementById('lista-departamentos');
const contenedorRegiones = document.getElementById('resumen-regiones');
const estadoCarga = document.getElementById('estado-carga');
const estadoError = document.getElementById('estado-error');

// Mapeo de IDs de región según API Colombia
const NOMBRES_REGIONES = {
    1: 'Caribe',
    2: 'Pacífico',
    3: 'Orinoquía',
    4: 'Amazonía',
    5: 'Andina',
    6: 'Insular'
};

function formatearNumero(numero) {
    return numero ? Number(numero).toLocaleString('es-CO') : 'No disponible';
}

function mostrarResumenRegiones(departamentos) {
    const conteo = {};

    departamentos.forEach((dep) => {
        const nombreRegion = dep.region?.name || NOMBRES_REGIONES[dep.regionId] || 'Otra región';
        conteo[nombreRegion] = (conteo[nombreRegion] || 0) + 1;
    });

    contenedorRegiones.innerHTML = '';

    Object.entries(conteo).forEach(([region, cantidad]) => {
        const pill = document.createElement('div');
        pill.className = 'stat-pill';
        pill.innerHTML = `<strong>Región ${region}:</strong> ${cantidad} dep.`;
        contenedorRegiones.appendChild(pill);
    });
}

function renderizarDepartamentos(departamentos) {
    contenedorLista.innerHTML = '';

    departamentos.forEach((dep) => {
        const region = dep.region?.name || NOMBRES_REGIONES[dep.regionId] || 'Sin región';
        const poblacion = formatearNumero(dep.population);
        const superficie = dep.surface ? `${formatearNumero(dep.surface)} km²` : 'No disponible';
        const descripcion = dep.description || 'Sin descripción disponible.';

        const tarjeta = document.createElement('article');
        tarjeta.className = 'card';

        tarjeta.innerHTML = `
            <div class="card-body">
                <span class="card-tag">Región ${region}</span>
                <h3 class="card-title">${dep.name}</h3>
                <ul class="card-meta">
                    <li><strong>Población:</strong> ${poblacion} hab.</li>
                    <li><strong>Superficie:</strong> ${superficie}</li>
                </ul>
                <p class="card-desc" title="${descripcion}">${descripcion}</p>
            </div>
        `;

        contenedorLista.appendChild(tarjeta);
    });
}

function cargarDepartamentos() {
    fetch(API_URL)
        .then((respuesta) => {
            if (!respuesta.ok) {
                throw new Error(`Error HTTP: ${respuesta.status}`);
            }
            return respuesta.json();
        })
        .then((datos) => {
            estadoCarga.classList.add('hidden');
            // Ordenar alfabéticamente por nombre
            datos.sort((a, b) => a.name.localeCompare(b.name));
            mostrarResumenRegiones(datos);
            renderizarDepartamentos(datos);
        })
        .catch((error) => {
            estadoCarga.classList.add('hidden');
            estadoError.textContent = `Ocurrió un error al cargar los departamentos: ${error.message}`;
            estadoError.classList.remove('hidden');
            console.error('Error en fetch departamentos:', error);
        });
}

cargarDepartamentos();