---
trigger: always_on
---

# System Prompt para IDE con IA

Este documento define **reglas estrictas, alcance funcional, arquitectura y criterios de calidad** para el desarrollo de un **SaaS de gestión de agenda de servicios**. Debe ser interpretado como **fuente de verdad única (single source of truth)** durante todo el proyecto.

---

## 1. Stack tecnológico (NO NEGOCIABLE)

* **Empaquetador:** Vite
* **Backend / BaaS:** Supabase (Auth, Database, Storage, Policies)
* **Frontend:** HTML + CSS + JavaScript Vanilla (ES6+)
* **Recursos UI:**

  * Iconos: RemixIcon
  * Tipografías: Google Fonts (usar solo las necesarias y optimizadas)

❗ **Prohibido** usar frameworks o librerías externas (React, Vue, Tailwind, Bootstrap, Moment, Lodash, etc.) **a menos que el propietario del proyecto lo autorice explícitamente**.

---

## 2. Principios generales de desarrollo

* Código **simple, explícito y mantenible** (priorizar claridad sobre abstracción prematura)
* Separación estricta de responsabilidades:

  * HTML: estructura
  * CSS: presentación
  * JS: lógica
* Evitar overengineering
* Toda decisión debe alinearse con un **SaaS escalable y comercial**

---

## 3. Descripción del proyecto

*Nombre del Saas: Citum

SaaS para la **gestión de agenda de servicios profesionales**, orientado a:

* Salones de belleza
* Barberías
* Estéticas
* Spas
* Negocios de servicios bajo cita previa

El sistema se compone de **tres interfaces principales**:

1. Dashboard (propietario del negocio)
2. Agenda del profesional
3. Catálogo / Interfaz cliente final

---

## 4. Dashboard (Panel administrativo)

Interfaz exclusiva para el **propietario o administrador del negocio**.

### 4.1 Estructura UI obligatoria

* **Sidebar** lateral con todas las secciones
* **Botón de cerrar sesión** fijo en la parte inferior del sidebar
* **Header** persistente con:

  * Barra de búsqueda contextual (busca dentro de la sección activa)
* **Main content** dinámico según sección activa
* **Diseño 100% responsive** (mobile, tablet, desktop)

---

### 4.2 Secciones del Dashboard

#### 4.2.1 Dashboard (Home)

* Visualización general del negocio
* Métricas iniciales (preparadas para escalar):

  * Servicios agendados
  * Profesionales activos
  * Ingresos (si aplica)

---

#### 4.2.2 Mi negocio

Configuración general del negocio.

**Tabla requerida:** `business`

Campos mínimos:

* id
* nombre (required)
* logo / imagen
* dirección
* redes sociales
* created_at

---

#### 4.2.3 Profesionales (CRUD)

**Tabla:** `professionals`

Campos obligatorios:

* id
* código_acceso (único, usado para acceder a su agenda)
* nombre (required)
* profesión
* horarios_disponibles
* servicios_asignados
* avatar / foto
* estado (activo / inactivo)

---

#### 4.2.4 Servicios

##### Categorías de servicios

**Tabla:** `service_categories`

Campos:

* id
* nombre (required)
* descripción opcional

##### Servicios

**Tabla:** `services`

Campos obligatorios:

* id
* nombre (required)
* duración (en minutos)
* precio
* profesionales_asignados
* categoría_id (FK)
* imagen
* estado

---

#### 4.2.5 Promociones

Promociones visibles en el catálogo del cliente final.

**Tabla:** `promotions`

Campos obligatorios:

* id
* nombre (required)
* valor
* fecha_inicio (required)
* fecha_fin (required)
* estado (activa / inactiva)
* imagen

⚠️ Reglas de validación estrictas:

* No permitir fecha fin < fecha inicio
* No permitir fechas vacías
* No permitir fechas anteriores al día actual
* Desactivación automática al superar fecha_fin

---

#### 4.2.6 Soporte

Gestión de solicitudes de soporte.

**Tabla:** `support_tickets`

Campos:

* id
* asunto
* descripción
* estado (abierto / en progreso / cerrado)
* created_at

---

## 5. Agenda del profesional

Interfaz independiente accesible mediante **código único del profesional**.

Características:

* Visualización de citas asignadas
* Horarios claros y ordenados
* Enfoque mobile-first
* Sin acceso a configuración del negocio

---

## 6. Catálogo / Interfaz cliente final

Interfaz pública para clientes del negocio.

Funciones mínimas:

* Ver servicios y categorías
* Ver promociones activas
* Seleccionar profesional (si aplica)
* Agendar cita

UX clara, simple y enfocada en conversión.

---

## 7. Base de datos (Supabase)

* Todas las tablas deben:

  * Tener claves primarias
  * Usar `NOT NULL` en campos críticos
  * Validar lógica del negocio antes de insertar
* No permitir registros incompletos
* Preparar estructura para futuras RLS Policies

---

## 8. UI / UX

* Seguir **estrictamente** el archivo `uisystemguide.md`
* Componentes coherentes en todo el sistema
* Estados visibles:

  * loading
  * empty
  * error
* Feedback claro al usuario

---

## 9. Sistema global de notificaciones y diálogos (OBLIGATORIO)

El proyecto debe contar con un **sistema unificado y consistente de Toast Notifications y Dialogs**, reutilizable en **todas las interfaces** (Dashboard, Agenda del profesional y Catálogo cliente).

### 9.1 Toast Notifications

Los toast notifications se usarán para **feedback inmediato y no bloqueante**.

Tipos obligatorios:

* success (acciones exitosas)
* error (errores críticos o de validación)
* warning (acciones riesgosas o datos incompletos)
* info (información contextual)

Reglas:

* Diseño y animaciones consistentes en todo el proyecto
* Posición definida (ej: top-right o bottom-center) y no cambiante
* Auto-dismiss configurable según tipo
* Nunca usar alert() del navegador
* Deben ser accesibles (contraste, legibilidad)

Ejemplos de uso:

* Creación / edición / eliminación exitosa
* Errores de validación
* Fallos de conexión con Supabase
* Acciones automáticas (promoción desactivada por fecha)

---

### 9.2 Dialogs (Modales)

Los dialogs se usarán para **acciones que requieren confirmación explícita del usuario**.

Usos obligatorios:

* Confirmación de eliminación
* Acciones irreversibles
* Cierre de sesión
* Cambios críticos de estado

Reglas:

* Un solo sistema de dialogs para todo el proyecto
* Overlay consistente y bloqueante
* CTA claros: confirmar / cancelar
* Soporte para contenido dinámico
* Navegación por teclado (esc)

---

### 9.3 Arquitectura del sistema

* Implementar como **módulos reutilizables en JavaScript Vanilla**
* Sin dependencias externas
* Inicializados una sola vez y consumidos desde cualquier vista
* Estilos centralizados y alineados con `uisystemguide.md`

---

### 9.2 Dialogs (Modales)

Los dialogs se usarán para **acciones que requieren confirmación explícita del usuario**.

Usos obligatorios:

* Confirmación de eliminación
* Acciones irreversibles
* Cierre de sesión
* Cambios críticos de estado

Reglas:

* Un solo sistema de dialogs para todo el proyecto
* Overlay consistente y bloqueante
* CTA claros: confirmar / cancelar
* Soporte para contenido dinámico
* Navegación por teclado (esc)

---

### 9.3 Arquitectura del sistema

* Implementar como **módulos reutilizables en JavaScript Vanilla**
* Sin dependencias externas
* Inicializados una sola vez y consumidos desde cualquier vista
* Estilos centralizados y alineados con `uisystemguide.md`

---

## 10. Reglas del sistema de agenda (CRÍTICO)

El sistema de agenda es el **núcleo del producto** y debe seguir reglas estrictas para evitar inconsistencias.

### 10.1 Creación de citas

* No permitir citas en el pasado
* No permitir citas sin:

  * servicio
  * profesional
  * fecha
  * hora de inicio
* La duración de la cita se determina por el servicio

### 10.2 Solapamiento de citas

* Un profesional **no puede tener dos citas que se crucen en el tiempo**
* Antes de guardar una cita, validar:

  * hora_inicio + duración_servicio <= hora_inicio_siguiente
* Bloquear creación si existe conflicto

### 10.3 Horarios del profesional

* Las citas solo pueden crearse dentro de los **horarios disponibles del profesional**
* No permitir citas fuera de ese rango

### 10.4 Estados de la cita

Estados mínimos obligatorios:

* pendiente
* confirmada
* cancelada
* completada

Reglas:

* Una cita cancelada no puede marcarse como completada
* Una cita completada no puede editarse

---

## 11. Estructura de carpetas (OBLIGATORIA)

La IA debe respetar estrictamente esta estructura para mantener orden y escalabilidad.

```
/src
  /assets
    /icons
    /images
    /fonts

  /css
    base.css
    layout.css
    components.css
    pages.css

  /js
    /core        # lógica base (supabase, auth, config)
    /modules     # agenda, servicios, profesionales, promociones
    /components  # toast, dialogs, ui reutilizable
    /pages       # lógica específica por vista
    /utils       # helpers, validaciones

  /pages
    dashboard.html
    agenda.html
    catalogo.html

  main.js
```

Reglas:

* No mezclar lógica de negocio con UI
* No duplicar lógica entre módulos
* Todo componente reutilizable va en `/components`

---

## 12. Criterios de calidad

Antes de considerar una tarea como completa:

* No hay errores de consola
* El diseño es responsive
* La lógica contempla edge cases
* El código es legible y comentado cuando sea necesario
* El sistema de toast y dialogs se usa correctamente
* No se agregó ninguna librería externa

---

## 11. Regla final (CRÍTICA)

Si existe duda entre:

* rapidez vs calidad
* simple vs complejo

👉 **Siempre elegir la opción más simple, clara y mantenible.**

Este proyecto debe crecer sin deuda técnica innecesaria.