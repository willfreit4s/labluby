'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Follower extends Model {
    // followings () {
    //     return this.belongsToMany('App/Models/Following')
    // }
}

module.exports = Follower
