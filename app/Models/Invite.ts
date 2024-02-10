import {
  BaseModel,
  column,
  BelongsTo,
  belongsTo,
  beforeCreate,
  hasOne,
  HasOne,
} from '@ioc:Adonis/Lucid/Orm'
import Game from './Game'
import { v4 as uuidv4 } from 'uuid'

export default class Invite extends BaseModel {
  /*
  |--------------------------------------------------------------------------
  | Columns
  |--------------------------------------------------------------------------
  */

  @column({ isPrimary: true, serializeAs: null })
  public id: number

  @column()
  public uuid: string

  @column({ serializeAs: null })
  public gameId: number

  @column()
  public pairingKey: string

  /*
  |--------------------------------------------------------------------------
  | Relations
  |--------------------------------------------------------------------------
  */

  /* :::::::::::::::::::: has one ::::::::::::::::::::::: */

  @hasOne(() => Invite, { localKey: 'id' })
  public invite: HasOne<typeof Invite>

  /* :::::::::::::::::::: belongs to :::::::::::::::::::: */

  @belongsTo(() => Game, { foreignKey: 'gameId' })
  public game: BelongsTo<typeof Game>

  /*
  |--------------------------------------------------------------------------
  | Hooks
  |--------------------------------------------------------------------------
  */

  @beforeCreate()
  public static generateUUID(invite: Invite) {
    invite.uuid = uuidv4()
  }

  /*
  |--------------------------------------------------------------------------
  | Methods
  |--------------------------------------------------------------------------
  */

  public static async createInvite(pairingKey: string, gameId: number): Promise<Invite> {
    try {
      let invite: Invite = new Invite()

      invite.pairingKey = pairingKey
      invite.gameId = gameId
      await invite.save()

      return invite
    } catch (error) {
      return error
    }
  }
}
