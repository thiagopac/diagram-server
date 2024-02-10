import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public static developmentOnly = true

  public async run() {
    const uniqueKey = 'email'

    await User.updateOrCreateMany(uniqueKey, [
      {
        uuid: '871c9fe8-3895-4f66-a292-f138c7bdd7c1',
        username: 'monchal',
        email: 'thiago@vatios.com.br',
        password: 'nenem',
      },
      {
        uuid: '8cb337fc-5323-4c6c-a981-d62ac5701260',
        username: 'mirotero',
        email: 'paulofelipe@vatios.com.br',
        password: 'miro',
      },
    ]) // Write your database queries inside the run method
  }
}
