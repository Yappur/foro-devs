---
name: devsgnosis-ux-ui
description: Design system y guía de UX/UI para DevsGnosis, la plataforma de documentación técnica colaborativa (Next.js + TailwindCSS + TypeScript). Usar esta skill SIEMPRE que se construya o modifique cualquier componente visual, página, layout, formulario, botón, tarjeta, modal, navegación, tema de color, tipografía o cualquier pieza de interfaz dentro del proyecto DevsGnosis, incluso si el usuario no menciona explícitamente "diseño" o "UI". También aplica cuando se pide crear el "libro virtual" de documentación, vistas de request/aprobación de cambios, perfiles de usuario, o cualquier pantalla nueva del producto. Contiene la paleta de colores oficial, tipografías, reglas de botones, tokens de Tailwind y patrones de componentes reutilizables.
---
 
# DevsGnosis — Design System (UX/UI)
 
Guía de diseño para construir cualquier interfaz de **DevsGnosis**, la plataforma donde programadores publican, actualizan y consumen documentación técnica organizada como un "libro virtual".
 
Esta skill es la fuente de verdad visual del proyecto. Antes de escribir cualquier componente, layout o página, revisa las reglas de abajo. Si estás generando código Tailwind/TypeScript/Next.js, estos tokens deben usarse siempre — nunca inventes colores o fuentes nuevas sin que el usuario lo pida explícitamente.
 
## 1. Identidad
 
- **Nombre del producto**: DevsGnosis
- **Personalidad de marca**: técnica, directa, "hacker-friendly", con un toque editorial (porque es un libro de conocimiento). Piensa en algo entre una terminal y un manual técnico bien diseñado — no un SaaS genérico corporativo.
## 2. Tipografía
 
| Uso | Fuente | Clase Tailwind sugerida |
|---|---|---|
| Primaria (código, headings técnicos, branding, botones) | **Fira Code** | `font-mono` (remapeado) |
| Secundaria (texto de lectura, párrafos, UI general) | **Inter** | `font-sans` |
 
Configuración recomendada en `tailwind.config.ts`:
 
```ts
import type { Config } from "tailwindcss";
 
const config: Config = {
  theme: {
    extend: {
      fontFamily: {
        mono: ["var(--font-fira-code)", "Fira Code", "monospace"],
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
      },
    colors: {
        ink: "#141414",
        primary: "#FF7945",
        cream: "#FEFCE1",
        mint: "#50FF6C",
        danger: "#FF4545",
        muted: "#E0DDD0",
      },
    },
  },
};
export default config;
```
 
Carga con `next/font`:
 
```ts
// app/fonts.ts
import { Fira_Code, Inter } from "next/font/google";
 
export const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  weight: ["400", "500", "600"],
});
 
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});
```
 
**Reglas de uso**:
- Fira Code: títulos de secciones de código, nombres de tecnologías/tags, snippets, badges, y CTAs de botones (le da identidad "dev" al producto).
- Inter: cuerpo de texto de la documentación (los artículos largos deben leerse cómodos, no en monoespaciada), descripciones, formularios, menús.
## 3. Paleta de colores
 
| Token | Hex | Rol |
|---|---|---|
| `--color-ink` | `#141414` | Bordes de botones (bottom + left, 1px), texto sobre fondos claros cuando se necesite máximo contraste |
| `--color-primary` | `#FF7945` | Background principal / superficie de marca, íconos, texto primario sobre fondos oscuros |
| `--color-cream` | `#FEFCE1` | Fondo secundario, texto secundario |
| `--color-mint` | `#50FF6C` | Botón secundario / acciones de éxito, aprobación, "merged" |
 
Tokens en Tailwind (`tailwind.config.ts`):
 
```ts
colors: {
  ink: "#141414",
  primary: "#FF7945",
  cream: "#FEFCE1",
  mint: "#50FF6C",
},
```
 
**Reglas de contraste y jerarquía**:
- `primary` (#FF7945) es el color dominante: úsalo en superficies clave (hero, navbar, CTA principal, íconos activos).
- `cream` (#FEFCE1) es el fondo secundario/alterno — ideal para tarjetas de documentación, paneles laterales, o zonas de lectura donde el texto debe ser cómodo por horas.
- `mint` (#50FF6C) se reserva casi exclusivamente para el **botón secundario** y estados positivos (documentación aprobada, request mergeado, "verified doc"). No lo uses decorativamente porque pierde su significado semántico.
- `ink` (#141414) es el color de borde estructural (ver sección de botones) y de texto de máximo contraste — evita usarlo como fondo grande, es un color de "línea", no de superficie.
## 4. Botones
 
Regla de marca (obligatoria, no la cambies sin confirmación explícita del usuario):
 
> Todo botón lleva **border-bottom y border-left de 1px solid `#141414`**. Sin border-top ni border-right. Esto crea una sombra "dura" tipo neobrutalista/retro-técnica — es parte de la identidad visual de DevsGnosis, no un detalle accesorio.
 
Clase base en Tailwind:
 
```tsx
// components/ui/button.tsx
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
 
const buttonVariants = cva(
  "font-mono font-medium px-4 py-2 border-b border-l border-ink transition-transform active:translate-y-[1px] active:translate-x-[1px]",
  {
    variants: {
      variant: {
        primary: "bg-primary text-cream hover:opacity-90",
        secondary: "bg-mint text-ink hover:opacity-90",
        ghost: "bg-cream text-ink hover:bg-primary hover:text-cream",
      },
      size: {
        sm: "text-sm px-3 py-1.5",
        md: "text-base px-4 py-2",
        lg: "text-lg px-6 py-3",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);
 
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}
 
export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}
```
 
**Micro-interacción recomendada**: al hacer `active`, desplaza el contenido 1px hacia abajo-derecha (`active:translate-y-[1px] active:translate-x-[1px]`) para que el borde inferior/izquierdo "se sienta" como un botón físico presionándose contra su propio borde. Refuerza la identidad del border-bottom/border-left.
 
- **Primario** → fondo `primary` (#FF7945), texto `cream`. Úsalo para la acción principal de la pantalla (ej. "Publicar documentación", "Crear request de cambio").
- **Secundario** → fondo `mint` (#50FF6C), texto `ink`. Úsalo para acciones positivas/confirmatorias secundarias (ej. "Aprobar cambio", "Merge request").
- **Ghost/terciario** → fondo `cream`, texto `ink`, hover a `primary`. Para acciones de bajo compromiso (cancelar, ver más).
## 5. Componentes clave del producto
 
Estos son los bloques de UI que se repiten en DevsGnosis — mantené consistencia de tokens en todos:
 
### 5.1 Tarjeta de documento (Doc Card)
- Fondo `cream`, borde `ink` (bottom+left 1px, igual que botones, para consistencia del sistema).
- Título en `font-mono` (tech feel), descripción en `font-sans`.
- Tag de tecnología (Next.js, Prisma, etc.) como badge pequeño en `font-mono`, fondo `primary`, texto `cream`.
- Indicador de estado del doc: `mint` = actualizado/verificado, un tono neutro grisáceo = desactualizado (definir un gris neutro fuera de la paleta de marca para no confundir semántica).
### 5.2 Request de actualización (Update Request)
Es el corazón funcional del producto — como un "pull request" pero para documentación. UI recomendada tipo diff/PR:
- Encabezado con avatar del autor, fecha, y badge de estado (`pending` neutro, `approved` en `mint`, `rejected` en un rojo neutro fuera de paleta).
- Vista de diff con línea vertical `ink` marcando el cambio.
- Botones de acción (Aprobar = secondary/mint, Rechazar = ghost, Comentar = ghost).
### 5.3 Libro virtual (Book View)
- Sidebar de navegación (tabla de contenidos) con fondo `cream`, ítem activo resaltado con borde izquierdo `primary` de 3-4px (variación intencional del patrón de borde, para diferenciarlo de botones).
- Contenido central en `font-sans` sobre fondo blanco/`cream` muy claro para máxima legibilidad de lectura larga.
- Bloques de código con fondo `ink`, texto `cream`/`primary`, fuente `font-mono` — es el único lugar recomendado para fondo oscuro completo, reforzando que "código = ink".
### 5.4 Navbar
- Fondo `primary`, texto e íconos `cream`.
- Logo/wordmark en `font-mono`.
- CTA principal (ej. "Nuevo documento") como botón `ghost` invertido (fondo `cream`, texto `ink`) para que resalte sobre el navbar naranja.
## 6. Espaciado, bordes y esquinas
 
- Usa esquinas rectas o muy sutiles (`rounded-none` o `rounded-sm` máx.) — el sistema de bordes duros (bottom+left) no combina bien con `rounded-xl` o sombras difusas tipo Material. Nada de `shadow-lg` genéricas: la "sombra" del producto es el borde `ink`, no un `box-shadow` con blur.
- Escala de espaciado: usa la escala estándar de Tailwind (4px base) sin modificar, para mantener ritmo vertical consistente entre densidad de código y densidad de lectura.
## 7. Accesibilidad
 
- `#FF7945` sobre `#FEFCE1` tiene contraste moderado — verificar con texto grande/bold o usar `ink` para texto de cuerpo sobre `cream`, reservando `primary` para texto grande, íconos o superficies.
- `#50FF6C` sobre fondos claros tiene contraste bajo para texto pequeño — úsalo como fondo de botón con texto `ink` (no `cream`) para cumplir WCAG AA, o como acento de borde/ícono, no como color de texto sobre fondo claro.
- Mantener focus rings visibles (`focus-visible:ring-2 focus-visible:ring-ink`) en todos los elementos interactivos, ya que el sistema de bordes duros hace que sea fácil "esconder" el foco por accidente.
## 8. Cuándo pedir input al usuario
 
Si una pantalla nueva no está cubierta por los patrones de arriba (ej. un dashboard de analytics, un editor WYSIWYG específico), proponé una solución consistente con estos tokens y preguntá al usuario solo si hay ambigüedad real de producto (no de estilo) — los tokens de color/tipografía/bordes nunca deberían necesitar confirmación, ya están definidos.