# 🚀 Prueba Tecnica Top Level

## 🛠️ Cómo Inicializar el Proyecto

Sigue estos pasos para poner en marcha el proyecto en tu máquina local.

### Prerrequisitos

Asegúrate de tener instalado:

- [Node.js](https://nodejs.org/es/) (versión 18 o superior recomendada)
- [npm](https://www.npmjs.com/) (viene con Node.js) o [Yarn](https://yarnpkg.com/)

### Descarga e Instalación

1. **Clona el repositorio de GitHub:**

   ```bash
   git clone https://github.com/Jmdv1999/Top-Level-Evaluacion.git
   ```

2. **Navega al directorio del proyecto:**

   ```bash
   cd Top-Level-Evaluacion
   ```

3. **Instala las dependencias:**

   ```bash
   npm install
   # o si usas Yarn:
   yarn
   ```

### Ejecutar la Aplicación

Una vez instaladas las dependencias, inicia el servidor de desarrollo:

```bash
npm run dev
# o si usas Yarn:
yarn dev
```

La aplicación se abrirá automáticamente en tu navegador en [http://localhost:5173](http://localhost:5173).

---

## 🏗️ Construir para Producción

Para crear una versión optimizada de tu aplicación lista para desplegar:

```bash
npm run build
# o si usas Yarn:
yarn build
```

Esto generará los archivos estáticos en la carpeta `dist/`.

---

## 💡 Cómo Utilizar la Aplicación

### Añadir Tareas

- Escribe la descripción de tu tarea en el campo de texto en la parte superior.
- Presiona **Enter** o haz clic en el botón "Añadir Tarea" para agregarla a la lista.

### Marcar/Desmarcar Tareas

- Haz clic en el checkbox al lado de cada tarea para marcarla como completada o desmarcarla.

### Editar Tareas

- Haz clic en el icono de lápiz (Editar) junto a una tarea.
- Modifica el texto en el campo que aparece.
- Presiona **Enter** o haz clic en el icono de "Guardar" (check) para confirmar los cambios.
- Haz clic en el icono de "Cancelar" (X) para descartar los cambios.

### Eliminar Tareas

- Haz clic en el icono de cubo de basura (Eliminar) junto a una tarea.

### Filtrar Tareas

- Utiliza los botones de filtro (Todas, Completadas, Pendientes) para ver solo las tareas que te interesan.

### Navegar por Páginas (Paginación)

- Si tienes muchas tareas, usa los botones de números o las flechas de navegación en la parte inferior de la lista para pasar de una página a otra.

---

## ⌨️ Atajos de Teclado

- **Enter** (en el campo "Añadir tarea"): Añade una nueva tarea.
- **Enter** (mientras editas una tarea): Guarda los cambios de la edición.
- **Flecha Izquierda (←):** Navega a la página anterior de la lista de tareas (cuando la paginación está activa).
- **Flecha Derecha (→):** Navega a la página siguiente de la lista de tareas (cuando la paginación está activa).
