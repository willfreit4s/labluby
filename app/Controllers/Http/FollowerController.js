'use strict'

const FollowerService = use('App/Controllers/Http/Services/FollowerService');

class FollowerController {
  async show ({ request, params }) 
  {
    let follower = request.all();
    let followerService = new FollowerService();
    return followerService.show({follower, params});
  }

  async store ({ request, auth, response})
  {
    let data = request.all();
    let followerService = new FollowerService();
    return followerService.store({...data, auth, response});
  }

  async update ({ params, request}) 
  {
    let data = request.all();
    let followerService = new FollowerService();
    return followerService.update({...data, params});
  }

  async destroy ({ request, params }) 
  {
    let data = request.all();
    let followerService = new FollowerService();
    return followerService.destroy({...data, params});
  }
}

module.exports = FollowerController
