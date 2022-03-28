import 'reflect-metadata'
import { DataSource } from 'typeorm'
import Express, { json } from 'express'
import { createTransport } from 'nodemailer'
import { config } from 'dotenv'

import { entities, User } from '@libregifts/orm'

import { router } from './router'
import { hash } from 'bcrypt'
import compression from 'compression'

config()

export const AppDataSource = new DataSource({
  type: 'mariadb',
  host: process.env?.MYSQL_HOST ?? 'localhost',
  port: (process.env?.MYSQL_PORT ?? 3306) as number,
  username: process.env?.MYSQL_USER ?? 'test',
  password: process.env?.MYSQL_PASSWORD ?? 'test',
  database: process.env?.MYSQL_DATABASE ?? 'test',
  charset: 'utf8_czech_ci',
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

async function start() {

  AppDataSource.initialize().then(async () => {

    if (process.env?.LIBREGIFTS_EMAIL) {
      const [, users] = await AppDataSource.manager.getRepository(User).findAndCount()
      if (users < 1) {
        const user = new User()
        user.email = process.env?.LIBREGIFTS_EMAIL
        user.firstName = process.env?.LIBREGIFTS_NAME
        user.lastName = process.env?.LIBREGIFTS_SURNAME

        user.password = await hash(process.env?.LIBREGIFTS_PASSWORD, 10)
        await AppDataSource.manager.getRepository(User).save(user)

      }

    }

    const app = Express()

    app.use(json())

    app.use('/', router)
    app.use(compression())

    app.listen(3001)
    console.log('Listening on http://localhost:3001/api')

  }).catch((err) => console.error(err))
}

setTimeout(start, (process.env.START_DELAY ?? 0) as number * 1000)
