require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

const base = require("./lib/base");

const Owlet = require("./services/index");
const Order = require("./services/order");
const Refill = require("./services/refill");

module.exports = (key) => {
  const request = base(key);
  const index = new Owlet(request);

  return {
    Order: new Order(request),
    Refill: new Refill(request),
    ...Object.getOwnPropertyNames(Owlet.prototype)
      .filter((method) => method !== "constructor") // exclude constructor
      .reduce((acc, method) => {
        acc[method] = index[method].bind(index); // bind methods to the instance
        return acc;
      }, {}),
  };
};
