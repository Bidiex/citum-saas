---
description: 
---

# Buttons - Workflow

> **Componente**: Botones y variantes  
> **Requiere**: `design-tokens.md`

---

## 🎯 Estructura Base

```css
.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-family: var(--font-sans);
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1;
    white-space: nowrap;
    border-radius: var(--radius);
    border: 1px solid transparent;
    padding: 0.625rem 1rem;
    cursor: pointer;
    transition: all var(--transition);
    text-decoration: none;
}

.btn:focus-visible {
    outline: 2px solid var(--ring);
    outline-offset: 2px;
}

.btn:disabled {
    pointer-events: none;
    opacity: 0.5;
}
```

---

## 🎨 Variantes

### 1. Primary (acción principal)

```css
.btn-primary {
    background-color: var(--primary);
    color: var(--primary-foreground);
}

.btn-primary:hover:not(:disabled) {
    background-color: hsl(222, 47%, 15%);
}
```

**Cuándo usar**: Acción principal de una página o sección (guardar, enviar, continuar).

**Ejemplo**:
```html
<button class="btn btn-primary">Guardar cambios</button>
```

---

### 2. Secondary (acción secundaria)

```css
.btn-secondary {
    background-color: var(--secondary);
    color: var(--secondary-foreground);
}

.btn-secondary:hover:not(:disabled) {
    background-color: hsl(210, 40%, 92%);
}
```

**Cuándo usar**: Acciones alternativas o menos prioritarias.

**Ejemplo**:
```html
<button class="btn btn-secondary">Ver detalles</button>
```

---

### 3. Outline (borde visible)

```css
.btn-outline {
    border-color: var(--border);
    background-color: var(--background);
    color: var(--foreground);
}

.btn-outline:hover:not(:disabled) {
    background-color: var(--accent);
    color: var(--accent-foreground);
}
```

**Cuándo usar**: Acciones secundarias o cancelar.

**Ejemplo**:
```html
<button class="btn btn-outline">Cancelar</button>
```

---

### 4. Ghost (sin fondo)

```css
.btn-ghost {
    background-color: transparent;
    color: var(--foreground);
}

.btn-ghost:hover:not(:disabled) {
    background-color: var(--accent);
    color: var(--accent-foreground);
}
```

**Cuándo usar**: Acciones terciarias, menús, toolbars.

**Ejemplo**:
```html
<button class="btn btn-ghost">Editar</button>
```

---

### 5. Destructive (acciones peligrosas)

```css
.btn-destructive {
    background-color: var(--destructive);
    color: var(--destructive-foreground);
}

.btn-destructive:hover:not(:disabled) {
    background-color: hsl(0, 84%, 55%);
}
```

**Cuándo usar**: Eliminar, desactivar, acciones irreversibles.

**Ejemplo**:
```html
<button class="btn btn-destructive">Eliminar cuenta</button>
```

---

### 6. Link (estilo texto)

```css
.btn-link {
    color: var(--foreground);
    text-decoration: underline;
    background: none;
    border: none;
    padding: 0;
}

.btn-link:hover:not(:disabled) {
    text-decoration: none;
}
```

**Cuándo usar**: Navegación inline, acciones ligeras.

**Ejemplo**:
```html
<button class="btn btn-link">Más información</button>
```

---

## 📏 Tamaños

### Small

```css
.btn-sm {
    font-size: 0.75rem;
    padding: 0.5rem 0.75rem;
}
```

**Ejemplo**:
```html
<button class="btn btn-primary btn-sm">Pequeño</button>
```

---

### Default

Tamaño por defecto (sin clase adicional).

**Ejemplo**:
```html
<button class="btn btn-primary">Normal</button>
```

---

### Large

```css
.btn-lg {
    font-size: 1rem;
    padding: 0.75rem 1.5rem;
}
```

**Ejemplo**:
```html
<button class="btn btn-primary btn-lg">Grande</button>
```

---

## ⚡ Estados Especiales

### Loading

```css
.btn-loading {
    position: relative;
    pointer-events: none;
}

.btn-loader {
    display: inline-block;
    width: 14px;
    height: 14px;
    border: 2px solid currentColor;
    border-right-color: transparent;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}
```

**Ejemplo**:
```html
<button class="btn btn-primary btn-loading">
    <span class="btn-loader"></span>
    Cargando...
</button>
```

---

### Disabled

Ya incluido en la clase base con `:disabled`.

**Ejemplo**:
```html
<button class="btn btn-primary" disabled>Deshabilitado</button>
```

---

## 🎨 Botones con Iconos

### Icono a la izquierda

```html
<button class="btn btn-primary">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
    Continuar
</button>
```

### Icono a la derecha

```html
<button class="btn btn-outline">
    Descargar
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
    </svg>
</button>
```

### Solo icono

```html
<button class="btn btn-ghost" style="padding: 0.5rem;">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="1"/>
        <circle cx="12" cy="5" r="1"/>
        <circle cx="12" cy="19" r="1"/>
    </svg>
</button>
```

---

## 📦 Grupos de Botones

### Horizontal

```html
<div style="display: flex; gap: var(--spacing-sm);">
    <button class="btn btn-outline">Cancelar</button>
    <button class="btn btn-primary">Guardar</button>
</div>
```

### Con jerarquía clara

```html
<div style="display: flex; gap: var(--spacing-sm); justify-content: flex-end;">
    <button class="btn btn-ghost">Eliminar</button>
    <button class="btn btn-outline">Cancelar</button>
    <button class="btn btn-primary">Continuar</button>
</div>
```

---

## 🎯 Patrones de Uso

### Patrón: Confirmación

```html
<div class="modal-footer">
    <button class="btn btn-outline">Cancelar</button>
    <button class="btn btn-primary">Confirmar</button>
</div>
```

### Patrón: Destrucción

```html
<div style="display: flex; gap: var(--spacing-sm);">
    <button class="btn btn-outline">No, cancelar</button>
    <button class="btn btn-destructive">Sí, eliminar</button>
</div>
```

### Patrón: Form Actions

```html
<div style="display: flex; gap: var(--spacing-sm); justify-content: space-between;">
    <button type="button" class="btn btn-ghost">Borrar formulario</button>
    <div style="display: flex; gap: var(--spacing-sm);">
        <button type="button" class="btn btn-outline">Guardar borrador</button>
        <button type="submit" class="btn btn-primary">Enviar</button>
    </div>
</div>
```

---

## ✅ Checklist

Antes de implementar un botón:

- [ ] Usa clase base `.btn`
- [ ] Incluye variante apropiada (primary, outline, etc)
- [ ] Tiene estado hover definido
- [ ] Tiene estado focus-visible
- [ ] Tiene estado disabled si aplica
- [ ] Incluye transición suave
- [ ] Texto claro y accionable
- [ ] Tamaño apropiado al contexto

---

## 🚫 Errores Comunes

### ❌ NO hacer:
```html
<!-- Múltiples botones primary en una sección -->
<button class="btn btn-primary">Guardar</button>
<button class="btn btn-primary">Cancelar</button>

<!-- Sin jerarquía clara -->
<button class="btn btn-primary">Eliminar</button>
```

### ✅ Hacer:
```html
<!-- Jerarquía clara -->
<button class="btn btn-outline">Cancelar</button>
<button class="btn btn-primary">Guardar</button>

<!-- Destructive para eliminar -->
<button class="btn btn-destructive">Eliminar</button>
```

---

## 🎨 Ejemplos Completos

### Toolbar

```html
<div style="display: flex; gap: var(--spacing-xs); align-items: center;">
    <button class="btn btn-ghost btn-sm">
        <svg width="16" height="16">...</svg>
        Editar
    </button>
    <button class="btn btn-ghost btn-sm">
        <svg width="16" height="16">...</svg>
        Duplicar
    </button>
    <div style="width: 1px; height: 20px; background: var(--border);"></div>
    <button class="btn btn-ghost btn-sm">
        <svg width="16" height="16">...</svg>
        Eliminar
    </button>
</div>
```

### Card Actions

```html
<div class="card-footer">
    <button class="btn btn-outline btn-sm">Rechazar</button>
    <button class="btn btn-primary btn-sm">Aprobar</button>
</div>
```

### Loading State

```html
<button class="btn btn-primary btn-loading" disabled>
    <span class="btn-loader"></span>
    Procesando...
</button>
```

---

## 📊 Jerarquía de Botones

```
Página/Sección
    ↓
1 botón primary (máximo) → Acción principal
    ↓
N botones outline → Acciones secundarias
    ↓
N botones ghost → Acciones terciarias
    ↓
1 botón destructive (si aplica) → Acción peligrosa
```

---

**Caracteres**: ~6,800 (optimizado para Antigravity)