const knex = require("../db/connection");

function productExists(req, res, next) {
  productsService
    .read(req.params.productId)
    .then((product) => {
      if (product) {
        res.locals.product = product;
        return next();
      }
      next({ status: 404, message: `Product cannot be found.` });
    })
    .catch(next);
}

function list() {
  return knex("products").select("*");
}

function read(req, res) {
  const { product: data } = res.locals;
  res.json({ data });
}

module.exports = {
  list,
  read: [productExists, read],
  
};
