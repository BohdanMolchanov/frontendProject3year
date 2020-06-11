import config from "config";
import { authHeader, handleResponse } from "@/_helpers";

export const userService = {
  getAll,
  getById,
  deleteById,
};

function getAll() {
  const requestOptions = { method: "GET", headers: authHeader() };
  return fetch(`${config.apiUrl}/auth`, requestOptions).then(handleResponse);
}

function getById(id) {
  const requestOptions = { method: "GET", headers: authHeader() };
  return fetch(`${config.apiUrl}/auth/${id}`, requestOptions).then(
    handleResponse
  );
}
function deleteById(id) {
  const requestOptions = { method: "DELETE", headers: authHeader() };
  return fetch(`${config.apiUrl}/auth?id=${id}`, requestOptions).then(
    handleResponse
  );
}
