// Script para generar favicons desde el logo
// Ejecutar con: node scripts/generate-favicons.js

const fs = require('fs');
const path = require('path');

console.log('📦 Generador de Favicons para Osito Mimoso\n');
console.log('⚠️  Este script requiere que instales "sharp" primero:');
console.log('   npm install --save-dev sharp\n');

// Verificar si sharp está instalado
let sharp;
try {
  sharp = require('sharp');
} catch (error) {
  console.error('❌ Error: El paquete "sharp" no está instalado.');
  console.log('   Por favor ejecuta: npm install --save-dev sharp');
  process.exit(1);
}

const logoPath = path.join(__dirname, '../public/logo.png');
const publicDir = path.join(__dirname, '../public');

// Configuración de tamaños
const sizes = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'android-chrome-192x192.png', size: 192 },
  { name: 'android-chrome-512x512.png', size: 512 },
];

async function generateFavicons() {
  try {
    // Verificar que el logo existe
    if (!fs.existsSync(logoPath)) {
      console.error(`❌ No se encontró el logo en: ${logoPath}`);
      process.exit(1);
    }

    console.log('✅ Logo encontrado\n');
    console.log('🔄 Generando favicons...\n');

    // Generar cada tamaño
    for (const config of sizes) {
      const outputPath = path.join(publicDir, config.name);
      
      await sharp(logoPath)
        .resize(config.size, config.size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 }
        })
        .png()
        .toFile(outputPath);
      
      console.log(`✅ Generado: ${config.name} (${config.size}x${config.size})`);
    }

    // Generar favicon.ico (usando el tamaño 32x32)
    const icoPath = path.join(publicDir, 'favicon.ico');
    await sharp(logoPath)
      .resize(32, 32, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .toFormat('png')
      .toFile(icoPath);
    
    console.log(`✅ Generado: favicon.ico (32x32)`);

    console.log('\n✨ ¡Todos los favicons han sido generados exitosamente!\n');
    console.log('📁 Los archivos están en la carpeta: public/\n');

  } catch (error) {
    console.error('❌ Error al generar favicons:', error.message);
    process.exit(1);
  }
}

generateFavicons();
