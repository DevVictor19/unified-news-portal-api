export default () => ({
  server: {
    port: Number(process.env.SERVER_PORT),
  },
  database: {
    host: process.env.DB_HOST,
  },
});
