---
trigger: model_decision
---

---
trigger: model_decision
---

# System Prompt para IDE con IA

Este documento define **reglas estrictas, alcance funcional, arquitectura y criterios de calidad** para el desarrollo de un **SaaS de gestiÃ³n de agenda de servicios**. Debe ser interpretado como **fuente de verdad Ãºnica (single source of truth)** durante todo el proyecto.

---

## 1. Stack tecnolÃ³gico (NO NEGOCIABLE)

* **Empaquetador:** Vite
* **Backend / BaaS:** Supabase (Auth, Database, Storage, Policies)
* **Frontend:** HTML + CSS + JavaScript Vanilla (ES6+)
* **Recursos UI:**

  * Iconos: RemixIcon
  * TipografÃ­a: Inter, de Google Fonts

â— **Prohibido** usar frameworks o librerÃ­as externas (React, Vue, Tailwind, Bootstrap, Moment, Lodash, etc.) **a menos que el propietario del proyecto lo autorice explÃ­citamente**.

---

## 2. Principios generales de desarrollo

* CÃ³digo **simple, explÃ­cito y mantenible** (priorizar claridad sobre abstracciÃ³n prematura)
* SeparaciÃ³n estricta de responsabilidades:

  * HTML: estructura
  * CSS: presentaciÃ³n
  * JS: lÃ³gica
* Evitar overengineering
* Toda decisiÃ³n debe alinearse con un **SaaS escalable y comercial**

---

## 3. DescripciÃ³n del proyecto

*Nombre del Saas: Citum

SaaS para la **gestiÃ³n de agenda de servicios profesionales**, orientado a:

* Salones de belleza
* BarberÃ­as
* EstÃ©ticas
* Spas
* Negocios de servicios bajo cita previa

El sistema se compone de **tres interfaces principales**:

1. Dashboard (propietario del negocio)
2. Agenda del profesional
3. CatÃ¡logo / Interfaz cliente final

---

## 4. Dashboard (Panel administrativo)

Interfaz exclusiva para el **propietario o administrador del negocio**.

### 4.1 Estructura UI obligatoria

* **Sidebar** lateral con todas las secciones
* **BotÃ³n de cerrar sesiÃ³n** fijo en la parte inferior del sidebar
* **Header** persistente con:

  * Barra de bÃºsqueda contextual (busca dentro de la secciÃ³n activa)
* **Main content** dinÃ¡mico segÃºn secciÃ³n activa
* **DiseÃ±o 100% responsive** (mobile, tablet, desktop)

---

### 4.2 Secciones del Dashboard

#### 4.2.1 Dashboard (Home)

* VisualizaciÃ³n general del negocio
* MÃ©tricas iniciales (preparadas para escalar):

  * Servicios agendados
  * Profesionales activos
  * Ingresos (si aplica)

---

#### 4.2.2 Mi negocio

ConfiguraciÃ³n general del negocio.

**Tabla requerida:** `business`

Campos mÃ­nimos:

* id
* nombre (required)
* logo / imagen
* direcciÃ³n
* redes sociales
* created_at

---

#### 4.2.3 Profesionales (CRUD)

**Tabla:** `professionals`

Campos obligatorios:

* id
* cÃ³digo_acceso (Ãºnico, usado para acceder a su agenda)
* nombre (required)
* profesiÃ³n
* horarios_disponibles
* servicios_asignados
* avatar / foto
* estado (activo / inactivo)

---

#### 4.2.4 Servicios

##### CategorÃ­as de servicios

**Tabla:** `service_categories`

Campos:

* id
* nombre (required)
* descripciÃ³n opcional

##### Servicios

**Tabla:** `services`

Campos obligatorios:

* id
* nombre (required)
* duraciÃ³n (en minutos)
* precio
* profesionales_asignados
* categorÃ­a_id (FK)
* imagen
* estado

---

#### 4.2.5 Promociones

Promociones visibles en el catÃ¡logo del cliente final.

**Tabla:** `promotions`

Campos obligatorios:

* id
* nombre (required)
* valor
* fecha_inicio (required)
* fecha_fin (required)
* estado (activa / inactiva)
* imagen

âš ï¸ Reglas de validaciÃ³n estrictas:

* No permitir fecha fin < fecha inicio
* No permitir fechas vacÃ­as
* No permitir fechas anteriores al dÃ­a actual
* DesactivaciÃ³n automÃ¡tica al superar fecha_fin

---

#### 4.2.6 Soporte

GestiÃ³n de solicitudes de soporte.

**Tabla:** `support_tickets`

Campos:

* id
* asunto
* descripciÃ³n
* estado (abierto / en progreso / cerrado)
* created_at

---

## 5. Agenda del profesional

Interfaz independiente accesible mediante **cÃ³digo Ãºnico del profesional**.

CaracterÃ­sticas:

* VisualizaciÃ³n de citas asignadas
* Horarios claros y ordenados
* Enfoque mobile-first
* Sin acceso a configuraciÃ³n del negocio

---

## 6. CatÃ¡logo / Interfaz cliente final

Interfaz pÃºblica para clientes del negocio.

Funciones mÃ­nimas:

* Ver servicios y categorÃ­as
* Ver promociones activas
* Seleccionar profesional (si aplica)
* Agendar cita

UX clara, simple y enfocada en conversiÃ³n.

---

## 7. Base de datos (Supabase)

* Todas las tablas deben:

  * Tener claves primarias
  * Usar `NOT NULL` en campos crÃ­ticos
  * Validar lÃ³gica del negocio antes de insertar
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

## 9. Sistema global de notificaciones y diÃ¡logos (OBLIGATORIO)

El proyecto debe contar con un **sistema unificado y consistente de Toast Notifications y Dialogs**, reutilizable en **todas las interfaces** (Dashboard, Agenda del profesional y CatÃ¡logo cliente).

### 9.1 Toast Notifications

Los toast notifications se usarÃ¡n para **feedback inmediato y no bloqueante**.

Tipos obligatorios:

* success (acciones exitosas)
* error (errores crÃ­ticos o de validaciÃ³n)
* warning (acciones riesgosas o datos incompletos)
* info (informaciÃ³n contextual)

Reglas:

* DiseÃ±o y animaciones consistentes en todo el proyecto
* PosiciÃ³n definida (ej: top-right o bottom-center) y no cambiante
* Auto-dismiss configurable segÃºn tipo
* Nunca usar alert() del navegador
* Deben ser accesibles (contraste, legibilidad)

Ejemplos de uso:

* CreaciÃ³n / ediciÃ³n / eliminaciÃ³n exitosa
* Errores de validaciÃ³n
* Fallos de conexiÃ³n con Supabase
* Acciones automÃ¡ticas (promociÃ³n desactivada por fecha)

---

### 9.2 Dialogs (Modales)

Los dialogs se usarÃ¡n para **acciones que requieren confirmaciÃ³n explÃ­cita del usuario**.

Usos obligatorios:

* ConfirmaciÃ³n de eliminaciÃ³n
* Acciones irreversibles
* Cierre de sesiÃ³n
* Cambios crÃ­ticos de estado

Reglas:

* Un solo sistema de dialogs para todo el proyecto
* Overlay consistente y bloqueante
* CTA claros: confirmar / cancelar
* Soporte para contenido dinÃ¡mico
* NavegaciÃ³n por teclado (esc)

---

### 9.3 Arquitectura del sistema

* Implementar como **mÃ³dulos reutilizables en JavaScript Vanilla**
* Sin dependencias externas
* Inicializados una sola vez y consumidos desde cualquier vista
* Estilos centralizados y alineados con `uisystemguide.md`

---

### 9.2 Dialogs (Modales)

Los dialogs se usarÃ¡n para **acciones que requieren confirmaciÃ³n explÃ­cita del usuario**.

Usos obligatorios:

* ConfirmaciÃ³n de eliminaciÃ³n
* Acciones irreversibles
* Cierre de sesiÃ³n
* Cambios crÃ­ticos de estado

Reglas:

* Un solo sistema de dialogs para todo el proyecto
* Overlay consistente y bloqueante
* CTA claros: confirmar / cancelar
* Soporte para contenido dinÃ¡mico
* NavegaciÃ³n por teclado (esc)

---

### 9.3 Arquitectura del sistema

* Implementar como **mÃ³dulos reutilizables en JavaScript Vanilla**
* Sin dependencias externas
* Inicializados una sola vez y consumidos desde cualquier vista
* Estilos centralizados y alineados con `uisystemguide.md`

---

## 10. Reglas del sistema de agenda (CRÃTICO)

El sistema de agenda es el **nÃºcleo del producto** y debe seguir reglas estrictas para evitar inconsistencias.

### 10.1 CreaciÃ³n de citas

* No permitir citas en el pasado
* No permitir citas sin:

  * servicio
  * profesional
  * fecha
  * hora de inicio
* La duraciÃ³n de la cita se determina por el servicio

### 10.2 Solapamiento de citas

* Un profesional **no puede tener dos citas que se crucen en el tiempo**
* Antes de guardar una cita, validar:

  * hora_inicio + duraciÃ³n_servicio <= hora_inicio_siguiente
* Bloquear creaciÃ³n si existe conflicto

### 10.3 Horarios del profesional

* Las citas solo pueden crearse dentro de los **horarios disponibles del profesional**
* No permitir citas fuera de ese rango

### 10.4 Estados de la cita

Estados mÃ­nimos obligatorios:

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
    /core        # lÃ³gica base (supabase, auth, config)
    /modules     # agenda, servicios, profesionales, promociones
    /components  # toast, dialogs, ui reutilizable
    /pages       # lÃ³gica especÃ­fica por vista
    /utils       # helpers, validaciones

  /pages
    dashboard.html
    agenda.html
    catalogo.html

  main.js
```

Reglas:

* No mezclar lÃ³gica de negocio con UI
* No duplicar lÃ³gica entre mÃ³dulos
* Todo componente reutilizable va en `/components`

---

## 12. Criterios de calidad

Antes de considerar una tarea como completa:

* No hay errores de consola
* El diseÃ±o es responsive
* La lÃ³gica contempla edge cases
* El cÃ³digo es legible y comentado cuando sea necesario
* El sistema de toast y dialogs se usa correctamente
* No se agregÃ³ ninguna librerÃ­a externa

---

## 11. Regla final (CRÃTICA)

Si existe duda entre:

* rapidez vs calidad
* simple vs complejo

ðŸ‘‰ **Siempre elegir la opciÃ³n mÃ¡s simple, clara y mantenible.**

Este proyecto debe crecer sin deuda tÃ©cnica innecesaria.