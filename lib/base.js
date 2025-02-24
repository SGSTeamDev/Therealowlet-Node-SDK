const querystring = require("querystring");

const axios = require("axios");
const { AppError } = require("../middleware/error.js");
const { sendResponse } = require("../utils/helpers");

const base = (key) => {
  if (!key) throw new AppError(500, "API key is required.");

  const base_url = "https://therealowlet.com/api/v2";

  const request = async (path, payload = {}) => {
    try {
      if (!payload.method) {
        throw new AppError(500, "Request method is required.");
      }

      const method = payload.method.toUpperCase();
      let request_url = `${base_url}${path}`;

      if (payload.query) {
        // add key to query
        payload.query.key = key;

        // add query string to url
        const query_string = querystring.stringify(payload.query);
        request_url += query_string ? `?${query_string}` : "";
      }

      // set payload data (request payload) to empty object
      payload.data = {};

      const config = {
        method,
        url: request_url,
        data: payload.data,
      };

      const response = await axios(config);

      if (response.data.error) {
        throw new AppError(response.status, response.data.error, response.data);
      } else {
        return sendResponse(response.status, "Successful", response.data);
      }
    } catch (error) {
      if (error && (error.status_code || error.status)) {
        const status = error.status_code || error.status;
        const message =
          (error.data && error.data.error) ||
          (error.response.data && error.response.data.error) ||
          "API error.";

        if (status && message && (error.data || error.response.data)) {
          throw new AppError(
            status,
            message,
            error.data || error.response.data
          );
        }
      } else {
        throw new AppError(500, "API error.");
      }
    }
  };

  return request;
};

module.exports = base;
