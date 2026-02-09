---
trigger: model_decision
description: Contiene instrucciones para: Separación de HTML/CSS/JS Arquitectura MPA Gestión de estado Nomenclatura Manejo del DOM Manejo de eventos
---

# Buenas Prácticas - Parte 1: Fundamentos y Arquitectura

## 1. Separación estricta de concerns

### 1.1 HTML

* **PROHIBIDO** usar atributos de estilo inline (`style="..."`)
* **PROHIBIDO** usar etiquetas `<style>` dentro del HTML
* **PROHIBIDO** usar etiquetas `<script>` con código JavaScript inline
* **PROHIBIDO** usar atributos de eventos inline (`onclick=""`, `onload=""`, etc.)
* El HTML debe contener **únicamente estructura semántica**
* Usar atributos `data-*` para identificadores y estados (ej: `data-id`, `data-state`, `data-role`)
* Preferir clases semánticas sobre IDs para estilos
* Todo elemento interactivo debe ser accesible por teclado

**Ejemplo correcto:**
```html
<!-- ❌ MAL -->
<button style="color: red;" onclick="deleteItem()">Eliminar</button>

<!-- ✅ BIEN -->
<button class="btn-danger" data-action="delete">Eliminar</button>
```

### 1.2 CSS

* Todo el CSS debe residir en archivos `.css` separados en `/src/css`
* Usar **variables CSS** para valores reutilizables:
  * Colores: `--color-primary`, `--color-danger`
  * Espaciados: `--spacing-sm`, `--spacing-md`
  * Tipografía: `--font-size-base`, `--font-weight-bold`
* Mantener especificidad baja (evitar selectores anidados)
* Usar naming conventions consistentes (BEM: `.block__element--modifier`)
* Agrupar estilos por componente o funcionalidad
* Comentar secciones y decisiones de diseño complejas

**Ejemplo de variables CSS:**
```css
:root {
  --color-primary: #3b82f6;
  --color-danger: #ef4444;
  --spacing-md: 1rem;
  --border-radius: 0.5rem;
}
```

### 1.3 JavaScript

* Todo el JavaScript debe residir en archivos `.js` separados en `/src/js`
* Importar scripts como **módulos ES6** (`type="module"`)
* **NUNCA** manipular estilos directamente con `.style.property`
* Para cambios de estilo, usar clases CSS y toggle con `.classList`
* Separar lógica de negocio de manipulación del DOM
* Un archivo por módulo/componente/función principal

**Ejemplo correcto:**
```javascript
// ❌ MAL
element.style.display = 'none';
element.style.backgroundColor = 'red';

// ✅ BIEN
element.classList.add('hidden');
element.classList.add('bg-danger');
```

---

## 2. Arquitectura MPA (Multi-Page Application)

* Cada página HTML es **independiente** y tiene su propio contexto
* **NO usar Single Page Application patterns** (no simular routing en JS)
* Navegación entre vistas mediante **enlaces HTML normales** (`<a href="page.html">`)
* Cada página carga **únicamente los recursos CSS/JS que necesita**
* Compartir código común mediante **módulos JavaScript importados**
* Evitar duplicación: crear módulos reutilizables en `/js/components` y `/js/modules`

**Ejemplo de carga de recursos por página:**
```html
<!-- dashboard.html -->
<link rel="stylesheet" href="/css/base.css">
<link rel="stylesheet" href="/css/layout.css">
<link rel="stylesheet" href="/css/components.css">
<link rel="stylesheet" href="/css/pages/dashboard.css">
<script type="module" src="/js/pages/dashboard.js"></script>
```

---

## 3. Gestión de estado y datos

* **NO usar variables globales** excepto configuración inicial necesaria
* Estado debe manejarse en **módulos específicos** con encapsulamiento
* Usar `sessionStorage` o `localStorage` **solo cuando sea necesario**:
  * Token de autenticación
  * Preferencias de usuario no críticas
  * Cache temporal de datos no sensibles
* **Validar SIEMPRE** datos antes de enviar a Supabase
* Manejar **todos** los errores de red y base de datos
* No almacenar información sensible en el navegador

**Patrón de módulo de estado:**
```javascript
// /js/modules/appointment-state.js
const appointmentState = {
  current: null,
  list: [],
  
  setCurrent(appointment) {
    this.current = appointment;
  },
  
  getCurrent() {
    return this.current;
  }
};

export default appointmentState;
```

---

## 4. Nomenclatura y organización

### 4.1 Archivos y carpetas
* **kebab-case** para nombres: `service-form.js`, `toast-notification.css`
* Nombres descriptivos que indiquen su propósito
* Un componente/módulo = un archivo
* Agrupar archivos relacionados en carpetas semánticas

### 4.2 Variables y funciones JavaScript
* **camelCase** para variables/funciones: `getUserData()`, `isActive`
* **PascalCase** para clases: `ServiceManager`, `AppointmentValidator`
* **UPPER_SNAKE_CASE** para constantes: `MAX_APPOINTMENTS_PER_DAY`
* Nombres descriptivos, evitar abreviaciones confusas
* Funciones deben ser verbos: `createUser()`, `validateForm()`
* Variables booleanas con prefijos: `isActive`, `hasError`, `canEdit`

### 4.3 Clases CSS
* Prefijos consistentes por tipo:
  * `.btn-` para botones: `.btn-primary`, `.btn-danger`
  * `.form-` para formularios: `.form-input`, `.form-label`
  * `.card-` para tarjetas: `.card-service`, `.card-professional`
  * `.modal-` para modales: `.modal-overlay`, `.modal-content`
* Estados con BEM: `.btn--disabled`, `.card--active`, `.form-input--error`
* Utilidades: `.u-hidden`, `.u-text-center`

---

## 5. Manejo del DOM

### 5.1 Seguridad y creación de elementos

* **NUNCA** usar `innerHTML` con datos de usuario (riesgo XSS)
* Preferir `textContent` para texto plano
* Usar `createElement` + `appendChild` para estructura HTML
* **Cachear referencias** a elementos DOM reutilizados
* Limpiar event listeners al destruir componentes

**Ejemplos correctos:**
```javascript
// ❌ MAL - Vulnerable a XSS
element.innerHTML = `<div>${userData.name}</div>`;

// ✅ BIEN
const div = document.createElement('div');
div.textContent = userData.name;
element.appendChild(div);

// ✅ BIEN - Cachear referencia
const submitBtn = document.querySelector('#submit-btn');
// Reutilizar submitBtn
```

### 5.2 Selección de elementos

* Preferir `querySelector` y `querySelectorAll` sobre `getElementById`
* Usar selectores específicos para evitar conflictos
* Aprovechar atributos `data-*` para selección semántica
* Validar que el elemento existe antes de usarlo

```javascript
// ✅ Patrón recomendado
const deleteBtn = document.querySelector('[data-action="delete"]');
if (deleteBtn) {
  deleteBtn.addEventListener('click', handleDelete);
}
```

### 5.3 Event Delegation

* Usar **event delegation** para listas dinámicas
* Reduce listeners y mejora rendimiento
* Útil cuando elementos se agregan/eliminan dinámicamente

```javascript
// ✅ Event delegation
document.querySelector('#services-table').addEventListener('click', (e) => {
  if (e.target.matches('[data-action="delete"]')) {
    handleDeleteService(e.target.dataset.id);
  }
  if (e.target.matches('[data-action="edit"]')) {
    handleEditService(e.target.dataset.id);
  }
});
```

---

## 6. Manejo de eventos

* Usar **`addEventListener`** siempre, nunca atributos inline
* Nombrar handlers descriptivos: `handleSubmit`, `onDeleteClick`
* Prevenir comportamiento por defecto cuando sea necesario: `e.preventDefault()`
* Usar `e.stopPropagation()` **solo** cuando sea necesario
* Remover listeners cuando el componente se destruye

**Patrón recomendado:**
```javascript
function initServiceForm() {
  const form = document.querySelector('#service-form');
  const cancelBtn = document.querySelector('#cancel-btn');
  
  form.addEventListener('submit', handleServiceFormSubmit);
  cancelBtn.addEventListener('click', handleServiceFormCancel);
}

async function handleServiceFormSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  // ... lógica de envío
}
```

---

**Continúa en:** `buenas-practicas-2.md`
