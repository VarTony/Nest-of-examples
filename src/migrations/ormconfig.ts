import { DataSource, DataSourceOptions } from "typeorm";
import * as path from 'path';


const dbOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port:  Number(process.env.POSTGRES_PORT),
    database: process.env.POSTGRES_DB,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASS,
    entities: [ path.join(__dirname, "../entities/**/*.entity{.ts,.js}") ],
    migrations: [ path.join(__dirname, '../../dist/migrations/*/*.js') ],
    migrationsTableName: process.env.TYPEORM_MIGRATIONS_TABLE_NAME,
    synchronize: true
}

console.log(path.join(__dirname, '../../dist/migrations/*.js'));

const dataSource = new DataSource(dbOptions);
export default dataSource;