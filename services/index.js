class Owlet {
  constructor(request) {
    this.request = request;
  }

  async balance(query) {
    return this.request(`/`, {
      method: "GET",
      query: { ...query, action: "balance" },
    });
  }

  async services(query) {
    return this.request(`/`, {
      method: "GET",
      query: { ...query, action: "services" },
    });
  }
}

module.exports = Owlet;
