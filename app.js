/**
 * @fileoverview Sistema de gestión de cola de prioridad para clientes
 * @version 1.2.0
 * @author [Santiago Prada] - Backend Developer
 * @date 2024-03-19
 * 
 * @description
 * Implementa un sistema de cola de prioridad para gestionar clientes
 * con diferentes niveles de prioridad (especial, vip, normal).
 * 
 * Estructura de Datos - Cola de Prioridad:
 * =======================================
 * La cola de prioridad implementada utiliza un array ordenado como estructura base,
 * donde los elementos se mantienen ordenados por su nivel de prioridad.
 * 
 * Características de la Implementación:
 * ------------------------------------
 * 1. Ordenamiento:
 *    - Los elementos se mantienen ordenados por prioridad (1: alta, 2: media, 3: baja)
 *    - El ordenamiento se realiza en cada inserción para mantener la cola siempre ordenada
 *    - Se utiliza el método sort() de JavaScript con una función de comparación personalizada
 * 
 * 2. Enlazamiento de Datos:
 *    - Cada cliente mantiene una referencia a su ID único
 *    - La prioridad se calcula y almacena en el momento de la creación del cliente
 *    - Los datos se enlazan a través de referencias en memoria, no mediante punteros
 *    - La estructura mantiene la integridad de los datos a través de validaciones
 * 
 * 3. Gestión de Memoria:
 *    - Los objetos Cliente se mantienen en memoria mientras estén en la cola
 *    - La eliminación de clientes libera la memoria asociada
 *    - No hay referencias circulares que puedan causar memory leaks
 * 
 * Complejidad Temporal:
 * --------------------
 * - Inserción: O(n log n) - Debido al ordenamiento del array
 * - Eliminación: O(n) - Debido al desplazamiento de elementos
 * - Búsqueda: O(n) - Búsqueda lineal en el array
 * - Acceso al frente: O(1) - Acceso directo al primer elemento
 * 
 * Ventajas de esta Implementación:
 * -------------------------------
 * 1. Simplicidad: Fácil de entender y mantener
 * 2. Eficiencia en memoria: No requiere estructuras adicionales
 * 3. Flexibilidad: Fácil de modificar y extender
 * 4. Integridad: Validaciones robustas de datos
 * 
 * Limitaciones:
 * ------------
 * 1. Rendimiento en inserciones: El ordenamiento en cada inserción puede ser costoso
 * 2. Escalabilidad: Para grandes volúmenes de datos, podría requerir optimización
 * 3. Memoria: Mantiene todos los elementos en memoria
 * 
 * Alternativas Consideradas:
 * ------------------------
 * 1. Heap Binario: O(log n) para inserción y eliminación
 * 2. Árbol de Búsqueda balanceado: O(log n) para todas las operaciones
 * 3. Lista enlazada ordenada: O(n) para inserción, O(1) para eliminación
 * 
 * @requires DOM
 * @see {@link https://en.wikipedia.org/wiki/Priority_queue} - Documentación sobre Colas de Prioridad
 * @see {@link https://en.wikipedia.org/wiki/Heap_(data_structure)} - Documentación sobre Heaps
 */

/**
 * @typedef {Object} ClienteType
 * @property {number} id - Identificador único del cliente
 * @property {string} nombre - Nombre del cliente
 * @property {string} tipo - Tipo de cliente (especial, vip, normal)
 * @property {number} prioridad - Nivel de prioridad (1: alta, 2: media, 3: baja)
 */

/**
 * @typedef {Object} PriorityLevel
 * @property {number} HIGH - Prioridad máxima (1)
 * @property {number} MEDIUM - Prioridad media (2)
 * @property {number} LOW - Prioridad baja (3)
 */

/**
 * @typedef {Object} ClientType
 * @property {string} ESPECIAL - Cliente especial
 * @property {string} VIP - Cliente VIP
 * @property {string} NORMAL - Cliente normal
 */

// Constantes para tipos de clientes y prioridades
const CLIENT_TYPES = {
    ESPECIAL: 'especial',
    VIP: 'vip',
    NORMAL: 'normal'
};

const PRIORITY_LEVELS = {
    HIGH: 1,
    MEDIUM: 2,
    LOW: 3
};

/**
 * Clase que representa un cliente en el sistema
 * @class Cliente
 * @implements {ClienteType}
 * 
 * @example
 * const cliente = new Cliente("Juan Pérez", "vip");
 * console.log(cliente.prioridad); // 2
 */
class Cliente {
    /** @type {number} Contador estático para generar IDs únicos */
    static contador = 0;

    /**
     * Crea una nueva instancia de Cliente
     * @param {string} nombre - Nombre del cliente
     * @param {string} tipo - Tipo de cliente (especial, vip, normal)
     * @throws {Error} Si el nombre está vacío o el tipo no es válido
     */
    constructor(nombre, tipo) {
        if (!nombre || typeof nombre !== 'string') {
            throw new Error('El nombre del cliente es requerido y debe ser una cadena de texto');
        }
        if (!Object.values(CLIENT_TYPES).includes(tipo)) {
            throw new Error('Tipo de cliente no válido');
        }

        this.id = ++Cliente.contador;
        this.nombre = nombre;
        this.tipo = tipo;
        this.prioridad = this.definirPrioridad(tipo);
    }

    /**
     * Define la prioridad del cliente basado en su tipo
     * @param {string} tipo - Tipo de cliente
     * @returns {number} Nivel de prioridad (1: alta, 2: media, 3: baja)
     * @private
     */
    definirPrioridad(tipo) {
        switch (tipo) {
            case CLIENT_TYPES.ESPECIAL:
                return PRIORITY_LEVELS.HIGH;
            case CLIENT_TYPES.VIP:
                return PRIORITY_LEVELS.MEDIUM;
            default:
                return PRIORITY_LEVELS.LOW;
        }
    }
}

/**
 * Clase que implementa una cola de prioridad para clientes
 * @class ColaPrioridad
 * 
 * @description
 * Implementa una cola de prioridad usando un array ordenado.
 * La cola mantiene los elementos ordenados por prioridad,
 * donde la prioridad más baja (1) tiene mayor precedencia.
 * 
 * Estructura Interna:
 * -----------------
 * 1. Almacenamiento:
 *    - Utiliza un array para almacenar los clientes
 *    - Los elementos se mantienen ordenados por prioridad
 *    - El orden se mantiene mediante reordenamiento en cada inserción
 * 
 * 2. Enlazamiento:
 *    - Los clientes se enlazan mediante sus IDs únicos
 *    - No hay referencias directas entre elementos
 *    - La relación entre elementos se mantiene por el orden en el array
 * 
 * 3. Validaciones:
 *    - Verifica la validez de los clientes antes de insertarlos
 *    - Mantiene la integridad de los datos mediante validaciones
 *    - Previene duplicados mediante IDs únicos
 * 
 * @example
 * const cola = new ColaPrioridad();
 * cola.agregarCliente(new Cliente("Juan", "vip"));
 * const cliente = cola.atenderCliente();
 */
class ColaPrioridad {
    constructor() {
        /** @type {Cliente[]} Array de clientes ordenado por prioridad */
        this.clientes = [];
    }

    /**
     * Agrega un cliente a la cola y ordena por prioridad
     * @param {Cliente} cliente - Cliente a agregar
     * @throws {Error} Si el cliente no es una instancia válida de Cliente
     * @complexity O(n log n) - Debido al ordenamiento
     */
    agregarCliente(cliente) {
        if (!(cliente instanceof Cliente)) {
            throw new Error('El cliente debe ser una instancia válida de Cliente');
        }
        this.clientes.push(cliente);
        this.ordenarPorPrioridad();
        actualizarLista();
    }

    /**
     * Ordena los clientes por prioridad
     * @private
     * @complexity O(n log n)
     */
    ordenarPorPrioridad() {
        this.clientes.sort((a, b) => a.prioridad - b.prioridad);
    }

    /**
     * Atiende al siguiente cliente en la cola
     * @returns {Cliente|null} Cliente atendido o null si la cola está vacía
     * @complexity O(n) - Debido al desplazamiento del array
     */
    atenderCliente() {
        if (this.clientes.length > 0) {
            const clienteAtendido = this.clientes.shift();
            actualizarLista();
            return clienteAtendido;
        }
        return null;
    }

    /**
     * Elimina un cliente de la cola por su ID
     * @param {number} id - ID del cliente a eliminar
     * @returns {boolean} true si se eliminó el cliente, false si no se encontró
     * @complexity O(n) - Debido al filtrado del array
     */
    eliminarCliente(id) {
        const longitudInicial = this.clientes.length;
        this.clientes = this.clientes.filter(cliente => cliente.id !== id);
        if (longitudInicial !== this.clientes.length) {
            actualizarLista();
            return true;
        }
        return false;
    }

    /**
     * Obtiene el tamaño actual de la cola
     * @returns {number} Número de clientes en la cola
     * @complexity O(1)
     */
    get tamaño() {
        return this.clientes.length;
    }
}

// Inicialización
const cola = new ColaPrioridad();
let temporizador = null;

/**
 * Solicita un nuevo turno para un cliente
 * @throws {Error} Si el nombre está vacío o el tipo no es válido
 */
function solicitarTurno() {
    const nombre = document.getElementById("nombre").value.trim();
    const tipo = document.getElementById("tipo").value;

    if (!nombre) {
        alert("Por favor, ingresa un nombre válido.");
        return;
    }

    try {
        const cliente = new Cliente(nombre, tipo);
        cola.agregarCliente(cliente);
        document.getElementById("nombre").value = "";
    } catch (error) {
        console.error("Error al crear cliente:", error);
        alert(error.message);
    }
}

/**
 * Obtiene el nombre completo del tipo de cliente
 * @param {string} tipo - Tipo de cliente (especial, vip, normal)
 * @returns {string} Nombre completo del tipo de cliente
 */
function getTipoCliente(tipo) {
    switch (tipo) {
        case CLIENT_TYPES.ESPECIAL:
            return "Persona 3ra Edad / Condición Especial";
        case CLIENT_TYPES.VIP:
            return "Cliente VIP";
        default:
            return "Cliente General";
    }
}

/**
 * Actualiza la lista de clientes en la interfaz
 * @complexity O(n) - Donde n es el número de clientes
 */
function actualizarLista() {
    const lista = document.getElementById("listaClientes");
    
    if (cola.tamaño === 0) {
        lista.innerHTML = `
            <div class="tituloLista">Lista de clientes (0)</div>
            <div class="clienteLista">
                <p>No hay clientes en espera</p>
            </div>
        `;
        return;
    }
    
    lista.innerHTML = `
        <div class="tituloLista">Lista de clientes (${cola.tamaño})</div>
        <div class="clienteLista">
            ${cola.clientes.map(cliente => `
                <li data-tipo="${cliente.tipo}">
                    <span>${cliente.nombre} - ${getTipoCliente(cliente.tipo)}</span>
                    <button class="cancelarCitas" onclick="cancelarCita(${cliente.id})">
                        Cancelar cita
                    </button>
                </li>
            `).join('')}
        </div>
    `;
}

/**
 * Atiende al siguiente cliente en la cola
 * @returns {Cliente|null} Cliente atendido o null si la cola está vacía
 */
function atenderSiguiente() {
    const clienteAtendido = cola.atenderCliente();
    if (clienteAtendido) {
        console.log(`Cliente atendido: ${clienteAtendido.nombre}`);
    }
    return clienteAtendido;
}

/**
 * Cancela la cita de un cliente
 * @param {number} id - ID del cliente
 * @returns {boolean} true si se canceló la cita, false si no se encontró el cliente
 */
function cancelarCita(id) {
    const resultado = cola.eliminarCliente(id);
    if (resultado) {
        console.log(`Cita cancelada para el cliente ID: ${id}`);
    }
    return resultado;
}

/**
 * Inicia el temporizador
 * @description
 * Implementa un temporizador que se actualiza cada segundo
 * y muestra el tiempo transcurrido en formato MM:SS
 */
function iniciarTemporizador() {
    let segundos = 0;
    
    if (temporizador) {
        clearInterval(temporizador);
    }

    temporizador = setInterval(() => {
        segundos++;
        const minutos = Math.floor(segundos / 60);
        const secs = segundos % 60;
        document.getElementById("timer").textContent = 
            `${minutos.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }, 1000);
}

// Iniciar el temporizador al cargar la página
document.addEventListener('DOMContentLoaded', iniciarTemporizador);