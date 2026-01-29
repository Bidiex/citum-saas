---
description: 
---

# Layout - Workflow

> **Componente**: Cards, Modals, Tabs, Dividers  
> **Requiere**: `design-tokens.md`

---

## 🗂️ Cards

### Estructura Base

```css
.card {
    background-color: var(--card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    overflow: hidden;
}

.card-hover {
    transition: all var(--transition);
    cursor: pointer;
}

.card-hover:hover {
    box-shadow: var(--shadow-md);
    border-color: hsl(214.3, 31.8%, 85%);
}
```

---

### Card Header

```css
.card-header {
    padding: var(--spacing-lg);
    border-bottom: 1px solid var(--border);
}

.card-header h4 {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: var(--spacing-xs);
}

.card-header p {
    font-size: 0.875rem;
    color: var(--muted-foreground);
    margin: 0;
}
```

---

### Card Content

```css
.card-content {
    padding: var(--spacing-lg);
}

.card-content p {
    margin: 0;
}
```

---

### Card Footer

```css
.card-footer {
    display: flex;
    justify-content: flex-end;
    gap: var(--spacing-sm);
    padding: var(--spacing-lg);
    border-top: 1px solid var(--border);
    background-color: var(--muted);
}
```

---

### Ejemplos

**Card básica**:
```html
<div class="card">
    <div class="card-header">
        <h4>Título de la Card</h4>
        <p>Subtítulo descriptivo</p>
    </div>
    <div class="card-content">
        <p>Contenido de la tarjeta con información relevante.</p>
    </div>
</div>
```

**Card con footer**:
```html
<div class="card">
    <div class="card-header">
        <h4>Confirmación</h4>
        <p>¿Deseas continuar?</p>
    </div>
    <div class="card-content">
        <p>Esta acción no se puede deshacer.</p>
    </div>
    <div class="card-footer">
        <button class="btn btn-outline btn-sm">Cancelar</button>
        <button class="btn btn-primary btn-sm">Continuar</button>
    </div>
</div>
```

**Card interactiva**:
```html
<div class="card card-hover">
    <div class="card-header">
        <h4>Proyecto Alpha</h4>
        <p>Última actualización: Hoy</p>
    </div>
    <div class="card-content">
        <p>Descripción del proyecto y estado actual.</p>
    </div>
</div>
```

---

## 🪟 Modals

### Estructura

```css
.modal {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 50;
}

.modal-content {
    background-color: var(--card);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
    max-width: 500px;
    width: 100%;
    max-height: 90vh;
    overflow: auto;
}

.modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--spacing-lg);
    border-bottom: 1px solid var(--border);
}

.modal-header h3 {
    margin: 0;
    font-size: 1.125rem;
    font-weight: 600;
}

.modal-close {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.25rem;
    color: var(--muted-foreground);
    transition: color var(--transition);
    border-radius: var(--radius-sm);
}

.modal-close:hover {
    color: var(--foreground);
    background-color: var(--muted);
}

.modal-body {
    padding: var(--spacing-lg);
}

.modal-body p {
    margin: 0;
    color: var(--muted-foreground);
}

.modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: var(--spacing-sm);
    padding: var(--spacing-lg);
    border-top: 1px solid var(--border);
    background-color: var(--muted);
}
```

---

### Ejemplo

```html
<div class="modal">
    <div class="modal-content">
        <div class="modal-header">
            <h3>Confirmar acción</h3>
            <button class="modal-close">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
            </button>
        </div>
        <div class="modal-body">
            <p>¿Estás seguro de que deseas continuar con esta acción?</p>
        </div>
        <div class="modal-footer">
            <button class="btn btn-ghost">Cancelar</button>
            <button class="btn btn-primary">Confirmar</button>
        </div>
    </div>
</div>
```

---

### Modal con Formulario

```html
<div class="modal">
    <div class="modal-content">
        <div class="modal-header">
            <h3>Editar perfil</h3>
            <button class="modal-close">
                <svg>...</svg>
            </button>
        </div>
        <div class="modal-body">
            <div class="form-group">
                <label class="form-label">Nombre</label>
                <input type="text" class="form-input" value="Juan Pérez">
            </div>
            <div class="form-group">
                <label class="form-label">Email</label>
                <input type="email" class="form-input" value="juan@example.com">
            </div>
        </div>
        <div class="modal-footer">
            <button class="btn btn-outline">Cancelar</button>
            <button class="btn btn-primary">Guardar</button>
        </div>
    </div>
</div>
```

---

## 📑 Tabs

### Estructura

```css
.tabs {
    border: 1px solid var(--border);
    border-radius: var(--radius);
    overflow: hidden;
}

.tab-list {
    display: flex;
    background-color: var(--muted);
    border-bottom: 1px solid var(--border);
}

.tab {
    flex: 1;
    padding: var(--spacing-md) var(--spacing-lg);
    background: none;
    border: none;
    border-bottom: 2px solid transparent;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--muted-foreground);
    cursor: pointer;
    transition: all var(--transition);
}

.tab:hover:not(:disabled) {
    color: var(--foreground);
    background-color: var(--background);
}

.tab-active {
    color: var(--foreground);
    background-color: var(--background);
    border-bottom-color: var(--primary);
}

.tab:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.tab-content {
    padding: var(--spacing-lg);
    background-color: var(--background);
}

.tab-content h4 {
    margin-bottom: var(--spacing-sm);
}

.tab-content p {
    color: var(--muted-foreground);
    margin-bottom: 0;
}
```

---

### Ejemplo

```html
<div class="tabs">
    <div class="tab-list">
        <button class="tab tab-active">General</button>
        <button class="tab">Seguridad</button>
        <button class="tab">Notificaciones</button>
        <button class="tab" disabled>Premium</button>
    </div>
    <div class="tab-content">
        <h4>Configuración General</h4>
        <p>Aquí puedes modificar la configuración general de tu cuenta.</p>
        
        <div class="form-group" style="margin-top: var(--spacing-lg);">
            <label class="form-label">Nombre de usuario</label>
            <input type="text" class="form-input" value="usuario123">
        </div>
    </div>
</div>
```

---

## ➗ Dividers

### Horizontal

```css
.divider {
    height: 1px;
    background-color: var(--border);
    margin: var(--spacing-lg) 0;
}
```

**Ejemplo**:
```html
<p>Contenido superior</p>
<div class="divider"></div>
<p>Contenido inferior</p>
```

---

### Con Texto

```css
.divider-text {
    display: flex;
    align-items: center;
    text-align: center;
    height: auto;
    background: none;
}

.divider-text::before,
.divider-text::after {
    content: "";
    flex: 1;
    height: 1px;
    background-color: var(--border);
}

.divider-text span {
    padding: 0 var(--spacing-md);
    font-size: 0.75rem;
    color: var(--muted-foreground);
    text-transform: uppercase;
    font-weight: 500;
    letter-spacing: 0.05em;
}
```

**Ejemplo**:
```html
<div class="divider-text">
    <span>O continuar con</span>
</div>

<div style="display: flex; gap: var(--spacing-sm); margin-top: var(--spacing-md);">
    <button class="btn btn-outline" style="flex: 1;">Google</button>
    <button class="btn btn-outline" style="flex: 1;">GitHub</button>
</div>
```

---

## 🎯 Patrones de Uso

### Dashboard con Cards

```html
<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: var(--spacing-lg);">
    <div class="card">
        <div class="card-header">
            <h4>Usuarios Activos</h4>
            <p>Últimas 24 horas</p>
        </div>
        <div class="card-content">
            <h2>1,234</h2>
        </div>
    </div>
    
    <div class="card">
        <div class="card-header">
            <h4>Ventas</h4>
            <p>Este mes</p>
        </div>
        <div class="card-content">
            <h2>$45,231</h2>
        </div>
    </div>
</div>
```

---

### Modal de Confirmación Destructiva

```html
<div class="modal">
    <div class="modal-content">
        <div class="modal-header">
            <h3>¿Eliminar cuenta?</h3>
            <button class="modal-close">...</button>
        </div>
        <div class="modal-body">
            <p>Esta acción no se puede deshacer. Todos tus datos serán eliminados permanentemente.</p>
        </div>
        <div class="modal-footer">
            <button class="btn btn-outline">Cancelar</button>
            <button class="btn btn-destructive">Eliminar</button>
        </div>
    </div>
</div>
```

---

### Configuración con Tabs

```html
<div class="tabs">
    <div class="tab-list">
        <button class="tab tab-active">Perfil</button>
        <button class="tab">Privacidad</button>
        <button class="tab">Notificaciones</button>
    </div>
    <div class="tab-content">
        <!-- Contenido del tab activo -->
        <h4>Información del perfil</h4>
        <form>
            <div class="form-group">
                <label class="form-label">Nombre completo</label>
                <input type="text" class="form-input">
            </div>
            <div class="form-group">
                <label class="form-label">Bio</label>
                <textarea class="form-textarea" rows="3"></textarea>
            </div>
            <div style="display: flex; gap: var(--spacing-sm); justify-content: flex-end;">
                <button type="button" class="btn btn-outline">Cancelar</button>
                <button type="submit" class="btn btn-primary">Guardar</button>
            </div>
        </form>
    </div>
</div>
```

---

## ✅ Checklist

Antes de implementar layouts:

- [ ] Cards tienen padding y border apropiados
- [ ] Modals están centrados y tienen overlay
- [ ] Tabs tienen estado activo visible
- [ ] Dividers tienen espaciado consistente
- [ ] Todo es responsive
- [ ] Jerarquía visual clara
- [ ] Botones de cierre donde corresponde

---

## 🚫 Errores Comunes

### ❌ NO hacer:
```html
<!-- Card sin estructura -->
<div class="card">
    <h4>Título</h4>
    <p>Contenido</p>
</div>

<!-- Modal sin botón de cerrar -->
<div class="modal">
    <div class="modal-content">
        <h3>Título</h3>
    </div>
</div>
```

### ✅ Hacer:
```html
<!-- Card estructurada -->
<div class="card">
    <div class="card-header">
        <h4>Título</h4>
    </div>
    <div class="card-content">
        <p>Contenido</p>
    </div>
</div>

<!-- Modal completo -->
<div class="modal">
    <div class="modal-content">
        <div class="modal-header">
            <h3>Título</h3>
            <button class="modal-close">...</button>
        </div>
        <div class="modal-body">...</div>
    </div>
</div>
```

---

**Caracteres**: ~9,400 (optimizado para Antigravity)