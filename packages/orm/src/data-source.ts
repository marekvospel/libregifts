import 'reflect-metadata'
import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
  type: 'mariadb',
  host: 'localhost',
  port: 3306,
  username: 'test',
  password: 'test',
  database: 'test',
  charset: 'utf8_czech_ci',
  synchronize: true,
  logging: false,
  entities: ['src/entity/**/*.ts'],
  migrations: [],
  subscribers: [],
})
