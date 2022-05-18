exports.handlePSQLErrors = (err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad Request" });
  } else if (err.code === "23503") {
    res.status(404).send({ msg: "Not Found" });
  }
  next(err);
};

exports.handleCustomError = (err, req, res, next) => {
  res.status(err.status).send({ msg: err.msg });
};
