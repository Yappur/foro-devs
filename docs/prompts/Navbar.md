# Navbar premium para DevsGnosis

Teniendo en cuenta los archivos `ux-ui.md` y `architecture.md` definidos como Skills del proyecto, diseñá e implementá un **Navbar distintivo, premium y memorable** para DevsGnosis.

## Contexto

DevsGnosis es una plataforma para desarrolladores donde los usuarios pueden:

* Publicar documentación sobre programación y tecnología.
* Mejorar y actualizar documentación existente mediante requests.
* Explorar conocimiento técnico.
* Construir progresivamente una especie de biblioteca/libro virtual de conocimiento para developers.

El Navbar estará presente en **todas las páginas**, por lo que debe funcionar como una de las principales piezas de identidad visual y navegación del producto.

## Antes de implementar

Primero analizá cuidadosamente:

1. `ux-ui.md`
2. `architecture.md`
3. La estructura actual del proyecto.
4. Los componentes existentes en `components/`.
5. El `layout` actual.
6. `globals.css` y cualquier sistema de diseño existente.

**No inventes patrones que contradigan las decisiones tomadas en esos Skills.**

Si ya existen componentes, tokens, variables CSS, utilidades o patrones reutilizables, aprovechalos en lugar de duplicarlos.

---

## Objetivo visual

No quiero un Navbar genérico de SaaS.

Quiero que transmita:

* conocimiento
* tecnología
* comunidad
* profundidad
* precisión
* exploración
* cultura hacker
* documentación técnica

La estética hacker debe ser **sutil, sofisticada y moderna**.

### Evitar

No quiero:

* el típico efecto Matrix con lluvia de caracteres
* exceso de verde fosforescente
* glitches exagerados
* terminales falsas
* demasiados bordes luminosos
* animaciones innecesarias
* estética cyberpunk genérica
* un Navbar que parezca sacado de una plantilla de landing page de IA

La sensación debería ser más cercana a:

> "Una biblioteca de conocimiento construida por hackers."

que a:

> "Una página cyberpunk."

---

## Concepto creativo

Buscá una idea visual propia para representar la identidad de DevsGnosis.

El Navbar debería sentirse como una **interfaz de acceso al conocimiento**.

Podés explorar conceptos como:

* terminal sofisticada
* sistema de conocimiento
* índice de documentación
* biblioteca digital
* grafo de conocimiento
* consola de navegación
* metadata técnica

Pero no combines todos los conceptos indiscriminadamente. Elegí **una dirección visual coherente**.

Quiero que tenga un pequeño detalle inesperado que haga que alguien piense:

> "Este Navbar no parece el de cualquier aplicación."

---

## Requisitos funcionales

Implementá el componente en:

`components/Navbar`

Y posteriormente integralo correctamente en el `layout` global de la aplicación.

El Navbar debe contemplar, según corresponda al producto y a la arquitectura existente:

* Logo / identidad de DevsGnosis.
* Navegación principal.
* Acceso a documentación.
* Búsqueda.
* Acciones relacionadas con publicar documentación.
* Requests / contribuciones si corresponde.
* Estado de autenticación.
* Perfil del usuario.
* Login / registro cuando corresponda.

**No agregues opciones arbitrarias solamente para llenar espacio.**

La navegación debe responder a la arquitectura real de la aplicación.

---

## UX

El Navbar debe:

* ser inmediatamente comprensible.
* tener una jerarquía visual clara.
* funcionar perfectamente en desktop.
* tener una experiencia mobile cuidadosamente diseñada.
* mantener accesibles las acciones importantes.
* tener estados `hover`, `focus`, `active` y `disabled` coherentes.
* respetar navegación mediante teclado.
* tener buen contraste.
* utilizar elementos semánticos.
* no depender exclusivamente de iconos para comunicar acciones.
* evitar movimientos que distraigan de la lectura.

En mobile no quiero simplemente ocultar elementos.

Diseñá una experiencia de navegación mobile deliberada.

---

## Animaciones

Utilizá microinteracciones elegantes.

Las animaciones deben comunicar interacción y no ser decoración gratuita.

Podés utilizar:

* transición de estados
* aparición suave del menú
* indicadores de navegación
* pequeños cambios de posición
* efectos de highlight
* microanimaciones en iconos

Si existe una oportunidad para utilizar una interacción particularmente interesante, implementala, pero mantené la interfaz profesional.

Respetá `prefers-reduced-motion`.

---

## Sistema visual

Integrá los principios visuales definidos en `ux-ui.md` dentro de `globals.css`.

No crees un sistema visual paralelo.

Centralizá cuando corresponda:

* colores
* tipografías
* variables CSS
* spacing
* border radius
* sombras
* backgrounds
* efectos
* transiciones

El Navbar debe utilizar el sistema de diseño existente y, si falta algún token necesario, agregalo de forma coherente.

---

## Tipografía

Prestá especial atención a la tipografía porque DevsGnosis es una plataforma orientada a developers.

La tipografía debe contribuir a la sensación de:

* documentación técnica
* precisión
* conocimiento
* código

Si el proyecto ya utiliza fuentes como `Fira Code` o `JetBrains Mono`, respetá su propósito y no las utilices indiscriminadamente.

---

## Arquitectura

Respetá estrictamente `architecture.md`.

El componente debe:

* estar ubicado donde corresponde.
* respetar Server Components / Client Components según necesidad.
* evitar `"use client"` si no es necesario.
* no introducir dependencias innecesarias.
* reutilizar componentes existentes.
* mantener responsabilidades claras.
* ser fácil de mantener y extender.

Si alguna interacción requiere estado, aislá la lógica interactiva en el componente más pequeño posible.

---

## Responsive

Diseñá primero pensando en la experiencia y después en los breakpoints.

El Navbar debe funcionar correctamente en:

* mobile
* tablet
* desktop
* pantallas grandes

No quiero simplemente un `hidden md:flex`.

La composición, jerarquía y prioridades deben adaptarse realmente al tamaño de pantalla.

---

## Calidad técnica

Antes de terminar:

1. Verificá imports.
2. Verificá rutas.
3. Verificá TypeScript.
4. Verificá que no existan errores de lint.
5. Verificá accesibilidad básica.
6. Verificá responsive.
7. Verificá que el Navbar aparezca correctamente en todas las páginas mediante el `layout`.
8. Eliminá código innecesario.
9. No dupliques estilos existentes.
10. No agregues dependencias si no son realmente necesarias.

---

## Importante

No empieces directamente escribiendo código.

Primero **razoná sobre el diseño**, la arquitectura existente y la identidad de DevsGnosis.

Después implementá la solución.

Quiero una solución que parezca diseñada específicamente para DevsGnosis, no una adaptación de un Navbar genérico.

**Priorizá:**

`identidad > claridad > UX > accesibilidad > mantenibilidad > efectos visuales`

El resultado final debe sentirse como la puerta de entrada a una **biblioteca de conocimiento para developers**, con una estética hacker refinada y propia.