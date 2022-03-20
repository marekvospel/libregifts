import { AppDataSource } from './data-source'

import { User } from './entity/User'
import { hash } from 'bcrypt'

AppDataSource.initialize().then(async () => {

  const user = new User()
  user.firstName = 'Marek'
  user.lastName = 'Vospel'
  user.email = 'marek@vospel.cz'
  user.password = await hash('abc123', 10)

  await AppDataSource.manager.save(user)

}).catch(error => console.log(error))
