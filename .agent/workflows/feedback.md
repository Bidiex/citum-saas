---
description: 
---

# Feedback - Workflow

> **Componente**: Alerts, Badges, Loaders, Toasts  
> **Requiere**: `design-tokens.md`

---

## 🚨 Alerts

### Estructura Base

```css
.alert {
    display: flex;
    gap: var(--spacing-md);
    padding: var(--spacing-md);
    border-radius: var(--radius);
    border: 1px solid;
}

.alert svg {
    flex-shrink: 0;
    margin-top: 2px;
}

.alert strong {
    display: block;
    font-weight: 600;
    margin-bottom: var(--spacing-xs);
}

.alert p {
    margin: 0;
    font-size: 0.875rem;
}
```

---

### Variantes

#### Info

```css
.alert-info {
    background-color: hsl(199, 89%, 95%);
    border-color: hsl(199, 89%, 80%);
    color: hsl(199, 89%, 30%);
}
```

**Cuándo usar**: Información neutral, tips, notas.

**Ejemplo**:
```html
<div class="alert alert-info">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 16v-4M12 8h.01"/>
    </svg>
    <div>
        <strong>Información</strong>
        <p>Esta es una alerta informativa con contenido adicional.</p>
    </div>
</div>
```

---

#### Success

```css
.alert-success {
    background-color: hsl(142, 71%, 95%);
    border-color: hsl(142, 71%, 75%);
    color: hsl(142, 71%, 25%);
}
```

**Cuándo usar**: Operaciones exitosas, confirmaciones.

**Ejemplo**:
```html
<div class="alert alert-success">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
    <div>
        <strong>Éxito</strong>
        <p>Tu operación se completó correctamente.</p>
    </div>
</div>
```

---

#### Warning

```css
.alert-warning {
    background-color: hsl(38, 92%, 95%);
    border-color: hsl(38, 92%, 75%);
    color: hsl(38, 92%, 25%);
}
```

**Cuándo usar**: Advertencias, precauciones, acciones que requieren atención.

**Ejemplo**:
```html
<div class="alert alert-warning">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
        <line x1="12" y1="9" x2="12" y2="13"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
    <div>
        <strong>Advertencia</strong>
        <p>Considera revisar esta información antes de continuar.</p>
    </div>
</div>
```

---

#### Error

```css
.alert-error {
    background-color: hsl(0, 84%, 95%);
    border-color: hsl(0, 84%, 75%);
    color: hsl(0, 84%, 35%);
}
```

**Cuándo usar**: Errores, fallos, problemas críticos.

**Ejemplo**:
```html
<div class="alert alert-error">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/>
        <line x1="15" y1="9" x2="9" y2="15"/>
        <line x1="9" y1="9" x2="15" y2="15"/>
    </svg>
    <div>
        <strong>Error</strong>
        <p>Ocurrió un problema al procesar tu solicitud.</p>
    </div>
</div>
```

---

## 🏷️ Badges

### Estructura Base

```css
.badge {
    display: inline-flex;
    align-items: center;
    font-size: 0.75rem;
    font-weight: 500;
    padding: 0.25rem 0.625rem;
    border-radius: var(--radius);
    background-color: var(--primary);
    color: var(--primary-foreground);
}
```

---

### Variantes

```css
/* Secondary */
.badge-secondary {
    background-color: var(--secondary);
    color: var(--secondary-foreground);
}

/* Success */
.badge-success {
    background-color: var(--success);
    color: var(--success-foreground);
}

/* Warning */
.badge-warning {
    background-color: var(--warning);
    color: var(--warning-foreground);
}

/* Error */
.badge-error {
    background-color: var(--destructive);
    color: var(--destructive-foreground);
}

/* Outline */
.badge-outline {
    background-color: transparent;
    color: var(--foreground);
    border: 1px solid var(--border);
}
```

---

### Ejemplos

```html
<span class="badge">Default</span>
<span class="badge badge-secondary">Secondary</span>
<span class="badge badge-success">Activo</span>
<span class="badge badge-warning">Pendiente</span>
<span class="badge badge-error">Inactivo</span>
<span class="badge badge-outline">Draft</span>
```

---

### Badges en Contexto

**En tabla**:
```html
<td><span class="badge badge-success">Activo</span></td>
<td><span class="badge badge-warning">Pendiente</span></td>
<td><span class="badge badge-error">Inactivo</span></td>
```

**Con contador**:
```html
<button class="btn btn-ghost">
    Notificaciones
    <span class="badge badge-error">5</span>
</button>
```

---

## ⏳ Loaders

### Spinner Base

```css
.loader {
    width: 24px;
    height: 24px;
    border: 3px solid var(--muted);
    border-top-color: var(--primary);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

.loader-sm {
    width: 16px;
    height: 16px;
    border-width: 2px;
}

.loader-lg {
    width: 32px;
    height: 32px;
    border-width: 4px;
}
```

---

### Ejemplos

**Tamaños**:
```html
<div class="loader loader-sm"></div>
<div class="loader"></div>
<div class="loader loader-lg"></div>
```

**En botón** (ver `buttons.md`):
```html
<button class="btn btn-primary btn-loading" disabled>
    <span class="btn-loader"></span>
    Cargando...
</button>
```

**Centrado en página**:
```html
<div style="display: flex; justify-content: center; align-items: center; min-height: 200px;">
    <div class="loader"></div>
</div>
```

---

## 🔔 Toast Notifications

### Estructura

```css
.toast {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--spacing-md);
    max-width: 400px;
    padding: var(--spacing-md);
    background-color: var(--card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    box-shadow: var(--shadow-lg);
}

.toast-content {
    display: flex;
    gap: var(--spacing-md);
    flex: 1;
}

.toast-content svg {
    flex-shrink: 0;
    margin-top: 2px;
}

.toast strong {
    display: block;
    font-weight: 600;
    margin-bottom: var(--spacing-xs);
    font-size: 0.875rem;
}

.toast p {
    margin: 0;
    font-size: 0.75rem;
    color: var(--muted-foreground);
}

.toast-close {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    color: var(--muted-foreground);
    transition: color var(--transition);
    flex-shrink: 0;
}

.toast-close:hover {
    color: var(--foreground);
}
```

---

### Ejemplo

```html
<div class="toast">
    <div class="toast-content">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
        <div>
            <strong>Cambios guardados</strong>
            <p>Tu información ha sido actualizada correctamente</p>
        </div>
    </div>
    <button class="toast-close">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
    </button>
</div>
```

---

### Toast Container (para posicionamiento)

```css
.toast-container {
    position: fixed;
    top: var(--spacing-lg);
    right: var(--spacing-lg);
    z-index: 9999;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
}
```

**Uso**:
```html
<div class="toast-container">
    <div class="toast">...</div>
    <div class="toast">...</div>
</div>
```

---

## 🎯 Patrones de Uso

### Alert de validación en formulario

```html
<form>
    <div class="alert alert-error" style="margin-bottom: var(--spacing-lg);">
        <svg>...</svg>
        <div>
            <strong>Error en el formulario</strong>
            <p>Por favor corrige los campos marcados en rojo.</p>
        </div>
    </div>
    
    <!-- resto del formulario -->
</form>
```

---

### Estado de página con loader

```html
<div class="card">
    <div class="card-content" style="text-align: center; padding: var(--spacing-2xl);">
        <div class="loader" style="margin: 0 auto var(--spacing-md);"></div>
        <p class="text-muted">Cargando datos...</p>
    </div>
</div>
```

---

### Lista con badges de estado

```html
<div class="table-container">
    <table class="table">
        <tbody>
            <tr>
                <td>Usuario 1</td>
                <td><span class="badge badge-success">Activo</span></td>
            </tr>
            <tr>
                <td>Usuario 2</td>
                <td><span class="badge badge-warning">Pendiente</span></td>
            </tr>
            <tr>
                <td>Usuario 3</td>
                <td><span class="badge badge-error">Suspendido</span></td>
            </tr>
        </tbody>
    </table>
</div>
```

---

## ✅ Checklist

Antes de implementar feedback:

- [ ] Usa el tipo apropiado (alert, badge, loader, toast)
- [ ] Color semántico correcto (success, warning, error, info)
- [ ] Mensaje claro y accionable
- [ ] Iconos consistentes con el tipo
- [ ] No bloquea interacción innecesariamente
- [ ] Se puede cerrar si es persistente
- [ ] Tiene contraste adecuado

---

## 🚫 Errores Comunes

### ❌ NO hacer:
```html
<!-- Color incorrecto para el contexto -->
<div class="alert alert-success">
    <strong>Error</strong>
    <p>No se pudo guardar</p>
</div>

<!-- Múltiples alerts al mismo tiempo -->
<div class="alert alert-error">...</div>
<div class="alert alert-warning">...</div>
<div class="alert alert-info">...</div>
```

### ✅ Hacer:
```html
<!-- Color apropiado -->
<div class="alert alert-error">
    <strong>Error</strong>
    <p>No se pudo guardar</p>
</div>

<!-- Un mensaje principal -->
<div class="alert alert-error">
    <strong>Errores encontrados</strong>
    <p>Revisa los 3 campos marcados en rojo.</p>
</div>
```

---

## 📊 Jerarquía de Feedback

```
Error crítico → Alert error
    ↓
Advertencia → Alert warning
    ↓
Confirmación → Toast success
    ↓
Información → Alert info / Badge
    ↓
Estado → Badge
```

---

**Caracteres**: ~8,900 (optimizado para Antigravity)