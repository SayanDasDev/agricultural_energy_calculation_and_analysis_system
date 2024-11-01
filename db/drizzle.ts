import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema';

const sql = process.env.DATABASE_URL!;
const db = drizzle(sql, { schema });

export default db;