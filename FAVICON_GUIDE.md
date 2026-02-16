# Guía para Generar Favicons - Osito Mimoso

## Opción 1: Usando el Script Automatizado (Recomendado)

### Paso 1: Instalar la dependencia

```bash
npm install --save-dev sharp
```

### Paso 2: Ejecutar el script

```bash
node scripts/generate-favicons.js
```

Esto generará automáticamente todos los favicons necesarios en la carpeta `public/`:

- `favicon.ico` (32x32)
- `favicon-16x16.png`
- `favicon-32x32.png`
- `apple-touch-icon.png` (180x180)
- `android-chrome-192x192.png`
- `android-chrome-512x512.png`

---

## Opción 2: Usando una Herramienta Online

### Paso 1: Ir a Favicon.io

Visita: https://favicon.io/favicon-converter/

### Paso 2: Subir el logo

- Arrastra o selecciona el archivo: `public/logo.png`
- La herramienta generará automáticamente todos los tamaños

### Paso 3: Descargar el paquete

- Haz clic en "Download"
- Extrae el archivo ZIP descargado

### Paso 4: Copiar los archivos

Copia todos los archivos del ZIP a la carpeta `public/` de tu proyecto:

- `favicon.ico`
- `favicon-16x16.png`
- `favicon-32x32.png`
- `apple-touch-icon.png`
- `android-chrome-192x192.png`
- `android-chrome-512x512.png`

---

## Opción 3: Usando RealFaviconGenerator (Más Completo)

### Paso 1: Ir a RealFaviconGenerator

Visita: https://realfavicongenerator.net/

### Paso 2: Subir el logo

- Selecciona el archivo: `public/logo.png`

### Paso 3: Personalizar (opcional)

- Puedes ajustar colores de fondo
- Configurar márgenes
- Personalizar para diferentes plataformas

### Paso 4: Generar

- Haz clic en "Generate your Favicons and HTML code"
- Descarga el paquete

### Paso 5: Instalar

- Extrae el ZIP
- Copia todos los archivos a `public/`
- El código HTML ya está configurado en `app/layout.tsx`

---

## Verificación

Después de generar los favicons, verifica que existan estos archivos en `public/`:

```
public/
├── favicon.ico
├── favicon-16x16.png
├── favicon-32x32.png
├── apple-touch-icon.png
├── android-chrome-192x192.png
└── android-chrome-512x512.png
```

## Prueba

1. Reinicia el servidor de desarrollo
2. Abre el navegador en `http://localhost:3000`
3. Verifica que el favicon aparezca en la pestaña del navegador
4. Prueba agregando la página a favoritos para ver el favicon en alta resolución

---

## Notas Importantes

- El logo actual está en: `public/logo.png`
- Los metadatos ya están configurados en: `app/layout.tsx`
- Los favicons deben estar en la carpeta `public/` (raíz del proyecto)
- Next.js automáticamente servirá estos archivos desde la raíz del sitio
