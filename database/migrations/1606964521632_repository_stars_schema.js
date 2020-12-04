'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RepositoryStarsSchema extends Schema {
  up () {
    this.create('repository_stars', (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('cascade');
      table.integer('repository_id').unsigned().references('id').inTable('repositories').onDelete('cascade');
      table.timestamps()
    })
  }

  down () {
    this.drop('repository_stars')
  }
}

module.exports = RepositoryStarsSchema
