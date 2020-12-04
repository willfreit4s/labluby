'use strict'

const RepositoryService = use('App/Controllers/Http/Services/RepositoryService');

class RepositoryController {
  async show ({ request, params }) 
  {
    let respositories = request.all();
    let repositoryService = new RepositoryService();
    return repositoryService.show({respositories, params});
  }

  async store ({ request, auth, response})
  {
    let data = request.all();
    let repositoryService = new RepositoryService();
    return repositoryService.store({data, auth, response});
  }

  async update ({ params, request, auth}) 
  {
    let data = request.all();
    let repositoryService = new RepositoryService();
    return repositoryService.update({...data, params, auth});
  }

  async destroy ({ request, params, auth}) 
  {
    let repository = request.all();
    let repositoryService = new RepositoryService();
    return repositoryService.destroy({repository, params, auth});
  }
}

module.exports = RepositoryController
