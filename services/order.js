const { AppError } = require("../middleware/error.js");

class Order {
  constructor(request) {
    this.request = request;
  }

  async add(query) {
    return this.request("/", {
      method: "POST",
      query: { ...query, action: "add" },
    });
  }

  async status(query) {
    if (query.orders) {
      if (!Array.isArray(query.orders)) {
        throw new AppError(400, "Incorrect request", {
          error: "orders must be an array",
        });
      }
      query.orders = query.orders.join(",");
    }

    return this.request("/", {
      method: "GET",
      query: { ...query, action: "status" },
    });
  }

  async cancel(query) {
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
      query: { ...query, action: "cancel" },
    });
  }
}

module.exports = Order;
