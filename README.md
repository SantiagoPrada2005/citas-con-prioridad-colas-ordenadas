# Sistema de Gestión de Cola de Prioridad

[![Version](https://img.shields.io/badge/version-1.2.0-blue.svg)](https://semver.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 📋 Descripción

Sistema de gestión de cola de prioridad para clientes implementado en JavaScript. Permite gestionar clientes con diferentes niveles de prioridad (especial, vip, normal) y mantener un orden eficiente en la atención.

## ✨ Características

- Gestión automática de prioridades
- Sistema de IDs único por cliente
- Temporizador integrado
- Interfaz de usuario reactiva
- Validaciones robustas
- Manejo eficiente de memoria

## 🚀 Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/tu-usuario/sistema-cola-prioridad.git
```

2. Navega al directorio del proyecto:
```bash
cd sistema-cola-prioridad
```

3. Abre el archivo `index.html` en tu navegador o utiliza un servidor local.

## 💻 Uso

### Agregar un Cliente
```javascript
const cola = new ColaPrioridad();
const cliente = new Cliente("Juan Pérez", "vip");
cola.agregarCliente(cliente);
```

### Atender Cliente
```javascript
const clienteAtendido = cola.atenderCliente();
```

### Cancelar Cita
```javascript
cola.eliminarCliente(idCliente);
```

## 📊 Estructura de Datos

### Cola de Prioridad
- Implementación basada en array ordenado
- Ordenamiento O(n log n) en cada inserción
- Complejidad temporal:
  * Inserción: O(n log n)
  * Eliminación: O(n)
  * Búsqueda: O(n)
  * Acceso al frente: O(1)

### Enlazamiento de Datos
- Referencias mediante IDs únicos
- Prioridad calculada en tiempo de creación
- Validaciones de integridad
- Gestión eficiente de memoria

## 🔧 Tecnologías Utilizadas

- JavaScript (ES6+)
- HTML5
- CSS3
- DOM API

## 📝 Documentación

### Clase Cliente
```javascript
class Cliente {
    constructor(nombre, tipo) {
        this.id = ++Cliente.contador;
        this.nombre = nombre;
        this.tipo = tipo;
        this.prioridad = this.definirPrioridad(tipo);
    }
}
```

### Clase ColaPrioridad
```javascript
class ColaPrioridad {
    constructor() {
        this.clientes = [];
    }
}
```

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor, sigue estos pasos:

1. Haz un Fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

```text
MIT License

Copyright (c) 2024 Santiago Prada

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 👥 Autores

* **Santiago Prada** - *Backend Developer* - [GitHub](https://github.com/tu-usuario)

## 🙏 Agradecimientos

* A todos los contribuidores que han ayudado a mejorar este proyecto
* A la comunidad de desarrolladores por su apoyo y feedback

## 📞 Contacto

Santiago Prada - [@tu_twitter](https://twitter.com/tu_twitter) - email@ejemplo.com

Link del proyecto: [https://github.com/tu-usuario/sistema-cola-prioridad](https://github.com/tu-usuario/sistema-cola-prioridad) 