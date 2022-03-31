export const API = {
  baseUrl: "https://disease.sh/v3/covid-19/",
  all: "all",
  countries: "countries",
};

export const fetcher = (...args) => fetch(...args).then((res) => res.json());
