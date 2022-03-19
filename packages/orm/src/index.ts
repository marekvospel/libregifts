import { AppDataSource } from './data-source'

import * as bcrypt from 'bcrypt'

import { User } from './entity/User'
import { Permission } from './entity/Permission'

AppDataSource.initialize().then(async () => {

  const permission = new Permission()
  permission.name = 'ADMIN'

  await AppDataSource.manager.getRepository(Permission).save(permission)

  const user = new User()
  user.firstName = 'Marek'
  user.lastName = 'Vospel'
  user.email = 'marek@vospel.cz'
  user.password = await bcrypt.hash('abc123', 10)
  user.permissions = [permission]

  console.log(user)

  await AppDataSource.manager.save(user)

  console.log('Saved user: ', user.id)


}).catch(error => console.log(error))
