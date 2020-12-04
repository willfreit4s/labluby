'use strict'

const RepositoryStarsService = use('App/Controllers/Http/Services/RepositoryStarsService');

class RepositoryStarController {
  async show ({ request, params }) 
  {
    let respositoriesStars = request.all();
    let repositoryStarsService = new RepositoryStarsService();
    return repositoryStarsService.show({respositoriesStars, params});
  }

  async store ({ request, auth, response})
  {
    let data = request.all();
    let repositoryStarsService = new RepositoryStarsService();
    return repositoryStarsService.store({data, auth, response});
  }

  async update ({ params, request, auth}) 
  {
    let data = request.all();
    let repositoryStarsService = new RepositoryStarsService();
    return repositoryStarsService.update({...data, params, auth});
  }

  async destroy ({ request, params, auth}) 
  {
    let repositoryStars = request.all();
    let repositoryStarsService = new RepositoryStarsService();
    return repositoryStarsService.destroy({repositoryStars, params, auth});
  }
}

module.exports = RepositoryStarController
