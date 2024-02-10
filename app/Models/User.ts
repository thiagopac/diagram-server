import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { v4 as uuidv4 } from 'uuid'
import {
  column,
  beforeSave,
  BaseModel,
  HasMany,
  hasMany,
  HasOne,
  hasOne,
  beforeCreate,
} from '@ioc:Adonis/Lucid/Orm'
import UserInfo from './UserInfo'
import Game from './Game'

export default class User extends BaseModel {
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
  public username: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column({ serializeAs: null })
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  /*
  |--------------------------------------------------------------------------
  | Relations
  |--------------------------------------------------------------------------
  */

  /* :::::::::::::::::::: has one ::::::::::::::::::::::: */

  @hasOne(() => UserInfo, { localKey: 'id' })
  public info: HasOne<typeof UserInfo>

  /* :::::::::::::::::::: has many :::::::::::::::::::::: */

  @hasMany(() => Game, { localKey: 'id' })
  public consumerUnits: HasMany<typeof Game>

  /*
  |--------------------------------------------------------------------------
  | Hooks
  |--------------------------------------------------------------------------
  */

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @beforeCreate()
  public static generateUUID(user: User) {
    user.uuid = uuidv4()
  }

  /*
  |--------------------------------------------------------------------------
  | Methods
  |--------------------------------------------------------------------------
  */
}
