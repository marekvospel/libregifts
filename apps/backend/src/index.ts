import 'reflect-metadata'
import { DataSource } from 'typeorm'
import Express, { json } from 'express'
import { createTransport } from 'nodemailer'
import { config } from 'dotenv'

import { entities } from '@libregifts/orm'

import { router } from './router'

config()

export const AppDataSource = new DataSource({
  type: 'mariadb',
  host: process.env?.MYSQL_HOST ?? 'localhost',
  port: (process.env?.MYSQL_PORT ?? 3306) as number,
  username: process.env?.MYSQL_USER ?? 'test',
  password: process.env?.MYSQL_PASSWORD ?? 'test',
  database: process.env?.MYSQL_DATABASE ?? 'test',
  charset: 'utf8mb4_unicode_ci',
  synchronize: false,
  logging: false,
  entities: entities,
  migrations: [],
  subscribers: [],
})

export const transporter = createTransport({
  host: process.env?.SMTP_HOST ?? '',
  port: (process.env?.SMTP_PORT ?? 465) as number,
  secure: (process.env?.SMTP_SECURE === 'true'),
  auth: {
    user: process.env?.SMTP_USERNAME ?? '',
    pass: process.env?.SMTP_PASSWORD ?? '',
  },
})

AppDataSource.initialize().then(async () => {

  const app = Express()

  app.use(json())

  app.use('/', router)

  app.listen(3001)
  console.log('Listening on http://localhost:3001/')

}).catch((err) => console.error(err))