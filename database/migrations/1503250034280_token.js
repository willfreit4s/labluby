'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TokensSchema extends Schema {
  up () {
    this.create('tokens', (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('cascade');
      table.datetime('dataRequisicao').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('tokens')
  }
}

module.exports = TokensSchema
