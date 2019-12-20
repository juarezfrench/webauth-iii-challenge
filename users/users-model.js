const db = require('../data/db-config');

module.exports = {
  add,
  find,
  findBy,
  findById,
  // signToken
};

function find() {
return db('users').select('id', 'username', 'password');
}
// function signToken(user) {
//   const payload = {
//     username:user.id
//   }

// const options = {
// expiresIn:"1h",
// }
// return jwt.sign(payload, secret, options)


function findBy(filter) {
  return db('users').where(filter);
}

async function add(user) {
  const [id] = await db('users').insert(user);

  return findById(id);
}

function findById(id) {
  return db('users')
    .where({ id })
    .first();
}
