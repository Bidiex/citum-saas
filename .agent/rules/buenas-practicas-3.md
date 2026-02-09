---
trigger: model_decision
description: Contiene instrucciones para: Testing y debugging Git y control de versiones Checklist completo Patrones comunes Anti-patrones a evitar
---

# Buenas Prácticas - Parte 3: Testing, Git y Checklist

## 13. Testing y debugging

### 13.1 Console logs

* Usar `console.log` en desarrollo, **eliminar** antes de producción
* Usar `console.error` para errores reales
* Usar `console.warn` para advertencias importantes
* Usar `console.table` para visualizar arrays/objetos

### 13.2 Debugging

* Usar breakpoints en DevTools en lugar de múltiples console.logs
* Validar estado de la aplicación en cada paso crítico
* Probar edge cases y escenarios de error
* Probar en diferentes navegadores y dispositivos

### 13.3 Manejo de estados de la UI

* Implementar estados visuales claros:
  * **Loading**: skeleton screens, spinners
  * **Empty**: mensajes y CTA claros
  * **Error**: mensajes específicos y acciones de recuperación
  * **Success**: confirmación visual

```javascript
// ✅ Patrón de estados visuales
async function loadServices() {
  showLoadingState();
  
  try {
    const services = await fetchServices();
    
    if (services.length === 0) {
      showEmptyState('No hay servicios disponibles', {
        action: 'Crear primer servicio',
        onClick: () => openServiceForm()
      });
      return;
    }
    
    renderServices(services);
    
  } catch (error) {
    showErrorState('Error al cargar servicios', {
      action: 'Reintentar',
      onClick: () => loadServices()
    });
  }
}
```

---

## 14. Git y control de versiones

### 14.1 Commits

* Commits pequeños y atómicos (una funcionalidad/fix por commit)
* Mensajes descriptivos en español:
  * `feat: agregar formulario de creación de servicios`
  * `fix: corregir validación de fechas en promociones`
  * `refactor: mejorar estructura de módulo de agenda`
  * `style: ajustar espaciado en tarjetas de profesionales`

### 14.2 Branches

* `main`: código en producción, siempre estable
* `develop`: integración de features
* `feature/nombre-feature`: desarrollo de nuevas funcionalidades
* `fix/nombre-bug`: corrección de bugs

### 14.3 .gitignore

* Ignorar archivos de configuración local
* Ignorar `node_modules/`
* Ignorar archivos de build generados
* **NUNCA** commitear archivos con credenciales

---

## 15. Checklist de implementación

Antes de implementar cualquier funcionalidad, verificar:

### 15.1 HTML/CSS/JS
- [ ] ¿Estoy usando HTML semántico sin estilos inline ni scripts inline?
- [ ] ¿Estoy separando correctamente HTML, CSS y JS en archivos distintos?
- [ ] ¿Estoy usando `classList` en lugar de manipular `.style` directamente?
- [ ] ¿Los nombres de archivo usan kebab-case?
- [ ] ¿Las variables usan camelCase y las clases CSS tienen prefijos consistentes?

### 15.2 Lógica y errores
- [ ] ¿Tengo manejo de errores con try/catch en todo código asíncrono?
- [ ] ¿Estoy validando datos antes de enviar a Supabase?
- [ ] ¿Estoy usando el sistema de toast para feedback al usuario?
- [ ] ¿Estoy usando dialogs para confirmaciones críticas?
- [ ] ¿Implementé los estados loading, empty y error?

### 15.3 Seguridad y rendimiento
- [ ] ¿Evité usar innerHTML con datos de usuario?
- [ ] ¿Las consultas a Supabase son eficientes (solo campos necesarios)?
- [ ] ¿Implementé lazy loading en imágenes?
- [ ] ¿Usé debounce en búsquedas y filtros?
- [ ] ¿Validé en cliente Y servidor?

### 15.4 Accesibilidad
- [ ] ¿El código es accesible por teclado?
- [ ] ¿Todos los inputs tienen labels apropiados?
- [ ] ¿Hay contraste suficiente en colores?
- [ ] ¿Las imágenes tienen atributo alt?
- [ ] ¿Usé etiquetas semánticas HTML5?

### 15.5 Calidad general
- [ ] ¿El código es legible y sigue las convenciones de nomenclatura?
- [ ] ¿Comenté el "por qué" cuando es necesario?
- [ ] ¿No hay errores en consola?
- [ ] ¿El diseño es responsive (mobile, tablet, desktop)?
- [ ] ¿Probé edge cases y escenarios de error?

---

## 16. Patrones comunes a seguir

### 16.1 Inicialización de página

```javascript
// ✅ Patrón estándar de inicialización
document.addEventListener('DOMContentLoaded', async () => {
  try {
    await checkAuth(); // Verificar autenticación
    initComponents(); // Inicializar componentes UI
    await loadInitialData(); // Cargar datos iniciales
    attachEventListeners(); // Agregar event listeners
  } catch (error) {
    console.error('Error al inicializar página:', error);
    showToast('error', 'Error al cargar la página');
  }
});
```

### 16.2 Formularios

```javascript
// ✅ Patrón estándar de formulario
async function handleFormSubmit(e) {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
  
  // Validar
  const validation = validateData(data);
  if (!validation.isValid) {
    showValidationErrors(validation.errors);
    return;
  }
  
  // Deshabilitar botón
  const submitBtn = e.target.querySelector('[type="submit"]');
  submitBtn.disabled = true;
  
  try {
    const result = await saveToDatabase(data);
    showToast('success', 'Guardado exitosamente');
    resetForm(e.target);
  } catch (error) {
    console.error('Error al guardar:', error);
    showToast('error', 'Error al guardar los datos');
  } finally {
    submitBtn.disabled = false;
  }
}
```

### 16.3 Consultas a Supabase

```javascript
// ✅ Patrón estándar de consulta
async function fetchServices(filters = {}) {
  try {
    let query = supabase
      .from('services')
      .select('id, nombre, precio, duracion, categoria_id');
    
    // Aplicar filtros opcionales
    if (filters.categoria_id) {
      query = query.eq('categoria_id', filters.categoria_id);
    }
    
    if (filters.estado) {
      query = query.eq('estado', filters.estado);
    }
    
    // Ordenar
    query = query.order('nombre');
    
    const { data, error } = await query;
    
    if (error) throw error;
    
    return data || [];
    
  } catch (error) {
    console.error('Error al cargar servicios:', error);
    throw error;
  }
}
```

### 16.4 Renderizado de listas

```javascript
// ✅ Patrón estándar de renderizado
function renderServicesList(services) {
  const container = document.querySelector('#services-list');
  
  // Limpiar contenedor
  container.innerHTML = '';
  
  // Verificar si hay datos
  if (services.length === 0) {
    showEmptyState(container, 'No hay servicios disponibles');
    return;
  }
  
  // Crear elementos
  services.forEach(service => {
    const card = createServiceCard(service);
    container.appendChild(card);
  });
}

function createServiceCard(service) {
  const card = document.createElement('div');
  card.className = 'card-service';
  card.dataset.id = service.id;
  
  const title = document.createElement('h3');
  title.textContent = service.nombre;
  
  const price = document.createElement('p');
  price.className = 'service-price';
  price.textContent = `$${service.precio}`;
  
  card.appendChild(title);
  card.appendChild(price);
  
  return card;
}
```

---

## 17. Anti-patrones a evitar

### ❌ NO hacer:

```javascript
// Variables globales
var globalData = {};

// Manipulación directa de estilos
element.style.display = 'none';

// innerHTML con datos de usuario
element.innerHTML = userData;

// Event listeners inline
element.onclick = function() { };

// Promesas sin manejo de errores
fetchData(); // Sin await ni .catch()

// Selectores repetitivos
document.querySelector('#btn').addEventListener(...);
document.querySelector('#btn').classList.add(...);
document.querySelector('#btn').textContent = '...';
```

### ✅ SÍ hacer:

```javascript
// Módulos encapsulados
const appState = { /* ... */ };
export default appState;

// Clases CSS
element.classList.add('hidden');

// createElement + textContent
const div = document.createElement('div');
div.textContent = userData;

// addEventListener
element.addEventListener('click', handler);

// try/catch
try {
  await fetchData();
} catch (error) {
  handleError(error);
}

// Cachear referencias
const btn = document.querySelector('#btn');
btn.addEventListener(...);
btn.classList.add(...);
btn.textContent = '...';
```

---

**Versión:** 1.0  
**Proyecto:** Citum SaaS  
**Última actualización:** 2025

Este documento debe ser consultado constantemente. Ante cualquier duda, **siempre elegir la opción más simple, clara y mantenible**.
