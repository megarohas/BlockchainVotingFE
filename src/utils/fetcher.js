import { Promise } from "es6-promise";

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  }
  return Promise.reject(new Error(response.statusText));
}

function getResponseJson(response) {
  return response.json();
}

export function get(url) {
  return fetch(url, {
    method: "GET",
    credentials: "same-origin",
    headers: new Headers({
      Accept: "application/json",
      "Content-Type": "application/json"
    })
  })
    .then(response => checkStatus(response))
    .then(json => getResponseJson(json))
    .then(data => {
      return data;
    })
    .catch(error => {
      return error;
    });
}

export function post(url, sendData) {
  var parsed = JSON.stringify(sendData);
  return fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: new Headers({
      Accept: "application/json",
      "Content-type": "application/json; charset=UTF-8"
    }),
    body: parsed
  })
    .then(json => getResponseJson(json))
    .then(function(data) {
      return data;
    })
    .catch(function(error) {
      console.log("Request failed", error);
    });
}
