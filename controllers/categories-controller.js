const { fetchCategories } = require("../model/categories-model.js");

exports.getCategories = (req, res) => {
  fetchCategories().then((categories) => {
    res.status(200).send({ categories });
  });
};
