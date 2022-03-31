import axiosClient from "./axiosClient";

const covidApi = {
  getAll() {
    const url = "/all";
    return axiosClient.get(url);
  },
  getByCountry(countryCode) {
    const url = `/countries/${countryCode}`;
    return axiosClient.get(url);
  },
  getCountry() {
    const url = "/countries";
    return axiosClient.get(url);
  },
  getHistory(countryCode, timePeriod) {
    const url = `/historical/${
      countryCode === "Worldwide" ? "all" : countryCode
    }?lastdays=${timePeriod}`;
    return axiosClient.get(url);
  },
};

export default covidApi;
