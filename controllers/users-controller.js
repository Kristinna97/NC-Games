const { checkExists } = require("../db/seeds/utils");
const { fetchUsers,
       fetchUserByUsername } = require("../model/users-model");

exports.getUsers = (req, res, next) => {
  fetchUsers().then((users) => {
    res.status(200).send({ users });
  });
};
exports.getUserByUsername = (req, res, next) =>{
  const {username} = req.params
  const promises = [
  fetchUserByUsername(username),
  checkExists('users', 'username' , username)]

  return Promise.all(promises) 
  .then((responses) => {
    res.status(200).send({user : responses[0]})
  }).catch((err) =>{
    next(err)
  })
}

