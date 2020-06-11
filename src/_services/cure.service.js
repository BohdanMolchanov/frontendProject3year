import config from "config";
import { authHeader, handleResponse } from "@/_helpers";

export const cureService = {
  getAll,
  addCure,
  getNames,
  getByInternationalName,
  getOrganizationCures,
  getCureById,
  getOrganizationsByCureId,
  getByIntName,
};
function getOrganizationsByCureId(id) {
  const requestOptions = { method: "GET" };
  return fetch(
    `${config.apiUrl}/cure/${id}/organizations?id=${id}`,
    requestOptions
  ).then(handleResponse);
}
function getAll(pageNumber) {
  const requestOptions = { method: "GET" };
  if (pageNumber > 0)
    return fetch(
      `${config.apiUrl}/cure?pageNumber=${pageNumber}`,
      requestOptions
    ).then(handleResponse);
  else
    return fetch(`${config.apiUrl}/cure`, requestOptions).then(handleResponse);
}
function getByIntName(pageNumber, intName) {
  const requestOptions = { method: "GET" };
  if (pageNumber > 0)
    return fetch(
      `${config.apiUrl}/cure/international?pageNumber=${pageNumber}&name=${intName}`,
      requestOptions
    ).then(handleResponse);
  else
    return fetch(`${config.apiUrl}/cure`, requestOptions).then(handleResponse);
}

function getOrganizationCures() {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };
  return fetch(`${config.apiUrl}/cure/organization`, requestOptions)
    .then(handleResponse)
    .then(
      (message) => message,
      (error) => error
    );
}
function getCureById(id) {
  const requestOptions = {
    method: "GET",
  };
  return fetch(`${config.apiUrl}/cure/${id}`, requestOptions)
    .then(handleResponse)
    .then(
      (message) => message,
      (error) => error
    );
}
function getNames() {
  const requestOptions = { method: "GET" };
  return fetch(`${config.apiUrl}/cure/dict/curenames`, requestOptions).then(
    handleResponse
  );
}
function getByInternationalName(name) {
  const requestOptions = {
    method: "GET",
  };
  return fetch(
    `${config.apiUrl}/cure/names/international?name=${name}`,
    requestOptions
  )
    .then(handleResponse)
    .then(
      (message) => message,
      (error) => error
    );
}
function addCure(id, count) {
  const headers = new Headers(authHeader());
  headers.append("Content-Type", "application/json");
  const requestOptions = {
    method: "POST",
    headers: headers,
  };
  count = count;
  return fetch(`${config.apiUrl}/cure?id=${id}&count=${count}`, requestOptions)
    .then(handleResponse)
    .then(
      (message) => message,
      (error) => error
    );
}
