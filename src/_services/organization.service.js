import config from "config";
import { authHeader, handleResponse } from "@/_helpers";

export const organizationService = {
  register,
  getOrgById,
};

function register(name, edrpou) {
  const headers = new Headers(authHeader());
  headers.append("Content-Type", "application/json");
  const requestOptions = {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ name, edrpou }),
  };
  return fetch(
    `${config.apiUrl}/auth/register/organization`,
    requestOptions
  ).then(handleResponse);
}

function getOrgById(id) {
  const requestOptions = {
    method: "GET",
  };
  return fetch(`${config.apiUrl}/auth/organization/${id}`, requestOptions).then(
    handleResponse
  );
}
