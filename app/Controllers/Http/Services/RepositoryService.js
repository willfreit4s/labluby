'use strict';

const Repository = use('App/Models/Repository');
const RepositoryStarsService = use('App/Controllers/Http/Services/RepositoryStarsService');
const Database = use('Database');
const { validate } = use('Validator');

class RepositoryService {
    async store({data, auth})
    {
        const db = await Database.beginTransaction();
        const repository = data.data;
        const userNome = auth.user.nome;

        try
        {
            const rules = {
                nome: 'required|max:60',
                description: 'required|max:500',
                public: 'required|max:60'
            };

            const validation = await validate(repository, rules);

            if (validation.fails())
            {
                await db.rollback();
                return {status: 500, message: validation.messages()};
            }

            const createRepository = {
                nome: repository.nome,
                description: repository.description,
                public: repository.public,
                slug: userNome.concat('.',repository.nome),
                user_id: auth.user.id
            }

            const repositoryData = await Repository.create({...createRepository});
            await db.commit();
           
            return {status: 201, message: "Repositório Criado"}

        }catch(e)
        {
            console.log(e);
            return {status: 500, message: e.messages};
        }
    }

    async show({params})
    {
        let repositoryStarsService = new RepositoryStarsService();
        const dataRepositorio = await Repository.query().where('user_id', params.id).fetch();
        if(dataRepositorio.rows[0] === undefined)
        {
            return {status: 404, message: "Repositório não encontrado/inexistente"}
        }

        // let repositorioStars = await repositoryStarsService.verifyStars(params.id);
        // console.log({repositorioStars})
    
        let arrayRepositorio = []
        let countRepositorio = 0;

        try
        {
            
            for(let i = 0; i < dataRepositorio.rows.length; i++)
            {
                arrayRepositorio[i] = {
                    nome: dataRepositorio.rows[i].$attributes.nome,
                    description: dataRepositorio.rows[i].$attributes.description,
                    public: dataRepositorio.rows[i].$attributes.public,
                    slug: dataRepositorio.rows[i].$attributes.slug,
                    stars: await repositoryStarsService.stars(dataRepositorio.rows[i].$attributes.id)
                };
                countRepositorio++;
            }
            
            return {data: arrayRepositorio, quantItens: countRepositorio}

        }catch(e)
        {
            console.log(e);
            return {status: 500, message: e.messages}
        }
    }

    async findByRepositorio(repository_id)
    {
        return Repository.findBy('id', repository_id)
    }

    async update({data, params, auth})
    {
        const _repository = await Repository.find(params.id)
        const db = await Database.beginTransaction();
        const repository = data;
        const userNome = auth.user.nome;

        if(auth.user.id !== _repository.$attributes.user_id)
            return {status: 406, message: "Você não pode editar o repositório de outra pessoa"}
        

        try
        {
            const rules = {
                nome: 'max:60',
                description: 'max:500',
                public: 'max:60'
            };

            _repository.nome = repository['nome']
            _repository.description = repository['description']
            _repository.public = repository['public']
            _repository.slug = userNome.concat('.',repository.nome)

            const validation = await validate(repository, rules);

            if (validation.fails())
            {
                await db.rollback();
                return {status: 500, message: validation.messages()};
            }

            await _repository.save();
            await db.commit();

            return {status: 200, message: "Repositório atualizado com sucesso"}

        }catch(e)
        {
            console.log(e);
            return {status: 500, message: e.message};
        }
    }

    async destroy({repository, params, auth})
    {
        const _repository = await Repository.findOrFail(params.id);
        const db = await Database.beginTransaction();
        if(auth.user.id !== _repository.$attributes.user_id)
            return {status: 406, message: "Você não pode deletar o repositório de outra pessoa"}

        try
        {
            const rules = {
                nome: "max:60",
                description: "max:500",
                public: "max:60"
            };

            _repository.nome = repository['nome'];
            _repository.description = repository['description'];
            _repository.public = repository['public'];
            _repository.slug = repository['slug'];

            const validation = await validate(repository, rules);

            if(validation.fails()){
                await db.rollback();
                return {status: 500, message: validation.messages()};
            }

            await _repository.delete();
            await db.commit();

            return {status: 200, message: "Repositório deletado"};

        }catch(e)
        {
            console.log(e);
            return {status: 500, message: e.messages}
        }
    }

}

module.exports = RepositoryService