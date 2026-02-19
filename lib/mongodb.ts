import mongoose from "mongoose";

// Si existe MONGODB_URI_LOCAL (desarrollo), la usa. Si no, usa MONGODB_URI (producción).
const MONGODB_URI = process.env.MONGODB_URI_LOCAL || process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Ni MONGODB_URI_LOCAL ni MONGODB_URI están definidas en las variables de entorno",
  );
}

// Cache de conexión para evitar múltiples conexiones en desarrollo (hot reload)
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache ?? {
  conn: null,
  promise: null,
};
global.mongooseCache = cached;

export async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI as string, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
