'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

const Database = use('Database');

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() =>{
  Route.resource("users", "UserController").apiOnly();
  Route.post("login", "UserController.login");
  Route.resource('/user', 'UserController').middleware(["auth"]).apiOnly();
  Route.resource('/follower', 'FollowerController').middleware(["auth"]).apiOnly();
  Route.resource('/following', 'FollowingController').middleware(["auth"]).apiOnly();
  Route.resource('/repository', 'RepositoryController').middleware(['auth']).apiOnly();
  Route.resource('/repositorystars', 'RepositoryStarController').middleware(['auth']).apiOnly();
  //Route.resource('/seguidor', 'FollowerFollowingController').middleware(["auth"]).apiOnly();
  //Route.resource('/seguindo', 'SeguindoController').middleware(["auth"]).apiOnly();
});
