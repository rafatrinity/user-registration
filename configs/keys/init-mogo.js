db = db.getSiblingDB('admin');

db.createUser({
  user: cat('/run/secrets/DB_USERNAME'),
  pwd: cat('/run/secrets/DB_PASSWORD'),
  roles: [{ role: 'userAdminAnyDatabase', db: 'admin' }],
});

db.auth(cat('/run/secrets/DB_USERNAME'), cat('/run/secrets/DB_PASSWORD'));

db = db.getSiblingDB('mydb');

db.createUser({
  user: 'myuser',
  pwd: cat('/run/secrets/DB_PASSWORD'),
  roles: [{ role: 'readWrite', db: 'mydb' }],
});