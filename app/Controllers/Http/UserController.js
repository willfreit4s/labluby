'use strict'

const UserService = use('App/Controllers/Http/Services/UserService');

class UserController {
    async login ({request, auth, response})
    {
        let user = request.all();
        let userService = new UserService();
        return userService.login({user, auth, response});
    }

    async store ({ request, auth, response})
    {
        let data = request.all();
        let userService = new UserService();
        return userService.store({...data, auth, response});
    }

    async show ({ auth, request, params }) 
    {
        let user = request.all();
        let userService = new UserService();
        return userService.show({auth, user, params});
    }

    async update ({ params, request}) 
    {
        let data = request.all();
        let userService = new UserService();
        return userService.update({...data, params});
    }

    async destroy ({ request, params }) 
    {
        let user = request.all();
        let userService = new UserService();
        return userService.destroy({user, params});
    }

}

module.exports = UserController
