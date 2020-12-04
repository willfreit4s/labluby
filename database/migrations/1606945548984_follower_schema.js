'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FollowerSchema extends Schema {
  up () {
    this.create('followers', (table) => {
      table.increments('id')
      table.integer('user_id').notNullable();
      table.timestamps()
      table.foreign('user_id').references('id').inTable('users').onDelete('cascade');
    })
  }

  down () {
    this.drop('followers')
  }
}

module.exports = FollowerSchema
