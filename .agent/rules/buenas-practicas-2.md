---
trigger: model_decision
description: Contiene instrucciones para: Manejo de errores Validación de datos Optimización y rendimiento Accesibilidad Seguridad Comentarios y documentación
---

# Buenas Prácticas - Parte 2: Errores, Validación y Optimización

## 7. Manejo de errores

* **TODO** código asíncrono debe estar en bloques `try/catch`
* Loggear errores en consola: `console.error('Context:', error)`
* Mostrar mensajes **amigables** al usuario mediante toast
* **Nunca** dejar promesas sin manejar
* Diferenciar errores técnicos de errores de negocio

**Patrón obligatorio:**
```javascript
// ✅ Manejo completo de errores
async function loadServices() {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('estado', 'activo');
    
    if (error) throw error;
    
    if (!data || data.length === 0) {
      showEmptyState('No hay servicios disponibles');
      return;
    }
    
    renderServices(data);
    
  } catch (error) {
    console.error('Error al cargar servicios:', error);
    showToast('error', 'No se pudieron cargar los servicios.');
  }
}
```

### 7.1 Tipos de errores a manejar

* Errores de red (sin conexión, timeout)
* Errores de Supabase (permisos, constraints, RLS)
* Errores de validación de datos
* Errores de lógica de negocio (fechas inválidas, solapamientos)
* Errores inesperados (catch genérico)

---

## 8. Validación de datos

### 8.1 Validación en cliente (UI)

* Validar **antes** de enviar al servidor
* Mostrar errores en tiempo real
* Usar atributos HTML5: `required`, `pattern`, `min`, `max`, `type`
* Validaciones personalizadas en JS para reglas complejas
* Deshabilitar botón de submit durante envío

**Ejemplo de validación:**
```javascript
function validateAppointmentForm(formData) {
  const errors = [];
  
  if (!formData.service_id) {
    errors.push('Debes seleccionar un servicio');
  }
  
  if (!formData.professional_id) {
    errors.push('Debes seleccionar un profesional');
  }
  
  const appointmentDate = new Date(formData.date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (appointmentDate < today) {
    errors.push('No puedes agendar citas en el pasado');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}
```

### 8.2 Validación en servidor (Supabase)

* **NUNCA** confiar únicamente en validación del cliente
* Usar **constraints** en BD: `NOT NULL`, `UNIQUE`, `CHECK`
* Implementar **Row Level Security (RLS)** policies
* Validar reglas de negocio con triggers o funciones

---

## 9. Optimización y rendimiento

### 9.1 Imágenes y assets

* Optimizar imágenes antes de subirlas
* Usar formatos modernos: WebP con fallback a JPG/PNG
* Implementar lazy loading: `loading="lazy"`
* Definir `width` y `height` para evitar layout shift
* Usar responsive images con `srcset` cuando aplique

```html
<!-- ✅ Imagen optimizada -->
<img 
  src="/images/service.webp" 
  alt="Corte de cabello"
  width="300" 
  height="200"
  loading="lazy"
>
```

### 9.2 Consultas a Supabase

* **Minimizar consultas** innecesarias
* Usar `select()` solo con campos necesarios
* Implementar paginación para listas largas
* Cachear datos que no cambian frecuentemente
* Usar índices en columnas consultadas frecuentemente

```javascript
// ❌ MAL - Trae todo
const { data } = await supabase.from('services').select('*');

// ✅ BIEN - Solo lo necesario
const { data } = await supabase
  .from('services')
  .select('id, nombre, precio, duracion')
  .eq('estado', 'activo')
  .order('nombre');
```

### 9.3 Interacciones en tiempo real

* Usar **debounce** en búsquedas y filtros
* Evitar re-renders innecesarios del DOM
* Actualizar solo las partes que cambiaron

```javascript
// ✅ Debounce en búsqueda
let searchTimeout;
searchInput.addEventListener('input', (e) => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    performSearch(e.target.value);
  }, 300);
});
```

---

## 10. Accesibilidad (A11y)

### 10.1 HTML semántico

* Usar etiquetas HTML5: `<nav>`, `<main>`, `<article>`, `<aside>`, `<section>`
* Todo `<input>` debe tener su `<label>` asociado
* Usar `<button>` para acciones, `<a>` para navegación
* Estructurar con headings jerárquicos (`<h1>` → `<h6>`)

```html
<!-- ✅ Formulario accesible -->
<form>
  <label for="service-name">Nombre del servicio</label>
  <input type="text" id="service-name" required>
  
  <label for="service-duration">Duración (minutos)</label>
  <input type="number" id="service-duration" min="15" required>
</form>
```

### 10.2 ARIA y teclado

* Usar atributos ARIA cuando sea necesario:
  * `aria-label`: elementos sin texto visible
  * `aria-hidden="true"`: elementos decorativos
  * `aria-live`: notificaciones dinámicas
* Asegurar **navegación completa por teclado**:
  * Tab / Shift+Tab entre elementos
  * Enter para activar botones/links
  * Esc para cerrar modales
  * Flechas para listas/menús
* Indicador visual de focus (`:focus` styles)

### 10.3 Contraste y legibilidad

* Contraste mínimo **WCAG AA**: 4.5:1 para texto normal
* Texto legible: tamaño mínimo 16px para body
* No depender solo del color para transmitir información
* Textos alternativos descriptivos en imágenes (`alt`)

---

## 11. Seguridad

### 11.1 Frontend

* **NUNCA** exponer credenciales o API keys
* Sanitizar **todas** las entradas de usuario
* Usar HTTPS en producción
* No almacenar información sensible en localStorage/sessionStorage
* Implementar CSRF protection en formularios críticos

### 11.2 Supabase

* Implementar **Row Level Security (RLS)** en todas las tablas
* Validar permisos en cada operación
* Usar políticas restrictivas por defecto
* No exponer datos sensibles en respuestas

**Ejemplo de RLS policy:**
```sql
-- Solo el propietario puede ver sus profesionales
CREATE POLICY "Users can view their own professionals"
ON professionals
FOR SELECT
USING (auth.uid() = business_owner_id);
```

### 11.3 Validación doble

* Validar en **cliente Y servidor**
* No confiar en validación del frontend únicamente
* El backend (Supabase) es la última línea de defensa

---

## 12. Comentarios y documentación

### 12.1 Cuándo comentar

* Comentar **por qué**, no **qué** hace el código
* Documentar funciones complejas con **JSDoc**
* Explicar decisiones de diseño no obvias
* Marcar TODOs, FIXMEs y WARNINGs

### 12.2 Cuándo NO comentar

* Evitar comentarios obvios o redundantes
* No comentar código mal escrito (refactorizar)
* Mantener comentarios actualizados con el código

**Ejemplos:**
```javascript
// ❌ MAL - Comentario obvio
// Suma dos números
function add(a, b) { return a + b; }

// ✅ BIEN - Explica el "por qué"
// Usamos 15min como intervalo mínimo (estándar industria)
const MIN_APPOINTMENT_INTERVAL = 15;

/**
 * Valida solapamiento de citas para un profesional
 * @param {string} professionalId - ID del profesional
 * @param {Date} startTime - Hora de inicio
 * @param {number} duration - Duración en minutos
 * @returns {Promise<boolean>} True si hay solapamiento
 */
async function checkAppointmentOverlap(professionalId, startTime, duration) {
  // ... implementación
}
```

---

**Continúa en:** `buenas-practicas-3.md`
