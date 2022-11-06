# Node/Express Project Setup Boilerplate

Start your Node/Express project without spending time on setting up. This project setup is equiped with ESLint, JWT, Prettier, Postgres/Any DB of choice since this project uses Sequelize ORM and husky.

Just clone and start coding. ( Don't forget to start postgres server)

## step 1

```js
npm install
```

## step 2

```js
npm run start
```

## Optional

The template also include logging with bunyan to use run bellow command.

```js
npm run start:dev | ./node_modules/.bin/bunyan
```

## Postman collection

All find the postman collection file to start get going fast. Start testing.

## Create Environment Variable with following example

```env
# Development
JWT_SECRET=YourJSONWebtokenSecrete
NODE_ENV=development
NODE_PORT=3001

# Database
DB_HOST=host.docker.internal
DBUSER=postgres
DB=postgres
DB_DIALECT=postgres
PASSWORD=admin
DB_POOL_MAX=5
DB_POOL_MIN=0
DB_POOL_ACQUIRE=30000
DB_POOL_IDLE=10000
```

## Enjoy your tea break ;)
