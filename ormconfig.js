module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  ssl: { ca: process.env.DB_CA_CERT },
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/**/*.migration{.ts,.js}'],
  migrationsRun: true,
};
