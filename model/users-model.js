const db = require("../db/connection");

exports.fetchUsers = () => {
  return db.query("SELECT * FROM users").then((response) => {
    return response.rows;
  });
};

exports.fetchUserByUsername = (username) =>{
  return db.query('SELECT * FROM users WHERE username=$1',[username]).then((response) =>{
    return response.rows[0];
  })
}