'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RepositoriesSchema extends Schema {
  up () {
    this.create('repositories', (table) => {
      table.increments('id')
      table.string('nome', 60).notNullable();
      table.string('description', 500).notNullable();
      table.string('public', 60).notNullable();
      table.string('slug').notNullable();
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('cascade');
      table.timestamps()
    })
  }

  down () {
    this.drop('repositories')
  }
}

module.exports = RepositoriesSchema
