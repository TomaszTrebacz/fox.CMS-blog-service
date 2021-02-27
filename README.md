<p align="center">
  <a href="https://github.com/TomaszTrebacz/nest-auth-graphql-redis/packages/541967"><img src="https://i.ibb.co/ZTYFkPF/api-gateway.png" />
  </a>
   <h1 align="center">BLOG-SERVICE | part of <a href="https://github.com/TomaszTrebacz/fox.CMS">fox.CMS</a> app</h1>
</p>

## Description

Blog-service is responsible for all CRUD operations related to posts and categories.  
In this repository are also placed all unit & integration tests.

## Installation

1. Create .env file following the example (example.env) in the repository.

```ts
APP_PORT=

DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_DATABASE=

REDIS_HOST=
REDIS_PORT=
REDIS_DB=
REDIS_PASSWORD=

ACCESS_JWT_SECRET=
```

2. Install dependencies

```
npm install
```

3. Run the app:

```ts
npm run start
```

## Testing

1. Before testing, you should clean database:

```
npm run schema:drop

npm run schema:sync // or npm run db:migrate
```

2. Seed with data:

```
npm run seed:postgres
```

3. Run tests:

```
npm run test
```

The result:

<p align="center">
<img src="https://i.ibb.co/wsR84gn/test.png" alt="Tests" />
</p>
