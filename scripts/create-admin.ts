/**
 * Script para crear el primer usuario administrador.
 * Uso: npx tsx scripts/create-admin.ts
 */

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb://admin:admin123@localhost:27018/osito-mimoso?authSource=admin";

// Definir el schema inline para no depender del path alias
const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, enum: ["admin", "agent"], default: "admin" },
  },
  { timestamps: true },
);

async function createAdmin() {
  // Datos del admin — cambiá estos valores antes de correr el script
  const adminData = {
    email: "admin@ositomimoso.com",
    password: "OsitoAdmin2024!",
    name: "Administrador",
    role: "admin" as const,
  };

  console.log("🔌 Conectando a MongoDB...");
  await mongoose.connect(MONGODB_URI);
  console.log("✅ Conectado");

  const User = mongoose.models.User || mongoose.model("User", UserSchema);

  const existing = await User.findOne({ email: adminData.email });
  if (existing) {
    console.log(`⚠️  Ya existe un usuario con el email: ${adminData.email}`);
    await mongoose.disconnect();
    return;
  }

  const passwordHash = await bcrypt.hash(adminData.password, 12);

  await User.create({
    email: adminData.email,
    passwordHash,
    name: adminData.name,
    role: adminData.role,
  });

  console.log("\n✅ Usuario admin creado exitosamente:");
  console.log(`   📧 Email:      ${adminData.email}`);
  console.log(`   🔑 Contraseña: ${adminData.password}`);
  console.log(`   👤 Nombre:     ${adminData.name}`);
  console.log(`   🛡️  Rol:        ${adminData.role}`);
  console.log("\n⚠️  Cambiá la contraseña después del primer login!\n");

  await mongoose.disconnect();
}

createAdmin().catch((err) => {
  console.error("❌ Error:", err);
  process.exit(1);
});
