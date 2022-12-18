import axios from "axios";

export const Get = async (path, params, authorizationToken) => {
  return axios
    .get(process.env.REACT_APP_API_URI + path, {
      params,
      headers: { Authorization: authorizationToken },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      // console.log("erreur dans myHttpHelper du GET :", error);
      if (
        error.response.data &&
        error.response.data.message === "invalid_Token"
      ) {
        window.location.href = "/";
      }
      throw error;
    });
};

export const Post = async (path, body, authorizationToken) => {
  return axios
    .post(process.env.REACT_APP_API_URI + path, body, {
      headers: { Authorization: authorizationToken },
    })
    .then((response) => {
      // console.log("réponse dans myHTTPhelper POST :", response);
      return response;
    })
    .catch((error) => {
      console.log("error dans myHTTPhelper POST :", error);
      if (
        error.response.data &&
        error.response.data.message === "invalid_Token"
      ) {
        window.location.href = "/";
      }
      throw error;
    });
};

export const Put = async (path, body, authorizationToken) => {
  return axios
    .put(process.env.REACT_APP_API_URI + path, body, {
      headers: { Authorization: authorizationToken },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (
        error.response.data &&
        error.response.data.message === "invalid_Token"
      ) {
        window.location.href = "/";
      }
      throw error;
    });
};

export const Delete = async (path, body, authorizationToken) => {
  return axios
    .delete(process.env.REACT_APP_API_URI + path, {
      body,
      headers: { Authorization: authorizationToken },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (
        error.response.data &&
        error.response.data.message === "invalid_Token"
      ) {
        window.location.href = "/";
      }
      throw error;
    });
};
