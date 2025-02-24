const { AppError } = require("../middleware/error.js");

class Order {
  constructor(request) {
    this.request = request;
  }

  async refill(query) {
    if (query.orders) {
      if (!Array.isArray(query.orders)) {
        throw new AppError(400, "Incorrect request", {
          error: "orders must be an array",
        });
      }
      query.orders = query.orders.join(",");
    }

    return this.request("/", {
      method: "POST",
      query: { ...query, action: "refill" },
    });
  }

  async status(query) {
    if (query.refills) {
      if (!Array.isArray(query.refills)) {
        throw new AppError(400, "Incorrect request", {
          error: "refills must be an array",
        });
      }
      query.orders = query.orders.join(",");
    }

    return this.request("/", {
      method: "GET",
      query: { ...query, action: "refill_status" },
    });
  }
}

module.exports = Order;
