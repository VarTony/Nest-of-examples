import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm'
const path = require('path');


@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.POSTGRES_HOST,
            port:  Number(process.env.POSTGRES_PORT),
            database: process.env.POSTGRES_DB,
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASS,
            entities: [ path.join(__dirname, "../entities/**/*.entity{.ts,.js}") ],
            synchronize: true
        })
    ]
})
export class DbConnection {};