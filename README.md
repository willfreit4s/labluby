# Adonis API application

This is the boilerplate for creating an API server in AdonisJs, it comes pre-configured with.

1. Bodyparser
2. Authentication
3. CORS
4. Lucid ORM
5. Migrations and seeds

## Setup

Use the adonis command to install the blueprint

```bash
adonis new yardstick --api-only
```

or manually clone the repo and then run `npm install`.


### Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
```

# Observação

A rota follower e following usando a requisição GET (show) seria para exibir quem tá seguindo tal usuário (follower) e quem ele segue (following).
Ao fazer essa requisição apenas o id é passado e retornado, pois minha ideia era fazer uma tabela associativa entre Follower e Following e uma outra rota para ele seguir e ser seguido, afim de armazenar no BD esses usuário na tabela associativa e na requisição GET de Follower e Following eu faria uma busca nessa tabela para saber a quantidade (count) de seguidores e quantas pessoas ele segue além do retorno dos usuários (nome e foto). 
