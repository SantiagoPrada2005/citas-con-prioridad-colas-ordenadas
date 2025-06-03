# Diagrama de Flujo - Sistema de Cola de Prioridad

## Diagrama de Flujo Principal

```mermaid
flowchart TD
    Start([Inicio]) --> Init[Inicializar Sistema]
    Init --> Menu{Menú Principal}
    
    Menu -->|1| RegCliente[Registrar Cliente]
    Menu -->|2| Atender[Atender Cliente]
    Menu -->|3| Cancelar[Cancelar Cita]
    Menu -->|4| Consultar[Consultar Cola]
    Menu -->|5| Exit([Salir])
    
    %% Flujo de Registro de Cliente
    RegCliente --> InputDatos[Ingresar Datos Cliente]
    InputDatos --> ValidarDatos{Validar Datos}
    ValidarDatos -->|No Válidos| ErrorDatos[Mostrar Error]
    ErrorDatos --> InputDatos
    ValidarDatos -->|Válidos| AsignarPrioridad[Asignar Prioridad]
    AsignarPrioridad --> AgregarCola[Agregar a Cola]
    AgregarCola --> OrdenarCola[Ordenar por Prioridad]
    OrdenarCola --> ActualizarUI[Actualizar Interfaz]
    ActualizarUI --> Menu
    
    %% Flujo de Atender Cliente
    Atender --> VerificarCola{Cola Vacía?}
    VerificarCola -->|Sí| MsgVacia[Mostrar Mensaje]
    MsgVacia --> Menu
    VerificarCola -->|No| SeleccionarCliente[Seleccionar Cliente]
    SeleccionarCliente --> AtenderCliente[Atender Cliente]
    AtenderCliente --> RemoverCola[Remover de Cola]
    RemoverCola --> ActualizarUI
    
    %% Flujo de Cancelar Cita
    Cancelar --> BuscarCliente[Buscar Cliente]
    BuscarCliente --> ExisteCliente{Cliente Existe?}
    ExisteCliente -->|No| MsgNoExiste[Mostrar Error]
    MsgNoExiste --> Menu
    ExisteCliente -->|Sí| ConfirmarCancelar{Confirmar Cancelación}
    ConfirmarCancelar -->|No| Menu
    ConfirmarCancelar -->|Sí| EliminarCliente[Eliminar Cliente]
    EliminarCliente --> ActualizarUI
    
    %% Flujo de Consultar Cola
    Consultar --> MostrarCola[Mostrar Estado Cola]
    MostrarCola --> MostrarPrioridades[Mostrar Prioridades]
    MostrarPrioridades --> Menu
    
    %% Temporizador
    Init --> IniciarTimer[Iniciar Temporizador]
    IniciarTimer --> ActualizarTimer[Actualizar Temporizador]
    ActualizarTimer --> ActualizarTimer
    
    %% Estilos
    classDef process fill:#e6f3ff,stroke:#333,stroke-width:2px,color:#000;
    classDef decision fill:#fff2e6,stroke:#333,stroke-width:2px,color:#000;
    classDef start fill:#e6ffe6,stroke:#333,stroke-width:2px,color:#000;
    classDef error fill:#ffe6e6,stroke:#333,stroke-width:2px,color:#000;
    
    class Start,Exit start;
    class ValidarDatos,VerificarCola,ExisteCliente,ConfirmarCancelar decision;
    class ErrorDatos,MsgVacia,MsgNoExiste error;
```

## Descripción de los Procesos

### 1. Inicialización del Sistema
- **Proceso**: `Inicializar Sistema`
  * Cargar configuración
  * Inicializar cola vacía
  * Configurar temporizador
  * Preparar interfaz de usuario

### 2. Registro de Cliente
- **Proceso**: `Registrar Cliente`
  * Entrada de datos
  * Validación de información
  * Asignación de prioridad
  * Inserción en cola
  * Ordenamiento
  * Actualización de interfaz

### 3. Atención de Cliente
- **Proceso**: `Atender Cliente`
  * Verificación de cola
  * Selección de cliente
  * Proceso de atención
  * Actualización de cola
  * Actualización de interfaz

### 4. Cancelación de Cita
- **Proceso**: `Cancelar Cita`
  * Búsqueda de cliente
  * Verificación de existencia
  * Confirmación de cancelación
  * Eliminación de cliente
  * Actualización de interfaz

### 5. Consulta de Cola
- **Proceso**: `Consultar Cola`
  * Visualización de estado
  * Mostrar prioridades
  * Actualización en tiempo real

### 6. Temporizador
- **Proceso**: `Gestionar Temporizador`
  * Inicialización
  * Actualización continua
  * Sincronización con interfaz

## Flujos de Error

### 1. Validación de Datos
- **Error**: Datos inválidos
  * Mostrar mensaje de error
  * Permitir corrección
  * Volver a validar

### 2. Cola Vacía
- **Error**: No hay clientes
  * Mostrar mensaje informativo
  * Volver al menú principal

### 3. Cliente No Encontrado
- **Error**: Cliente inexistente
  * Mostrar mensaje de error
  * Volver al menú principal

## Consideraciones de Implementación

### 1. Validaciones
- Verificación de datos de entrada
- Control de duplicados
- Validación de tipos de cliente

### 2. Actualizaciones
- Interfaz en tiempo real
- Ordenamiento automático
- Gestión de memoria

### 3. Temporizador
- Actualización cada segundo
- Sincronización con UI
- Gestión de recursos

### 4. Manejo de Errores
- Mensajes claros
- Recuperación de errores
- Logging de eventos

## Optimizaciones

### 1. Rendimiento
- Minimizar operaciones de ordenamiento
- Optimizar búsquedas
- Gestionar memoria eficientemente

### 2. Interfaz
- Actualizaciones eficientes
- Feedback inmediato
- Navegación intuitiva

### 3. Datos
- Validación proactiva
- Caché de datos frecuentes
- Persistencia eficiente 