'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FollowingSchema extends Schema {
  up () {
    this.create('followings', (table) => {
      table.increments('id')
      table.integer('user_id').notNullable();
      table.timestamps()
      table.foreign('user_id').references('id').inTable('users').onDelete('cascade');
    })
  }

  down () {
    this.drop('followings')
  }
}

module.exports = FollowingSchema
