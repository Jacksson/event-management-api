// src/infrastructure/database/Database.ts

import { Pool } from 'pg';

export class Database {
    private static pool: Pool;

    // Inicializa la conexión con la base de datos
    public static init(): void {
        if (!Database.pool) {
            Database.pool = new Pool({
                user: process.env.DB_USER,
                host: process.env.DB_HOST,
                database: process.env.DB_NAME,
                password: process.env.DB_PASSWORD,
                port: parseInt(process.env.DB_PORT || '5432'),
            });

            Database.pool.on('connect', () => {
                console.log('Connected to the database');
            });

            Database.pool.on('error', (err) => {
                console.error('Unexpected error on idle client', err);
                process.exit(-1);
            });
        }
    }

    // Método para obtener la instancia del pool de conexiones
    public static getPool(): Pool {
        if (!Database.pool) {
            throw new Error('Database not initialized. Call Database.init() first.');
        }
        return Database.pool;
    }

    // Método para cerrar todas las conexiones
    public static async closeAllConnections(): Promise<void> {
        if (Database.pool) {
            await Database.pool.end();
            console.log('Database connections closed');
        }
    }
}
