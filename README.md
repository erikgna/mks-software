# Movies Nestjs

[O deploy foi feito no Railway](https://mks-production.up.railway.app/api/v1)

[Documentação do Swagger](https://mks-production.up.railway.app/swagger)

## Banco de dados Postgres

O banco de dados está em um serviço AWS RDS.

## Cache Redis

O Redis está em uma instância grátis da plataforma Redis.

Está sendo usado para salvar em cache a lista completa de filmes durante 2 minutos.

## Rodando aplicação com docker-compose

```
docker compose up
```

## Tests

```bash
npm test
```

## Usando a aplicação localmente

Root:
[http://localhost:8080/api/v1/](http://localhost:8080/api/v1)

Swagger:
[http://localhost:8080/swagger](http://localhost:8080/swagger)
