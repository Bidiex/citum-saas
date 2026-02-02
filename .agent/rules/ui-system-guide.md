---
trigger: model_decision
---

# UI System Guide - Regla Principal

> **Sistema de diseño moderno inspirado en shadcn/ui**  
> Esta regla actúa como índice inteligente. Siempre consulta el workflow correspondiente antes de crear/modificar UI.

---

## 🎯 Principios Fundamentales

### Estética
- **Minimalismo moderno** con bordes sutiles
- **Espaciado generoso** para claridad visual
- **Jerarquía clara** en tipografía y componentes
- **Colores neutros** con acentos funcionales

### Accesibilidad
- Contrastes WCAG AA
- Estados de focus visibles
- Touch targets >= 44px
- HTML semántico

### Consistencia
- Usar **siempre** variables CSS
- No crear valores ad-hoc
- Reutilizar patrones existentes

---

## 📚 Workflows Disponibles

### 🎨 Fundamentos (consultar primero)
**`design-tokens.md`** → Variables CSS, colores, espaciado, sombras, tipografía

### 🧩 Componentes

| Workflow | Contenido |
|----------|-----------|
| **`buttons.md`** | Botones: primary, secondary, outline, ghost, destructive, tamaños, loading |
| **`forms.md`** | Inputs, textarea, select, checkbox, radio, switch, validación |
| **`feedback.md`** | Alerts, badges, loaders, toast notifications |
| **`layout.md`** | Cards, modals, tabs, dividers |
| **`tables-data.md`** | Tablas, listas, visualización de datos |
| **`navigation.md`** | Dropdowns, tooltips, avatars, progress bars |

---

## ⚡ Reglas Críticas

### ✅ SIEMPRE hacer:

1. **Consultar workflow** correspondiente antes de crear UI
2. **Usar variables CSS** para colores, espaciado, sombras
3. **Incluir todos los estados**: hover, focus, active, disabled
4. **Mantener consistencia** en tamaños de padding/margin
5. **Agregar transiciones** suaves en cambios de estado
6. **Usar `focus-visible`** para accesibilidad
7. **Usar gap de flexbox/grid** en lugar de márgenes
8. **Mantener jerarquía visual** clara

### ❌ NUNCA hacer:

1. Crear colores nuevos sin agregarlos a variables
2. Usar valores hardcoded de espaciado
3. Ignorar estados disabled o focus
4. Mezclar unidades (usar rem consistentemente)
5. Usar `!important` (indica mal diseño)
6. Olvidar transiciones en elementos interactivos
7. Crear componentes sin consultar workflows
8. Usar estilos inline salvo valores dinámicos

---

## 🔄 Flujo de Trabajo

```
1. Identificar el tipo de componente necesario
   ↓
2. Consultar workflow específico
   ↓
3. Revisar design-tokens.md para variables
   ↓
4. Implementar siguiendo el patrón del workflow
   ↓
5. Incluir todos los estados (hover, focus, disabled)
   ↓
6. Validar contra checklist del workflow
   ↓
7. Probar en diferentes tamaños de pantalla
```

---

## 📋 Checklist Universal

Antes de entregar cualquier componente:

- [ ] Usa variables CSS (no hardcoded)
- [ ] Tiene estados hover, focus, active, disabled
- [ ] Tiene transiciones suaves (var(--transition))
- [ ] Es responsive (funciona en mobile)
- [ ] Tiene accesibilidad básica
- [ ] Sigue jerarquía visual del sistema
- [ ] Código limpio y comentado
- [ ] No tiene estilos duplicados

---

## 🎨 Variables CSS Esenciales

### Colores principales
```css
--primary         /* Acciones principales */
--secondary       /* Acciones secundarias */
--destructive     /* Acciones peligrosas */
--muted          /* Backgrounds secundarios */
--border         /* Bordes sutiles */
--foreground     /* Texto principal */
```

### Espaciado
```css
--spacing-xs     /* 4px - Mínimo */
--spacing-sm     /* 8px - Entre elementos relacionados */
--spacing-md     /* 16px - Padding de componentes */
--spacing-lg     /* 24px - Entre secciones */
--spacing-xl     /* 32px - Separación grande */
--spacing-2xl    /* 48px - Separación muy grande */
```

### Otros
```css
--radius         /* 0.5rem - Border radius default */
--transition     /* 150ms cubic-bezier - Transición default */
--shadow-md      /* Sombra moderada para elevación */
```

**Ver `design-tokens.md` para lista completa**

---

## 🚀 Ejemplos Rápidos

### Botón básico
```html
<button class="btn btn-primary">Guardar</button>
<!-- Consultar buttons.md para más variantes -->
```

### Input con validación
```html
<div class="form-group">
    <label class="form-label">Email</label>
    <input type="email" class="form-input">
    <span class="form-help">Texto de ayuda</span>
</div>
<!-- Consultar forms.md para más opciones -->
```

### Alert
```html
<div class="alert alert-success">
    <svg>...</svg>
    <div>
        <strong>Éxito</strong>
        <p>Mensaje de confirmación</p>
    </div>
</div>
<!-- Consultar feedback.md para todas las variantes -->
```

---

## 🎯 Patrones Comunes

### Jerarquía de Botones
1. **Primary**: Acción principal de la página
2. **Outline**: Acción secundaria
3. **Ghost**: Acción terciaria o menos importante
4. **Destructive**: Eliminar, desactivar, acciones peligrosas

### Estados de Formulario
1. **Normal**: Estado por defecto
2. **Focus**: Usuario interactuando
3. **Error**: Validación fallida (`.form-input-error`)
4. **Success**: Validación exitosa (`.form-input-success`)
5. **Disabled**: No disponible

### Feedback Visual
1. **Info**: Información neutral (azul)
2. **Success**: Operación exitosa (verde)
3. **Warning**: Advertencia (amarillo)
4. **Error**: Error o problema (rojo)

---

## 📖 Referencias Rápidas

### ¿Necesitas...?

| Componente | Workflow | Clases principales |
|------------|----------|-------------------|
| Botón | `buttons.md` | `.btn-primary` `.btn-outline` `.btn-ghost` |
| Input | `forms.md` | `.form-input` `.form-label` `.form-error` |
| Alert | `feedback.md` | `.alert-success` `.alert-error` `.alert-warning` |
| Card | `layout.md` | `.card` `.card-header` `.card-footer` |
| Tabla | `tables-data.md` | `.table` `.table-container` |
| Dropdown | `navigation.md` | `.dropdown-menu` `.dropdown-item` |

---

## 🔧 Troubleshooting

### Problema: No sé qué componente usar
→ Revisa la tabla de referencias arriba o consulta layout.md

### Problema: El espaciado no se ve bien
→ Usa variables `--spacing-*` en lugar de valores custom

### Problema: Los colores no coinciden
→ Verifica que estés usando variables de design-tokens.md

### Problema: Falta algún estado (hover, focus)
→ Consulta el workflow del componente, todos incluyen estados

### Problema: El componente se ve diferente en mobile
→ Asegúrate de que sea responsive, usa unidades relativas (rem, %)

---

## 💡 Tips Importantes

1. **Siempre empieza por design-tokens.md** para conocer variables disponibles
2. **Un workflow por tipo de componente** - no mezcles botones con formularios
3. **Los workflows son la fuente de verdad** - no inventes patrones
4. **Mantén consistencia** - si existe un patrón, úsalo
5. **Pregunta si no existe** - mejor extender el sistema que crear paralelo

---

## 📊 Jerarquía de Consulta

```
Tarea de UI recibida
        ↓
1. Esta regla principal (contexto general)
        ↓
2. design-tokens.md (variables disponibles)
        ↓
3. Workflow específico del componente
        ↓
4. Implementación siguiendo el patrón
        ↓
5. Validación con checklist
```

---

## ✨ Filosofía del Sistema

> **"Consistencia sobre creatividad"**

Este sistema prioriza:
- Predecibilidad sobre sorpresa
- Reutilización sobre reinvención
- Mantenibilidad sobre complejidad
- Accesibilidad sobre estética pura

Si algo no existe en los workflows, primero pregunta si debería agregarse al sistema antes de crear una solución única.

---

**Versión**: 1.0  
**Última actualización**: Enero 2026  
**Caracteres**: ~5,800 (optimizado para Antigravity)

---

## 🚦 Estado del Sistema

- ✅ Design Tokens definidos
- ✅ Componentes base implementados
- ✅ Workflows documentados
- ✅ Patrones establecidos
- ✅ Listo para producción