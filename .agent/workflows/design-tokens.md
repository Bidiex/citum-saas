---
description: 
---

# Design Tokens - Variables CSS

> **Workflow**: Fundamentos del sistema de diseño  
> **Consultar**: Antes de implementar cualquier componente

---

## 🎨 Colores

### Colores Base

```css
:root {
    /* Background y Foreground */
    --background: hsl(0, 0%, 100%);
    --foreground: hsl(222, 47%, 11%);
    
    /* Muted (colores secundarios) */
    --muted: hsl(210, 40%, 96.1%);
    --muted-foreground: hsl(215.4, 16.3%, 46.9%);
    
    /* Card (tarjetas) */
    --card: hsl(0, 0%, 100%);
    --card-foreground: hsl(222, 47%, 11%);
    
    /* Popover (menús flotantes) */
    --popover: hsl(0, 0%, 100%);
    --popover-foreground: hsl(222, 47%, 11%);
    
    /* Border e Input */
    --border: hsl(214.3, 31.8%, 91.4%);
    --input: hsl(214.3, 31.8%, 91.4%);
}
```

### Colores de Acción

```css
:root {
    /* Primary (acción principal) */
    --primary: hsl(222, 47%, 11%);
    --primary-foreground: hsl(210, 40%, 98%);
    
    /* Secondary (acción secundaria) */
    --secondary: hsl(210, 40%, 96.1%);
    --secondary-foreground: hsl(222, 47%, 11%);
    
    /* Accent (acentos) */
    --accent: hsl(210, 40%, 96.1%);
    --accent-foreground: hsl(222, 47%, 11%);
}
```

### Colores Semánticos

```css
:root {
    /* Destructive (acciones peligrosas) */
    --destructive: hsl(0, 84.2%, 60.2%);
    --destructive-foreground: hsl(210, 40%, 98%);
    
    /* Success (éxito) */
    --success: hsl(142, 71%, 45%);
    --success-foreground: hsl(210, 40%, 98%);
    
    /* Warning (advertencia) */
    --warning: hsl(38, 92%, 50%);
    --warning-foreground: hsl(222, 47%, 11%);
    
    /* Info (información) */
    --info: hsl(199, 89%, 48%);
    --info-foreground: hsl(210, 40%, 98%);
}
```

### Ring (Focus)

```css
:root {
    --ring: hsl(222, 47%, 11%);
}
```

---

## 📐 Border Radius

```css
:root {
    --radius: 0.5rem;        /* 8px - Default */
    --radius-sm: 0.375rem;   /* 6px - Pequeño */
    --radius-lg: 0.75rem;    /* 12px - Grande */
}
```

### Cuándo usar cada uno:
- **`--radius-sm`**: Badges, códigos inline, elementos pequeños
- **`--radius`**: Botones, inputs, cards (default)
- **`--radius-lg`**: Modales, popovers, contenedores grandes

---

## 📏 Espaciado

```css
:root {
    --spacing-xs: 0.25rem;   /* 4px */
    --spacing-sm: 0.5rem;    /* 8px */
    --spacing-md: 1rem;      /* 16px */
    --spacing-lg: 1.5rem;    /* 24px */
    --spacing-xl: 2rem;      /* 32px */
    --spacing-2xl: 3rem;     /* 48px */
}
```

### Guía de uso:

| Variable | Uso común |
|----------|-----------|
| `--spacing-xs` | Gap mínimo entre elementos muy relacionados |
| `--spacing-sm` | Gap entre elementos relacionados (ej: iconos y texto) |
| `--spacing-md` | Padding interno de componentes, gap estándar |
| `--spacing-lg` | Separación entre grupos de elementos |
| `--spacing-xl` | Separación entre secciones |
| `--spacing-2xl` | Padding de página, separaciones grandes |

---

## 📝 Tipografía

### Fuentes

```css
:root {
    --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    --font-mono: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Monaco, Consolas, monospace;
}
```

### Tamaños y Pesos

```css
/* Headings */
h1 {
    font-size: 2rem;      /* 32px */
    font-weight: 700;
    line-height: 1.2;
}

h2 {
    font-size: 1.5rem;    /* 24px */
    font-weight: 700;
    line-height: 1.3;
}

h3 {
    font-size: 1.25rem;   /* 20px */
    font-weight: 600;
    line-height: 1.4;
}

h4 {
    font-size: 1rem;      /* 16px */
    font-weight: 600;
    line-height: 1.5;
}

/* Body */
body {
    font-size: 0.875rem;  /* 14px */
    line-height: 1.6;
}

/* Small text */
.text-small {
    font-size: 0.75rem;   /* 12px */
    line-height: 1.5;
}

/* Code */
code {
    font-size: 0.8125rem; /* 13px */
}
```

---

## ⏱️ Transiciones

```css
:root {
    --transition: 150ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Uso:
```css
.elemento {
    transition: all var(--transition);
}
```

---

## 🌑 Sombras

```css
:root {
    --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    --shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}
```

### Cuándo usar cada sombra:

| Variable | Uso |
|----------|-----|
| `--shadow-sm` | Elementos sutilmente elevados |
| `--shadow` | Cards en estado normal |
| `--shadow-md` | Cards en hover, dropdowns |
| `--shadow-lg` | Modales, popovers, elementos flotantes |

---

## 🎯 Patrones de Uso

### Ejemplo: Botón con tokens

```css
.btn {
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: var(--radius);
    transition: all var(--transition);
    background-color: var(--primary);
    color: var(--primary-foreground);
}

.btn:hover {
    box-shadow: var(--shadow-md);
}
```

### Ejemplo: Card con tokens

```css
.card {
    padding: var(--spacing-lg);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    background-color: var(--card);
    box-shadow: var(--shadow);
}
```

### Ejemplo: Alert con color semántico

```css
.alert-success {
    padding: var(--spacing-md);
    border-radius: var(--radius);
    background-color: hsl(142, 71%, 95%);
    border: 1px solid hsl(142, 71%, 75%);
    color: hsl(142, 71%, 25%);
}
```

---

## ✅ Reglas de Uso

### SIEMPRE:
- Usar variables en lugar de valores directos
- Respetar la jerarquía de espaciado
- Mantener consistencia en border radius
- Usar colores semánticos para feedback

### NUNCA:
- Hardcodear colores (ej: `#3b82f6`)
- Crear espaciados custom (ej: `padding: 13px`)
- Mezclar unidades (mantener rem)
- Ignorar las variables de transición

---

## 📊 Reset y Base CSS

```css
/* Reset básico */
*, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

html {
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

body {
    font-family: var(--font-sans);
    font-size: 0.875rem;
    line-height: 1.6;
    color: var(--foreground);
    background-color: var(--background);
}

/* Headings reset */
h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.2;
    margin-bottom: 0.5rem;
}

/* Párrafos */
p {
    margin-bottom: 1rem;
    line-height: 1.6;
}

/* Código inline */
code {
    font-family: var(--font-mono);
    font-size: 0.8125rem;
    background-color: var(--muted);
    padding: 0.125rem 0.375rem;
    border-radius: var(--radius-sm);
    font-weight: 500;
}
```

---

## 🎨 Utilidades de Texto

```css
.text-small {
    font-size: 0.75rem;
    line-height: 1.5;
}

.text-muted {
    color: var(--muted-foreground);
}
```

---

## 📦 Layout Utilities

```css
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--spacing-lg);
}
```

---

## 🔍 Referencia Rápida

### Colores más usados:
- **Primary**: `var(--primary)` - Botones principales
- **Muted**: `var(--muted)` - Backgrounds secundarios  
- **Border**: `var(--border)` - Bordes sutiles
- **Destructive**: `var(--destructive)` - Acciones peligrosas

### Espaciado común:
- Entre elementos: `var(--spacing-sm)`
- Padding componentes: `var(--spacing-md)`
- Entre secciones: `var(--spacing-lg)`

### Radius por defecto:
- `var(--radius)` - Usar en 90% de casos

### Sombra por defecto:
- `var(--shadow)` - Cards normales
- `var(--shadow-md)` - Hover/elevated

---

**Caracteres**: ~6,300 (optimizado para Antigravity)