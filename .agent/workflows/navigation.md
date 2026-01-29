---
description: 
---

# Navigation - Workflow

> **Componente**: Dropdowns, Tooltips, Avatars, Menús  
> **Requiere**: `design-tokens.md`

---

## 📋 Dropdown Menu

### Estructura

```css
.dropdown-menu {
    background-color: var(--popover);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 0.25rem;
    min-width: 200px;
    box-shadow: var(--shadow-md);
}

.dropdown-item {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
    color: var(--foreground);
    text-decoration: none;
    border-radius: var(--radius-sm);
    cursor: pointer;
    transition: all var(--transition);
}

.dropdown-item:hover {
    background-color: var(--accent);
}

.dropdown-divider {
    height: 1px;
    background-color: var(--border);
    margin: 0.25rem 0;
}
```

---

### Ejemplo

```html
<button class="btn btn-outline">
    Menú
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="6 9 12 15 18 9"/>
    </svg>
</button>

<div class="dropdown-menu">
    <a href="#" class="dropdown-item">
        <svg width="16" height="16">...</svg>
        Perfil
    </a>
    <a href="#" class="dropdown-item">
        <svg width="16" height="16">...</svg>
        Configuración
    </a>
    <div class="dropdown-divider"></div>
    <a href="#" class="dropdown-item">
        <svg width="16" height="16">...</svg>
        Cerrar sesión
    </a>
</div>
```

---

### Con Secciones

```html
<div class="dropdown-menu">
    <div style="padding: 0.5rem 0.75rem; border-bottom: 1px solid var(--border);">
        <p style="margin: 0; font-weight: 600; font-size: 0.75rem; text-transform: uppercase; color: var(--muted-foreground);">
            Mi Cuenta
        </p>
    </div>
    <a href="#" class="dropdown-item">Perfil</a>
    <a href="#" class="dropdown-item">Facturación</a>
    <div class="dropdown-divider"></div>
    <a href="#" class="dropdown-item">Cerrar sesión</a>
</div>
```

---

## 💬 Tooltip

### Estructura

```css
.tooltip-wrapper {
    position: relative;
    display: inline-block;
}

.tooltip {
    position: absolute;
    bottom: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--foreground);
    color: var(--background);
    padding: 0.5rem 0.75rem;
    border-radius: var(--radius-sm);
    font-size: 0.75rem;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: opacity var(--transition);
    box-shadow: var(--shadow-md);
    z-index: 1000;
}

.tooltip::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 4px solid transparent;
    border-top-color: var(--foreground);
}

.tooltip-wrapper:hover .tooltip {
    opacity: 1;
}
```

---

### Ejemplo

```html
<div class="tooltip-wrapper">
    <button class="btn btn-outline">Hover me</button>
    <div class="tooltip">
        Información útil
    </div>
</div>
```

---

### En Iconos

```html
<div style="display: flex; gap: var(--spacing-sm);">
    <div class="tooltip-wrapper">
        <button class="btn btn-ghost" style="padding: 0.5rem;">
            <svg width="20" height="20">...</svg>
        </button>
        <div class="tooltip">Editar</div>
    </div>
    
    <div class="tooltip-wrapper">
        <button class="btn btn-ghost" style="padding: 0.5rem;">
            <svg width="20" height="20">...</svg>
        </button>
        <div class="tooltip">Eliminar</div>
    </div>
</div>
```

---

## 👤 Avatar

### Estructura

```css
.avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--muted);
}

.avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.avatar-fallback {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--foreground);
}

.avatar-sm {
    width: 32px;
    height: 32px;
}

.avatar-sm .avatar-fallback {
    font-size: 0.75rem;
}

.avatar-lg {
    width: 56px;
    height: 56px;
}

.avatar-lg .avatar-fallback {
    font-size: 1.125rem;
}
```

---

### Ejemplos

**Con imagen**:
```html
<div class="avatar">
    <img src="path/to/image.jpg" alt="Usuario">
</div>
```

**Con iniciales**:
```html
<div class="avatar">
    <div class="avatar-fallback">JP</div>
</div>
```

**Tamaños**:
```html
<div class="avatar avatar-sm">
    <div class="avatar-fallback">JS</div>
</div>

<div class="avatar">
    <div class="avatar-fallback">MG</div>
</div>

<div class="avatar avatar-lg">
    <div class="avatar-fallback">CL</div>
</div>
```

---

### Con Badge de Estado

```html
<div style="position: relative; display: inline-block;">
    <div class="avatar">
        <img src="path/to/image.jpg" alt="Usuario">
    </div>
    <span class="badge badge-success" style="position: absolute; bottom: 0; right: 0; width: 12px; height: 12px; padding: 0; border: 2px solid var(--background);"></span>
</div>
```

---

## 🔍 Search Bar

```html
<div class="form-group">
    <div style="position: relative;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="position: absolute; left: 0.75rem; top: 50%; transform: translateY(-50%); color: var(--muted-foreground);">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
        </svg>
        <input 
            type="search" 
            class="form-input" 
            placeholder="Buscar..."
            style="padding-left: 2.5rem;"
        >
    </div>
</div>
```

---

## 🍔 Breadcrumbs

```html
<nav style="display: flex; align-items: center; gap: var(--spacing-xs); font-size: 0.875rem;">
    <a href="#" style="color: var(--muted-foreground); text-decoration: none;">Inicio</a>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--muted-foreground);">
        <polyline points="9 18 15 12 9 6"/>
    </svg>
    <a href="#" style="color: var(--muted-foreground); text-decoration: none;">Productos</a>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--muted-foreground);">
        <polyline points="9 18 15 12 9 6"/>
    </svg>
    <span style="color: var(--foreground); font-weight: 500;">UI Kit</span>
</nav>
```

---

## 🎯 Patrones

### User Menu (Avatar + Dropdown)

```html
<div style="position: relative;">
    <button class="btn btn-ghost" style="display: flex; align-items: center; gap: var(--spacing-sm);">
        <div class="avatar avatar-sm">
            <div class="avatar-fallback">JP</div>
        </div>
        <span>Juan Pérez</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 12 15 18 9"/>
        </svg>
    </button>
    <!-- Dropdown aquí -->
</div>
```

---

### Toolbar con Tooltips

```html
<div style="display: flex; gap: var(--spacing-xs); padding: var(--spacing-sm); border: 1px solid var(--border); border-radius: var(--radius);">
    <div class="tooltip-wrapper">
        <button class="btn btn-ghost btn-sm">
            <svg width="16" height="16">...</svg>
        </button>
        <div class="tooltip">Negrita</div>
    </div>
    
    <div class="tooltip-wrapper">
        <button class="btn btn-ghost btn-sm">
            <svg width="16" height="16">...</svg>
        </button>
        <div class="tooltip">Cursiva</div>
    </div>
    
    <div style="width: 1px; height: 20px; background: var(--border); align-self: center;"></div>
    
    <div class="tooltip-wrapper">
        <button class="btn btn-ghost btn-sm">
            <svg width="16" height="16">...</svg>
        </button>
        <div class="tooltip">Enlace</div>
    </div>
</div>
```

---

### Header con Navegación

```html
<header style="border-bottom: 1px solid var(--border); padding: var(--spacing-md) 0;">
    <div class="container" style="display: flex; align-items: center; justify-content: space-between;">
        <!-- Logo -->
        <div style="display: flex; align-items: center; gap: var(--spacing-lg);">
            <h3 style="margin: 0;">Logo</h3>
            
            <!-- Nav Links -->
            <nav style="display: flex; gap: var(--spacing-sm);">
                <a href="#" class="btn btn-ghost btn-sm">Dashboard</a>
                <a href="#" class="btn btn-ghost btn-sm">Proyectos</a>
                <a href="#" class="btn btn-ghost btn-sm">Equipo</a>
            </nav>
        </div>
        
        <!-- User Area -->
        <div style="display: flex; align-items: center; gap: var(--spacing-md);">
            <!-- Search -->
            <div style="position: relative; width: 200px;">
                <svg width="16" height="16" style="position: absolute; left: 0.75rem; top: 50%; transform: translateY(-50%); color: var(--muted-foreground);">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.35-4.35"/>
                </svg>
                <input type="search" class="form-input" placeholder="Buscar..." style="padding-left: 2.5rem; height: 36px;">
            </div>
            
            <!-- Notifications -->
            <div class="tooltip-wrapper">
                <button class="btn btn-ghost" style="position: relative; padding: 0.5rem;">
                    <svg width="20" height="20">...</svg>
                    <span class="badge badge-error" style="position: absolute; top: 0; right: 0; width: 8px; height: 8px; padding: 0;"></span>
                </button>
                <div class="tooltip">Notificaciones</div>
            </div>
            
            <!-- Avatar -->
            <div class="avatar">
                <div class="avatar-fallback">JP</div>
            </div>
        </div>
    </div>
</header>
```

---

## ✅ Checklist

- [ ] Dropdowns tienen z-index apropiado
- [ ] Tooltips no bloquean interacción
- [ ] Avatars tienen tamaño consistente
- [ ] Iconos tienen tooltips descriptivos
- [ ] Menús tienen hover states
- [ ] Navegación clara y accesible

---

## 🚫 Errores Comunes

**❌ NO**:
```html
<!-- Tooltip sin wrapper -->
<button>Hover<div class="tooltip">Info</div></button>

<!-- Avatar sin fallback -->
<div class="avatar">
    <img src="broken.jpg">
</div>
```

**✅ SÍ**:
```html
<!-- Tooltip con wrapper -->
<div class="tooltip-wrapper">
    <button>Hover</button>
    <div class="tooltip">Info</div>
</div>

<!-- Avatar con fallback -->
<div class="avatar">
    <div class="avatar-fallback">JP</div>
</div>
```

---

**Caracteres**: ~8,200 (optimizado)