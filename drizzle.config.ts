import type { Config } from 'drizzle-kit';
import 'dotenv/config';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    throw new Error('DATABASE_URL is missing');
}
export default {
    schema: './src/db/schema.ts',
    out: './drizzle',
    driver: 'pg',
    dbCredentials: {
        connectionString: process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    },
} satisfies Config;
