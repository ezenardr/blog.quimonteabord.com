import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import 'dotenv/config';

const connectionString = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const sql = postgres(connectionString, { max: 1 });
const db = drizzle(sql);

async function MigrateDB() {
    console.log('migrating');
    await migrate(db, { migrationsFolder: 'drizzle' });
    console.log('db migrated');
    process.exit(0);
}
MigrateDB().catch((err) => {
    console.log(err);
    process.exit(0);
});
