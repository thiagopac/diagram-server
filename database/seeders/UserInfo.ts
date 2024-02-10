import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import UserInfo from 'App/Models/UserInfo'

export default class extends BaseSeeder {
  public async run() {
    const uniqueKey = 'userId'

    await UserInfo.updateOrCreateMany(uniqueKey, [
      {
        userId: 1,
        firstName: 'Thiago',
        lastName: 'Castro',
        rating: 1200,
      },
      {
        userId: 2,
        firstName: 'Paulo Felipe',
        lastName: 'Barbosa',
        rating: 1000,
      },
    ])
  }
}
