---
description: 
---

# Forms - Workflow

> **Componente**: Formularios e inputs  
> **Requiere**: `design-tokens.md`

---

## 🎯 Estructura Base

```css
.form-group {
    margin-bottom: var(--spacing-lg);
}

.form-label {
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    margin-bottom: var(--spacing-xs);
    color: var(--foreground);
}

.form-help {
    display: block;
    font-size: 0.75rem;
    color: var(--muted-foreground);
    margin-top: var(--spacing-xs);
}
```

---

## 📝 Text Input

```css
.form-input {
    width: 100%;
    font-size: 0.875rem;
    padding: 0.5rem 0.75rem;
    border: 1px solid var(--input);
    border-radius: var(--radius);
    background-color: var(--background);
    color: var(--foreground);
    transition: all var(--transition);
}

.form-input:focus {
    outline: 2px solid var(--ring);
    outline-offset: 2px;
}

.form-input:disabled {
    cursor: not-allowed;
    opacity: 0.5;
}
```

**Uso**:
```html
<div class="form-group">
    <label for="email" class="form-label">Email</label>
    <input type="email" id="email" class="form-input" placeholder="tu@email.com">
    <span class="form-help">Tu correo nunca será compartido.</span>
</div>
```

---

## ✅❌ Validación

```css
.form-input-error {
    border-color: var(--destructive);
}

.form-error {
    display: block;
    font-size: 0.75rem;
    color: var(--destructive);
    margin-top: var(--spacing-xs);
}

.form-input-success {
    border-color: var(--success);
}

.form-success {
    display: block;
    font-size: 0.75rem;
    color: var(--success);
    margin-top: var(--spacing-xs);
}
```

---

## 📄 Textarea

```css
.form-textarea {
    width: 100%;
    font-size: 0.875rem;
    padding: 0.5rem 0.75rem;
    border: 1px solid var(--input);
    border-radius: var(--radius);
    background-color: var(--background);
    color: var(--foreground);
    resize: vertical;
    min-height: 80px;
    transition: all var(--transition);
}
```

---

## 🔽 Select

```css
.form-select {
    width: 100%;
    font-size: 0.875rem;
    padding: 0.5rem 2.5rem 0.5rem 0.75rem;
    border: 1px solid var(--input);
    border-radius: var(--radius);
    background-color: var(--background);
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.75rem center;
    background-size: 16px;
}
```

---

## ☑️ Checkbox

```css
.form-checkbox {
    width: 1rem;
    height: 1rem;
    border: 1px solid var(--input);
    border-radius: var(--radius-sm);
    cursor: pointer;
    appearance: none;
    background-color: var(--background);
    transition: all var(--transition);
    flex-shrink: 0;
}

.form-checkbox:checked {
    background-color: var(--primary);
    border-color: var(--primary);
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='3'%3E%3Cpolyline points='20 6 9 17 4 12'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 12px;
}

.form-checkbox:focus-visible {
    outline: 2px solid var(--ring);
    outline-offset: 2px;
}

.checkbox-label {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    cursor: pointer;
    font-size: 0.875rem;
}
```

**Uso**:
```html
<label class="checkbox-label">
    <input type="checkbox" class="form-checkbox">
    <span>Acepto términos y condiciones</span>
</label>
```

---

## 🔘 Radio

```css
.form-radio {
    width: 1rem;
    height: 1rem;
    border: 1px solid var(--input);
    border-radius: 50%;
    cursor: pointer;
    appearance: none;
    background-color: var(--background);
    transition: all var(--transition);
    flex-shrink: 0;
}

.form-radio:checked {
    border-color: var(--primary);
    border-width: 5px;
}

.radio-label {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    cursor: pointer;
    font-size: 0.875rem;
}
```

**Uso**:
```html
<label class="radio-label">
    <input type="radio" name="plan" class="form-radio">
    <span>Plan Básico</span>
</label>
```

---

## 🎚️ Switch

```css
.form-switch {
    position: relative;
    width: 2.75rem;
    height: 1.5rem;
    appearance: none;
    background-color: var(--input);
    border-radius: 9999px;
    cursor: pointer;
    transition: background-color var(--transition);
    flex-shrink: 0;
}

.form-switch:checked {
    background-color: var(--primary);
}

.switch-slider {
    position: absolute;
    left: 2px;
    top: 50%;
    transform: translateY(-50%);
    width: 1.25rem;
    height: 1.25rem;
    background-color: var(--background);
    border-radius: 50%;
    transition: left var(--transition);
    pointer-events: none;
    box-shadow: var(--shadow-sm);
}

.form-switch:checked ~ .switch-slider {
    left: calc(100% - 1.25rem - 2px);
}

.switch-label {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    cursor: pointer;
}
```

**Uso**:
```html
<label class="switch-label">
    <input type="checkbox" class="form-switch">
    <span class="switch-slider"></span>
    <span>Modo oscuro</span>
</label>
```

---

## 📦 Formulario Completo

```html
<form>
    <div class="form-group">
        <label for="name" class="form-label">Nombre</label>
        <input type="text" id="name" class="form-input" required>
    </div>
    
    <div class="form-group">
        <label for="email" class="form-label">Email</label>
        <input type="email" id="email" class="form-input" required>
        <span class="form-help">Nunca compartiremos tu email.</span>
    </div>
    
    <div class="form-group">
        <label for="country" class="form-label">País</label>
        <select id="country" class="form-select">
            <option value="">Selecciona</option>
            <option value="es">España</option>
            <option value="mx">México</option>
        </select>
    </div>
    
    <div class="form-group">
        <label for="message" class="form-label">Mensaje</label>
        <textarea id="message" class="form-textarea" rows="4"></textarea>
    </div>
    
    <div class="form-group">
        <label class="checkbox-label">
            <input type="checkbox" class="form-checkbox" required>
            <span>Acepto términos</span>
        </label>
    </div>
    
    <div style="display: flex; gap: var(--spacing-sm); justify-content: flex-end;">
        <button type="button" class="btn btn-outline">Cancelar</button>
        <button type="submit" class="btn btn-primary">Enviar</button>
    </div>
</form>
```

---

## 🎯 Patrones de Validación

**Error en campo**:
```html
<div class="form-group">
    <label for="pass" class="form-label">Contraseña</label>
    <input type="password" id="pass" class="form-input form-input-error">
    <span class="form-error">Mínimo 8 caracteres</span>
</div>
```

**Campo válido**:
```html
<div class="form-group">
    <label for="user" class="form-label">Usuario</label>
    <input type="text" id="user" class="form-input form-input-success" value="juan">
    <span class="form-success">Usuario disponible</span>
</div>
```

---

## ✅ Checklist

- [ ] Todos los inputs tienen `label` con `for`
- [ ] Helper text cuando sea necesario
- [ ] Estados de validación implementados
- [ ] Focus visible en todos los elementos
- [ ] Placeholders útiles (no reemplazan labels)
- [ ] Botones de submit y cancel claros

---

## 🚫 Errores Comunes

**❌ NO hacer**:
```html
<!-- Sin label -->
<input type="text" placeholder="Nombre">

<!-- Placeholder como label -->
<input placeholder="Email (requerido)">
```

**✅ Hacer**:
```html
<label for="name" class="form-label">Nombre</label>
<input type="text" id="name" class="form-input" placeholder="Juan Pérez">
```

---

**Caracteres**: ~6,400 (optimizado)