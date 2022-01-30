module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL || 'localhost',
  // port: 5432,
  // username: process.env.POSTGRES_USER || 'test',
  // password: process.env.POSTGRES_PASSWORD || 'test',
  // database: 'db',
  synchronize: true,
  logging: ['error'],
  entities: ['src/entity/**/*{.ts,.js}'],
  migrations: ['src/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
  ssl: { rejectUnauthorized: false },
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};
