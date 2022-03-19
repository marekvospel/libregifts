import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Permission, User } from 'orm'
import Express, { json } from 'express'
import * as console from 'console'
import { router } from './router'

export const AppDataSource = new DataSource({
  type: 'mariadb',
  host: 'localhost',
  port: 3306,
  username: 'test',
  password: 'test',
  database: 'test',
  synchronize: false,
  logging: false,
  entities: [User, Permission],
  migrations: [],
  subscribers: [],
})

AppDataSource.initialize().then(async () => {

  const app = Express()

  app.use(json())

  app.use('/', router)

  app.listen(3001)
  console.log('Listening on http://localhost:3001/')

}).catch((err) => console.error(err))