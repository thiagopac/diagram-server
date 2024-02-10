import { DateTime } from 'luxon'
import { BaseModel, column, BelongsTo, belongsTo, beforeCreate } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import { v4 as uuidv4 } from 'uuid'

export default class UserInfo extends BaseModel {
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
  public userId: number

  @column()
  public firstName: string

  @column()
  public lastName: string

  @column()
  public rating?: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  /*
  |--------------------------------------------------------------------------
  | Relations
  |--------------------------------------------------------------------------
  */

  /* :::::::::::::::::::: belongs to :::::::::::::::::::: */

  @belongsTo(() => User, { foreignKey: 'userId' })
  public user: BelongsTo<typeof User>

  /*
  |--------------------------------------------------------------------------
  | Hooks
  |--------------------------------------------------------------------------
  */

  @beforeCreate()
  public static generateUUID(userInfo: UserInfo) {
    userInfo.uuid = uuidv4()
  }
}
