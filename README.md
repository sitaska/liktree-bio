# Linktree - Las Cositas de Sita

Web responsive en Astro para centralizar enlaces, banners, redes y botones.

## Arranque local

1. Instala dependencias:
	npm install
2. Inicia en desarrollo:
	npm run dev
3. Abre en navegador:
	http://localhost:4321

## CMS visual (Sanity)

Este proyecto ya esta conectado a Sanity CMS para que puedas:

1. Subir imagenes de avatar y banners.
2. Editar botones, enlaces y textos de forma visual.
3. Controlar quien edita el contenido.

### 1) Configurar variables

1. Duplica .env.example a .env.
2. Rellena SANITY_PROJECT_ID y SANITY_DATASET.
3. Si usas dataset privado, anade SANITY_API_READ_TOKEN.

### 2) Abrir el panel visual del CMS

1. Inicia el studio:
	npm run cms:dev
2. Abre en navegador:
	http://localhost:3333

### 3) Publicar cambios en tu web

Cada cambio que publiques en Sanity se reflejara en tu web al hacer deploy en Vercel.
Tu pagina sigue funcionando aunque Sanity no este configurado, porque usa fallback local.

## Acceso solo para ti

Para que solo tu puedas editar:

1. En sanity.io entra en tu proyecto > Members.
2. Invita solo tu email como Administrator o Editor.
3. Elimina otros miembros si los hay.
4. Mantén el token de lectura solo en Vercel (variable de entorno), nunca en publico.

## Donde editar contenido rapidamente

Con CMS activo, lo normal es editar en Sanity Studio.

Si quieres editar manualmente en codigo, sigue usando:

src/data/site.ts

Desde ahi puedes cambiar:

1. Perfil: nombre, descripcion, avatar.
2. Banners: titulo, imagen y CTA.
3. Enlaces principales: botones tipo Linktree.
4. Redes sociales.
5. SEO: titulo y descripcion.

## Estructura principal

1. src/data/site.ts: contenido editable.
2. src/pages/index.astro: estructura visual de la pagina.
3. src/layouts/Layout.astro: base HTML, SEO y tipografia Plus Jakarta Sans.
4. src/lib/sanity.ts: conexion con Sanity CMS.
5. sanity/schemaTypes/homepageType.ts: modelo visual del CMS.

## Personalizacion visual

La paleta base ya esta definida con tus colores:

1. #0066FF
2. #FF6B35
3. #6B7280
4. #0A1128
5. #FAFAF8

Se encuentra en variables CSS dentro de src/pages/index.astro.

## Despliegue en Vercel

1. Sube el proyecto a GitHub.
2. En Vercel, pulsa Add New Project e importa el repositorio.
3. Framework Preset: Astro (Vercel lo detecta automaticamente).
4. Build Command: npm run build
5. Output Directory: dist
6. Pulsa Deploy.

Variables recomendadas en Vercel:

1. SANITY_PROJECT_ID
2. SANITY_DATASET
3. SANITY_API_VERSION
4. SANITY_USE_CDN
5. SANITY_API_READ_TOKEN (solo si dataset privado)

## Dominio about.lascositasdesita.com

1. En Vercel: Project Settings > Domains > Add.
2. Agrega about.lascositasdesita.com.
3. En tu proveedor DNS, crea un CNAME:
	Host: about
	Value: cname.vercel-dns.com
4. Espera propagacion y verifica en Vercel.

## Consejo de mantenimiento

Cada vez que quieras anadir o quitar links, no toques el layout: solo actualiza src/data/site.ts.
