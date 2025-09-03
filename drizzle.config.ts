import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './utils/schema.ts',

  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_nQ6iGq9vKmlA@ep-crimson-hall-ad64d7kk-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  },
});
