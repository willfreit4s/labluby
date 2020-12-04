'use strict'

const FollowingService = use('App/Controllers/Http/Services/FollowingService');

class FollowingController {
  async show ({ request, params }) 
  {
    let following = request.all();
    let followingService = new FollowingService();
    return followingService.show({following, params});
  }

  async store ({ request, auth, response})
  {
    let data = request.all();
    let followingService = new FollowingService();
    return followingService.store({...data, auth, response});
  }

  async update ({ params, request}) 
  {
    let data = request.all();
    let followingService = new FollowingService();
    return followingService.update({...data, params});
  }

  async destroy ({ request, params }) 
  {
    let data = request.all();
    let followingService = new FollowingService();
    return followingService.destroy({...data, params});
  }
}

module.exports = FollowingController
