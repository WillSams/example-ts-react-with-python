const defaults = {
  client: "postgres",
  migrations: {
    directory: './migrations',
    tableName: 'knex_migrations'
  },
  pool: { min: 2, max: 10 },
  debug: false,
};

const connection = {
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWD,
};

export const development = {
  ...defaults,
  connection: {
    ...connection,
    database: 'hotel_development',
  },
  seeds: { directory: './seeds/development', },
};

export const test = {
  ...defaults,
  connection: {
    ...connection,
    database: 'hotel_test',
  },
};

export default { development, test };
