'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Following extends Model {
    // followers () {
    //     return this.belongsToMany('App/Models/Follower')
    // }
}

module.exports = Following
