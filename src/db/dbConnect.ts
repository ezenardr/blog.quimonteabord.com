import postgres from 'postgres';
import * as schema from '@/db/schema';
import { drizzle } from 'drizzle-orm/postgres-js';

const connectionString = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const client = postgres(connectionString);
const db = drizzle(client, { schema });
export default db;
