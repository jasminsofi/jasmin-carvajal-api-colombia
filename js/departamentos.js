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