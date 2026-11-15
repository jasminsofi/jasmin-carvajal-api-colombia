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