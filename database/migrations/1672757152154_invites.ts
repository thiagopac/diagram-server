import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'invites'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.uuid('uuid').notNullable().unique()
      table.uuid('pairing_key').notNullable().unique()
      table.integer('game_id').unsigned().references('id').inTable('games').notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
