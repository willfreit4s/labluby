'use strict'
const Following = use('App/Models/Following');
const Database = use('Database');
const {validate} = use('Validator');

class FollowingService {
    async store(userId)
    {
        const db = await Database.beginTransaction();
        try
        {
           const createFollowing = {
               user_id: userId
           };

           await Following.create({...createFollowing});
           await db.commit();

           return {status: 201, message: "Following Criado"}
        }catch(e)
        {
            console.log(e);
            return {status: 500, message: e.messages}
        }
    }

    async update({data, params})
    {
        const db = await Database.beginTransaction();
        const _seguindo = await Follower.find(params.id);
        if(_seguindo === null)
            return {status: 404, message: "Usuário na tabela Following não encontrado"}

        const seguindoUser = data;
       
        try
        {
            const response = await Following.findBy('user_id', seguindoUser.following_id);
            if(response === null)
                return {status: 404, message: "Following não encontrado"}
                 
           const rules = {
               following_id: 'required'
           };

           _seguindo.following_id = seguindoUser['following_id']

           const validation = await validate(seguindoUser, rules);

            if (validation.fails())
            {
                await db.rollback();
                return {status: 500, message: validation.messages()};
            }

           await _seguindo.save();
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
        return Following.findBy('id', params.id)
    }

    async destroy(userId)
    {
        const _following = await Following.findOrFail(userId);
        const db = await Database.beginTransaction();
        try
        {
            _following.user_id = _following['user_id'];

            await _following.delete();
            await db.commit();

            return {status: 200, message: "following deletado com sucesso"};
        }catch(e)
        {
            console.log(e);
            return {status: 500, message: e.messages}
        }
    }
}

module.exports = FollowingService
