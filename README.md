# Agricultural Energy Calcualtion and Analysis System

### Useful Commands

```
yarn add drizzle-orm pg
yarn add -D drizzle-kit @types/pg
```

### Useful Code Snippets
Postgres DB_URL for drizzle
```
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
```
drizzle.ts
```
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema';

const sql = process.env.DATABASE_URL!;
const db = drizzle(sql, { schema });

export default db;
```
drizzle.config.ts
```
import 'dotenv/config';
import type { Config } from 'drizzle-kit';

export default {
  dialect: 'postgresql',
  schema: './db/schema',
  out: './drizzle',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  }
} satisfies Config;
```