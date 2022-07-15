import { VOTING_STATIONS, EARLY_VOTING_STATIONS } from "../urls.js";
import { booleanKeys, numericKeys, StationLookupKey } from "../src/lookup.js";
import { fetchJson, getBoolean, isEmptyObj } from "../src/utils.js";

function transformSource(data) {
  const result = [];
  for (const station of data) {
    const transformed = {};
    const dates = {};
    for (const key in station) {
      const isDate = Date.parse(key);
      if (isNaN(isDate)) {
        transformed[StationLookupKey[key]] = station[key];
      } else {
        dates[key] = station[key];
      }
    }

    if (
      transformed.hasOwnProperty("latitude") &&
      transformed.latitude !== null
    ) {
      transformed.latitude = transformed.latitude.replace(",", ".");
    }

    if (
      transformed.hasOwnProperty("longitude") &&
      transformed.longitude !== null
    ) {
      transformed.longitude = transformed.longitude.replace(",", ".");
    }

    for (const key of numericKeys) {
      if (transformed.hasOwnProperty(key)) {
        transformed[key] = Number(transformed[key]);
      }
    }

    for (const key of booleanKeys) {
      if (transformed.hasOwnProperty(key)) {
        transformed[key] = getBoolean(transformed[key]);
      }
    }
    if (!isEmptyObj(dates)) {
      transformed.dates = dates;
    }

    result.push(transformed);
  }
  console.log(result);
  return result;
}

async function importVotingStations() {
  const data = await fetchJson(VOTING_STATIONS);
  return transformSource(data);
}

async function importEarlyVotingStations() {
  const data = await fetchJson(EARLY_VOTING_STATIONS);
  return transformSource(data);
}

(async () => {
  const votingStations = await importVotingStations();
  const earlyVotingStations = await importEarlyVotingStations();

  console.log(votingStations.length, earlyVotingStations.length);
})();
