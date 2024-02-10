import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate } from '@ioc:Adonis/Lucid/Orm'
// import User from './User'
import { v4 as uuidv4 } from 'uuid'
import Invite from 'App/Models/Invite'

export default class Game extends BaseModel {
  /*
  |--------------------------------------------------------------------------
  | Columns
  |--------------------------------------------------------------------------
  */

  @column({ isPrimary: true, serializeAs: null })
  public id: number

  @column()
  public uuid: string

  @column()
  public pgn: string

  @column()
  public owner: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  /*
  |--------------------------------------------------------------------------
  | Relations
  |--------------------------------------------------------------------------
  */

  /* :::::::::::::::::::: belongs to :::::::::::::::::::: */

  /*
  |--------------------------------------------------------------------------
  | Hooks
  |--------------------------------------------------------------------------
  */

  @beforeCreate()
  public static generateUUID(game: Game) {
    game.uuid = uuidv4()
  }

  /*
  |--------------------------------------------------------------------------
  | Methods
  |--------------------------------------------------------------------------
  */

  public static async createGame(owner: string): Promise<Game> {
    try {
      let game: Game = new Game()
      game.owner = owner
      await game.save()

      return game
    } catch (error) {
      return error
    }
  }

  public static async deleteGame(pairingKey: string): Promise<Boolean> {
    try {
      const invite = await Invite.query().preload('game').where('pairingKey', pairingKey).first()
      await invite?.game.delete()
      await invite?.delete()

      return true
    } catch (error) {
      return error
    }
  }
}
