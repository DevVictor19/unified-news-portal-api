export default () => ({
  server: {
    port: Number(process.env.SERVER_PORT),
    url: process.env.SERVER_URL,
  },
  database: {
    host: process.env.DB_HOST,
  },
  mail: {
    email: process.env.MAIL_EMAIL,
    name: process.env.MAIL_NAME,
    password: process.env.MAIL_PASSWORD,
  },
});
