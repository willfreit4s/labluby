'use strict';

const RepositoryStar = use('App/Models/RepositoryStar');
const RepositoryService = use('App/Controllers/Http/Services/RepositoryService');
const Database = use('Database');
const { validate } = use('Validator');

class RepositoryStarsService {
    async show({params})
    {
        return RepositoryStar.findBy('id', params.id);
    }

    async store({data, auth})
    {
        const db = await Database.beginTransaction();
        const repositoryStar = data.data;
        let repositoryService = new RepositoryService();
        try
        {
            let response = await repositoryService.findByRepositorio(repositoryStar.repository_id)
            if(response === null)
            {
                return {status: 404, message: "Repositório não encontrado/inexistente"}
            }

            let starVerify = await this.verifyStar(auth.user.id, repositoryStar.repository_id);
            if(starVerify !== null)
            {
                return {status: 200, message: "Você já curtiu o repositório"}
            }

            const createStars = {
                user_id: auth.user.id,
                repository_id: repositoryStar.repository_id
            }

            const repositoryData = await RepositoryStar.create({...createStars})
            await db.commit();

            return {status: 201, message: "Você curtiu o repositório"}
        }catch(e)
        {
            console.log(e);
            return {status: 500, message: e.message}
        }
    }

    async stars(user_id)
    {
        const dataStars = await RepositoryStar.query().where('repository_id', user_id).fetch();
        let countStars = 0;
        let j = 0;
        try
        {
            do
            {
                if(dataStars.rows[j] !== undefined)
                {
                    for(let i = 0; i < dataStars.rows.length; i++)
                    {
                        if(dataStars.rows[i] === undefined)
                        {
                            return countStars = 0;
                        }
                        countStars++;
                    }
                }   
                    return countStars;
            }while(dataStars !== undefined);

        }catch(e)
        {
            console.log(e);
            return {status: 500, message: e.messages}
        }
    }

    async verifyStar(user_id, repository_id)
    {
        return RepositoryStar.findBy({'user_id': user_id, 'repository_id': repository_id});
    }

    async update({data, params, auth})
    {
        const _repositoryStar = await RepositoryStar.find(params.id);
        const db = await Database.beginTransaction();
        const repositoryStar = data;
        
        if(auth.user.id !== _repositoryStar.$attributes.user_id)
        {
            return {status: 406, message: "Você não pode editar os stars de outro usuário"}
        }

        try
        {
            const rules = {
                repository_id: 'required'
            }

            _repositoryStar.repository_id = repositoryStar['repository_id'];

            const validation = await validate(repositoryStar, rules);

            if (validation.fails())
            {
                await db.rollback();
                return {status: 500, message: validation.messages()};
            }

            await _repositoryStar.save();
            await db.commit();

            return {status: 200, message: "Star atualizada com sucesso"}


        }catch(e)
        {
            console.log(e);
            return {status: 500, message: e.message}
        }
    }

    async destroy({repositoryStar, params, auth})
    {
        const _repositoryStar = await RepositoryStar.findOrFail(params.id);
        const db = await Database.beginTransaction();
        if(auth.user.id !== _repositoryStar.$attributes.user_id)
        {
            return {status: 406, message: "Você não pode deletar a star de outro usuário"}
        }

        try
        {

            await _repositoryStar.delete();
            await db.commit();

            return {status: 200, message: "Star deletada"};

        }catch(e)
        {
            console.log(e);
            return {status: 500, message: e.message}
        }
    }
}

module.exports = RepositoryStarsService