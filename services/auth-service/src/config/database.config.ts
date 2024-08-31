import { Pool } from 'pg';
import { ENV } from './env';

const pool = new Pool({
    host: ENV.DB_HOST,
    port: ENV.DB_PORT,
    user: ENV.DB_USER,
    password: ENV.DB_PASSWORD,
    database: ENV.DB_NAME,
});

export default pool;
