import fetch from "node-fetch";

export async function fetchJson(url) {
  const response = await fetch(url);
  return await response.json();
}

export function getBoolean(transformedElement) {
  if (transformedElement === "N") {
    return false;
  }
  if (transformedElement === "J") {
    return true;
  }

  return Boolean(transformedElement);
}

export function isEmptyObj(obj) {
  return JSON.stringify(obj) === "{}";
}
