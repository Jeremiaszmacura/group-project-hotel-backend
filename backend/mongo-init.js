db = db.getSiblingDB('hotel');
db.createUser(
  {
    user: 'hotel-user',
    pwd: 'hotel-user',
    roles: [{ role: 'readWrite', db: 'hotel' }],
  },
);
db.createCollection('users');