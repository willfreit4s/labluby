'use strict'
const Follower = use('App/Models/Follower');
const Database = use('Database');
const {validate} = use('Validator');

class FollowerService {
    async store(userId)
    {
        const db = await Database.beginTransaction();
        try
        {
           const createFollower = {
               user_id: userId
           };

           await Follower.create({...createFollower});
           await db.commit();

           return {status: 201, message: "Follower Criado"}
        }catch(e)
        {
            console.log(e);
            return {status: 500, message: e.messages}
        }
    }

    async update({data, params})
    {
        const db = await Database.beginTransaction();
        const _seguir = await Follower.find(params.id);
        if(_seguir === null)
            return {status: 404, message: "Usuário na tabela Follower não encontrado"}

        const seguirUser = data;
       
        try
        {
            const response = await Follower.findBy('user_id', seguirUser.follower_id)
            if(response === null)
                return {status: 404, message: "Follower não encontrado"}
                 
           const rules = {
               follower_id: 'required'
           };

           _seguir.follower_id = seguirUser['follower_id']

           const validation = await validate(seguirUser, rules);

            if (validation.fails())
            {
                await db.rollback();
                return {status: 500, message: validation.messages()};
            }

           await _seguir.save();
           await db.commit();

          return {status: 200, message: "OK"}
        }catch(e)
        {
            console.log(e);
            return {status: 500, message: e.messages}
        }
    }

    async show ({params})
    {   
        return Follower.findBy('id', params.id)
    }

    // async seguidor({data, params})
    // {
        
    //     console.log({params})
    //     return "teste"
    // }

    async destroy(userId)
    {
        const _follower = await Follower.findOrFail(userId);
        const db = await Database.beginTransaction();
        try
        {
            _follower.user_id = _follower['user_id'];

            await _follower.delete();
            await db.commit();

            return {status: 200, message: "follower deletado com sucesso"};
        }catch(e)
        {
            console.log(e);
            return {status: 500, message: e.messages}
        }
    }
}

module.exports = FollowerService
