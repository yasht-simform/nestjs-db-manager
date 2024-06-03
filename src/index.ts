import { Injectable } from '@nestjs/common';
import { createConnection, Connection } from 'typeorm';

@Injectable()
export class DatabaseService {
    private connection!: Connection;

    async connect() {
        this.connection = await createConnection({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: 5432,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities: [__dirname + '/entities/*.entity{.ts,.js}'],
            synchronize: true,
        });
    }

    getConnection(): Connection {
        if (!this.connection) {
            throw new Error('Database connection not established');
        }
        return this.connection;
    }
}
