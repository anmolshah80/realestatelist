# Real Estate Listings

## Setup

- Install dependencies:

  ```bash
  pnpm install
  ```

- Copy `.env.sample` and rename it to `.env` file at the project root with a valid database connection

  ```bash
  DATABASE_URL="postgresql://<postgres_superuser_name>:<superuser_password>@localhost:<postgres_server_port>/<database_name>?schema=public"
  ```

  | Key                     | Description                                                         |
  | ----------------------- | ------------------------------------------------------------------- |
  | postgres_superuser_name | Usually it's `postgres` itself                                      |
  | superuser_password      | Superuser's password set during installation                        |
  | postgres_server_port    | Usually it's `5432` or `5433`                                       |
  | database_name           | Your desired database name (for e.g., `realestate-listings-db-dev`) |

  _Note: If you have multiple versions of postgres installed in your pc (let's say v14 and v17). To use the specific one, say v17 (the server where you would want to create your database), go to `C:\Program Files\PostgreSQL\17\installation_summary.log` (in Windows) and look for port info within the log._

  _Note: Remove all angular brackets before saving the contents in `.env` file_

- Run the app using the following command and open `http://localhost:3000` in your browser.

  ```bash
  pnpm run dev
  ```

## Database migrations and seed

- Apply the current `Prisma` migrations and seed the database:

  ```bash
  pnpm prisma migrate dev
  ```

- Once you run `pnpm prisma migrate dev` you may be asked to enter the name of a new migration so you can type `add_search_vector_fixed`, after that you may see some errors like below.

  _Note: The migration command asks for a new migration name and the error occurs because the current `schema.prisma` does not match the state produced by the migrations already applied._

  ```bash
  $ pnpm prisma migrate dev
  Loaded Prisma config from prisma.config.ts.

  Prisma schema loaded from prisma\schema.prisma.
  Datasource "db": PostgreSQL database "realestatelist-db-dev", schema "public" at "localhost:5433"

  √ Enter a name for the new migration: ... add_search_vector_fixed
  Applying migration `20260330144248_add_search_vector_fixed`
  Error: P3018

  A migration failed to apply. New migrations cannot be applied before the error is recovered from. Read more about how to resolve migration issues in a production database: https://pris.ly/d/migrate-resolve

  Migration name: 20260330144248_add_search_vector_fixed

  Database error code: 42601

  DbError { severity: "ERROR", parsed_severity: Some(Error), code: SqlState(E42601), message: "column \"searchVector\" of relation \"PropertyListing\" is a generated column", detail: None, hint: Some("Use ALTER TABLE ... ALTER COLUMN ... DROP EXPRESSION instead."), position: None, where_: None, schema: None, table: None, column: None, datatype: None, constraint: None, file: Some("tablecmds.c"), line: Some(7950), routine: Some("ATExecColumnDefault") }
  ```

- But you can still seed data from the `.csv` file normally using the following command.

  ```bash
  pnpm prisma db seed
  ```

- Generate Prisma Client (optional, as it will be generated automatically when you run `pnpm prisma migrate dev` or `pnpm prisma db seed`). Now, you can refresh your web application and it will render all those property listings.

  ```bash
  pnpm prisma generate
  ```

> Note: If your database is already provisioned and the schema is applied, just run `pnpm prisma db seed`.

## Run tests

```bash
pnpm test
```

## Example API calls

- Fetch available unique property types:

  ```bash
  curl http://localhost:3000/api/v1/property-types
  ```

- Fetch property listings (default first page):

  ```bash
  curl http://localhost:3000/api/v1/listings
  ```

- Fetch a property listing by ID:

  ```bash
  curl http://localhost:3000/api/v1/listings/1
  ```

- Fetch property listings with filters:

  ```bash
  curl "http://localhost:3000/api/v1/listings?price_min=100000&price_max=500000&beds=3&propertyType=Apartment"
  ```

## Testing added

- `__tests__/api/listings-route.test.tsx` — API route test for property listings
- `__tests__/api/property-types.test.ts` — API route test for property types
- `__tests__/api/listing-detail.test.ts` — API route test for property listing detail retrieval

## Notes

- [Prisma ORM in a Next.js app](https://www.prisma.io/docs/guides/frameworks/nextjs#21-install-dependencies)

- [Getting started with Prisma Migrate](https://www.prisma.io/docs/orm/prisma-migrate/getting-started)

- [Route Handlers (API Routes in Next.js)](https://nextjs.org/docs/app/getting-started/route-handlers#route-handlers)

- [Building APIs with Next.js](https://nextjs.org/blog/building-apis-with-nextjs)

- [useSearchParams (client component hook to read the current URL's query string)](https://nextjs.org/docs/app/api-reference/functions/use-search-params)

- [Unsupported types - Prisma](https://www.prisma.io/docs/orm/prisma-client/using-raw-sql/raw-queries#unsupported-types)

- [PostgreSQL Full-Text Search: A Powerful Alternative to Elasticsearch for Small to Medium Applications](https://iniakunhuda.medium.com/postgresql-full-text-search-a-powerful-alternative-to-elasticsearch-for-small-to-medium-d9524e001fe0)

- [supertest](https://www.npmjs.com/package/supertest)

- [node-mocks-http (mock 'http' objects for testing Express, Next.js and Koa routing functions)](https://www.npmjs.com/package/node-mocks-http)

- [How to set up Jest with Next.js](https://nextjs.org/docs/app/guides/testing/jest)
