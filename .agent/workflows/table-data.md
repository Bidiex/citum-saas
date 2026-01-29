---
description: 
---

# Tables & Data - Workflow

> **Componente**: Tablas y visualización de datos  
> **Requiere**: `design-tokens.md`

---

## 📊 Tables

### Estructura

```css
.table-container {
    border: 1px solid var(--border);
    border-radius: var(--radius);
    overflow: hidden;
}

.table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.875rem;
}

.table thead {
    background-color: var(--muted);
}

.table th {
    text-align: left;
    font-weight: 600;
    padding: var(--spacing-md);
    border-bottom: 1px solid var(--border);
    color: var(--foreground);
}

.table td {
    padding: var(--spacing-md);
    border-bottom: 1px solid var(--border);
}

.table tbody tr:last-child td {
    border-bottom: none;
}

.table tbody tr {
    transition: background-color var(--transition);
}

.table tbody tr:hover {
    background-color: var(--muted);
}
```

---

### Ejemplo Básico

```html
<div class="table-container">
    <table class="table">
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Estado</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Juan Pérez</td>
                <td>juan@example.com</td>
                <td><span class="badge badge-success">Activo</span></td>
                <td>
                    <button class="btn btn-ghost btn-sm">Editar</button>
                </td>
            </tr>
        </tbody>
    </table>
</div>
```

---

### Tabla con Datos Complejos

```html
<table class="table">
    <tbody>
        <tr>
            <td>
                <strong>UI Kit Pro</strong>
                <br>
                <span class="text-muted text-small">Sistema completo</span>
            </td>
            <td><span class="badge badge-success">Activo</span></td>
            <td>$49</td>
            <td>
                <div style="display: flex; gap: var(--spacing-xs);">
                    <button class="btn btn-ghost btn-sm">Editar</button>
                    <button class="btn btn-ghost btn-sm">Ver</button>
                </div>
            </td>
        </tr>
    </tbody>
</table>
```

---

### Tabla con Checkboxes

```html
<table class="table">
    <thead>
        <tr>
            <th style="width: 40px;">
                <label class="checkbox-label">
                    <input type="checkbox" class="form-checkbox">
                </label>
            </th>
            <th>Nombre</th>
            <th>Email</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                <label class="checkbox-label">
                    <input type="checkbox" class="form-checkbox">
                </label>
            </td>
            <td>Juan Pérez</td>
            <td>juan@example.com</td>
        </tr>
    </tbody>
</table>
```

---

## 📋 Listas

### Lista Simple

```html
<div class="card">
    <div class="card-content" style="padding: 0;">
        <div style="padding: var(--spacing-md); border-bottom: 1px solid var(--border);">
            <strong>Juan Pérez</strong>
            <p class="text-muted text-small" style="margin: 0;">juan@example.com</p>
        </div>
        <div style="padding: var(--spacing-md);">
            <strong>María García</strong>
            <p class="text-muted text-small" style="margin: 0;">maria@example.com</p>
        </div>
    </div>
</div>
```

---

### Lista con Iconos

```html
<div style="display: flex; align-items: center; gap: var(--spacing-md); padding: var(--spacing-md); border-bottom: 1px solid var(--border);">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
    </svg>
    <div style="flex: 1;">
        <strong>Tarea completada</strong>
        <p class="text-muted text-small" style="margin: 0;">Hace 2 horas</p>
    </div>
    <span class="badge badge-success">Completado</span>
</div>
```

---

## 🔢 Progress Bar

```css
.progress {
    width: 100%;
    height: 8px;
    background-color: var(--muted);
    border-radius: var(--radius);
    overflow: hidden;
}

.progress-bar {
    height: 100%;
    background-color: var(--primary);
    transition: width 0.3s ease;
}
```

**Uso**:
```html
<div class="card-content">
    <div style="display: flex; justify-content: space-between; margin-bottom: var(--spacing-sm);">
        <span>Completado</span>
        <span class="text-muted">75%</span>
    </div>
    <div class="progress">
        <div class="progress-bar" style="width: 75%"></div>
    </div>
</div>
```

---

### Progress Multiple

```html
<div class="card-content">
    <div style="margin-bottom: var(--spacing-lg);">
        <div style="display: flex; justify-content: space-between; margin-bottom: var(--spacing-xs);">
            <span class="text-small">Diseño</span>
            <span class="text-small text-muted">100%</span>
        </div>
        <div class="progress">
            <div class="progress-bar" style="width: 100%"></div>
        </div>
    </div>
    
    <div style="margin-bottom: var(--spacing-lg);">
        <div style="display: flex; justify-content: space-between; margin-bottom: var(--spacing-xs);">
            <span class="text-small">Desarrollo</span>
            <span class="text-small text-muted">60%</span>
        </div>
        <div class="progress">
            <div class="progress-bar" style="width: 60%"></div>
        </div>
    </div>
</div>
```

---

## 📈 Stats Cards

```html
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: var(--spacing-lg);">
    <div class="card">
        <div class="card-content">
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                <div>
                    <p class="text-small text-muted" style="margin-bottom: var(--spacing-xs);">Total Usuarios</p>
                    <h2 style="margin-bottom: var(--spacing-xs);">1,234</h2>
                    <span class="badge badge-success">+12%</span>
                </div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                </svg>
            </div>
        </div>
    </div>
    
    <div class="card">
        <div class="card-content">
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                <div>
                    <p class="text-small text-muted" style="margin-bottom: var(--spacing-xs);">Ingresos</p>
                    <h2 style="margin-bottom: var(--spacing-xs);">$45,231</h2>
                    <span class="badge badge-success">+8%</span>
                </div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="12" y1="1" x2="12" y2="23"/>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
            </div>
        </div>
    </div>
</div>
```

---

## 🎯 Patrones

### Tabla con Filtros

```html
<div class="card">
    <div class="card-header">
        <h4>Usuarios</h4>
        <div style="display: flex; gap: var(--spacing-sm); margin-top: var(--spacing-md);">
            <input type="search" class="form-input" placeholder="Buscar..." style="max-width: 300px;">
            <select class="form-select" style="max-width: 150px;">
                <option>Todos</option>
                <option>Activos</option>
            </select>
        </div>
    </div>
    <div class="card-content" style="padding: 0;">
        <div class="table-container" style="border: none; border-radius: 0;">
            <table class="table">
                <!-- tabla aquí -->
            </table>
        </div>
    </div>
</div>
```

---

### Empty State

```html
<div class="card">
    <div class="card-content" style="text-align: center; padding: var(--spacing-2xl);">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin: 0 auto var(--spacing-md); color: var(--muted-foreground);">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <line x1="9" y1="9" x2="15" y2="15"/>
            <line x1="15" y1="9" x2="9" y2="15"/>
        </svg>
        <h4 style="margin-bottom: var(--spacing-xs);">No hay datos</h4>
        <p class="text-muted" style="margin-bottom: var(--spacing-lg);">
            Aún no tienes elementos
        </p>
        <button class="btn btn-primary">Crear nuevo</button>
    </div>
</div>
```

---

## ✅ Checklist

- [ ] Tabla tiene header visible
- [ ] Filas tienen hover state
- [ ] Bordes sutiles entre filas
- [ ] Padding apropiado
- [ ] Responsive (scroll horizontal si es necesario)
- [ ] Empty states definidos
- [ ] Badges para estados

---

## 🚫 Errores Comunes

**❌ NO**:
```html
<!-- Sin container -->
<table class="table">...</table>

<!-- Acciones sin botones -->
<td><a href="#">Editar</a> | <a href="#">Eliminar</a></td>
```

**✅ SÍ**:
```html
<!-- Con container -->
<div class="table-container">
    <table class="table">...</table>
</div>

<!-- Acciones con botones -->
<td>
    <div style="display: flex; gap: var(--spacing-xs);">
        <button class="btn btn-ghost btn-sm">Editar</button>
    </div>
</td>
```

---

**Caracteres**: ~7,100 (optimizado)