'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments('id');
      table.string('nome', 60).notNullable();
      table.string('email', 100).notNullable().unique();
      table.string('password', 60).notNullable();
      table.string('localizacao', 100).notNullable();
      table.text('avatar').notNullable();
      table.string('username', 80).notNullable();
      table.text('bio').notNullable();
      table.timestamps();
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
