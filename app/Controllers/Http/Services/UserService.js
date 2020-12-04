'use strict';

const User = use('App/Models/User');
const Token = use('App/Models/Token');
const Database = use('Database');
const FollowerService = use('App/Controllers/Http/Services/FollowerService');
const FollowingService = use('App/Controllers/Http/Services/FollowingService');
const { validate } = use('Validator');
const dateFormat = require('dateformat');


class UserService {

    async login ({user, auth}){
        try
        {
        
            const userDatabase = await this.findUserByEmail(user.email);
            if(userDatabase === null)
            {
                return {status: 203, message: "Email ou senha inválida"};
            }

            const tokenDatabase = await this.saveToken(userDatabase.$attributes.id);

            const {email, password} = user;
            const token = await auth.attempt(email, password);

            return {data:  userDatabase.$attributes, token: token, status: 200, message: 'Logged in successfully'}
    
        }catch (e) {
          return {status: 500, message: e.messages};
        }
    }


    async store({...data})
    {
        const db = await Database.beginTransaction();
        const user = data.data;
        let followerService = new FollowerService();
        let followingService = new FollowingService();

        try
        {
            const rules = {
                nome: 'required|max:60',
                email: 'required|email|max:100|unique:users,email',
                password: 'required|min:6',
                localizacao: 'required',
                avatar: 'required',
                username: 'required|max:80',
                bio: 'required',
            };

            const validation = await validate(user, rules);

            if (validation.fails())
            {
                await db.rollback();
                return {status: 500, message: validation.messages()};
            }

            const createUser = {
                nome: user.nome,
                email: user.email,
                password: user.password,
                localizacao: user.localizacao,
                avatar: user.avatar,
                username: user.username,
                bio: user.bio
            }

            const userData = await User.create({...createUser});
            await db.commit();

            await followerService.store(userData.id);
            await followingService.store(userData.id);
           
            return {status: 201, message: "Usuário Criado"}

        }catch(e)
        {
            console.log(e);
            return {status: 500, message: e.messages};
        }
    }

    async show ({ params }) 
    {       
    
        return User.findBy('id', params.id)
        
    }

    async saveToken(userId)
    {
        const db = await Database.beginTransaction();

        try
        {

            let DateNow = new Date;
            DateNow = dateFormat(DateNow, "dd-mm-yyyy HH:MM:ss");

            const token = {
                user_id: userId,
                dataRequisicao: DateNow
            };

            const tokenData = await Token.create({...token});
            await db.commit();

            return {status: 200, message: "Token Registrado"};

        }catch(e)
        {
            console.log(e);
            return {status: 500, message: e.messages}
        }
    }

    async findUserByEmail(email)
    {

        return User.findBy('email', email);
    }

    async update({data, params})
    {
        const _user = await User.find(params.id);
        const db = await Database.beginTransaction();
        const user = data;

        try
        {
            const rules = {
                nome: 'max:60',
                email: 'email|max:100|unique:users,email',
                password: 'min:6|max:60',
                username: 'max:80',
                bio: 'max:500',
            };

            _user.nome = user['nome'];
            _user.email = user['email'];
            _user.password = user['password']
            _user.localizacao = user['localizacao'];
            _user.avatar = user['avatar'];
            _user.username = user['username'];
            _user.bio = user['bio'];

            const validation = await validate(user, rules);

            if (validation.fails())
            {
                await db.rollback();
                return {status: 500, message: validation.messages()};
            }

            await _user.save();
            await db.commit();

            return {status: 200, message: "Usuário atualizado com sucesso"}

        }catch(e)
        {
            console.log(e);
            return {status: 500, message: e.messages}
        }
    }

    async destroy({user, params})
    {
        const _user = await User.findOrFail(params.id);
        const db = await Database.beginTransaction();
        let followerService = new FollowerService();
        let followingService = new FollowingService();
        let response2;

        try
        {
            const response = await followerService.destroy(_user.id);
            if(response.status === 200){
               response2 = await followingService.destroy(_user.id);
            }
            else
            {
                return {status: 406, message: "Falha ao deletar o usuário"}
            }


            const rules = {
                nome: "max:60",
                email: 'max:100',
                password: 'max:60',
                localizacao: 'max:100',
                username: 'max:80'
            };

            _user.nome = user['nome'];
            _user.email = user['email'];
            _user.password = user['password'];
            _user.localizacao = user['localizacao'];
            _user.avatar = user['avatar'];
            _user.username = user['username'];
            _user.bio = user['bio'];

            const validation = await validate(user, rules);

            if(validation.fails()){
                await db.rollback();
                return {status: 500, message: validation.messages()};
            }

            await _user.delete();
            await db.commit();

            if(response2.status === 200){
                return {status: response.status, message: "usuário deletado com sucesso"};
            }
            if(response2.status === 406){
                return {status: response.status, message: "Falha ao deletar usuário"};
            }
        }catch(e)
        {
            console.log(e);
            return {status: 500, message: e.messages}
        }
    }

}


module.exports = UserService;