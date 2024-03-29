mydb = db.getSiblingDB('pnu');
mydb.createUser({
  user: 'user',
  pwd: 'password',
  roles: [
    {
      role: 'readWrite',
      db: 'pnu',
    },
  ],
});
