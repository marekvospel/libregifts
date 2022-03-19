import { AppDataSource } from './data-source'

import { Gift } from './entity/Gift'
import { User } from './entity/User'
import { hash } from 'bcrypt'

AppDataSource.initialize().then(async () => {

  const user = new User()
  user.firstName = 'Marek'
  user.lastName = 'Vospel'
  user.email = 'marek@vospel.cz'
  user.password = await hash('abc123', 10)

  console.log(user)

  await AppDataSource.manager.save(user)

  console.log('Saved user: ', user.id)

  const gift = new Gift()
  gift.name = 'Gift 1'

  await AppDataSource.manager.save(gift)

  console.log('Saved gift: ', gift.id)

  const gifts = await AppDataSource.manager.find(Gift)

  console.log(gifts)

}).catch(error => console.log(error))
