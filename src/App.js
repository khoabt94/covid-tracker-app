import React, { useEffect, useState } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
} from "@material-ui/core";

import InfoBox from "./InfoBox";
import covidApi from "./api/covidApi";
import Table from "./components/Table";
import LineGraph from "./components/LineGraph";

const App = () => {
  const [data, setData] = useState([]);
  const [countryCode, setCountryCode] = useState("Worldwide");
  const [statCountry, setStatCountry] = useState("");
  console.log(statCountry);

  const handleCountryChange = (event) => {
    // Set Country
    const countryCode = event.target.value;
    setCountryCode(countryCode);
  };

  useEffect(() => {
    const fetchCountryList = async () => {
      const data = await covidApi.getCountry();
      setData(data);
    };
    fetchCountryList();
  }, []);

  useEffect(() => {
    const fetchCountryStat = async () => {
      if (countryCode === "Worldwide") {
        const data = await covidApi.getAll();
        setStatCountry(data);
      } else {
        const data = await covidApi.getByCountry(countryCode);
        setStatCountry(data);
      }
    };
    fetchCountryStat();
  }, [countryCode]);

  return (
    <div className="app">
      <div className="app_left">
        <div className="app__header">
          <h1 className="text-4xl text-red-500 font-bold">COVID-19 TRACKER</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              onChange={handleCountryChange}
              value={countryCode}
              className="w-[200px] h-[30px] bg-white"
            >
              <MenuItem value="Worldwide">Worldwide</MenuItem>
              {data?.map(({ country, countryInfo }, index) => (
                <MenuItem key={index} value={countryInfo.iso2}>
                  {country}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <InfoBox
            title="Coronavirus Cases"
            isRed
            cases={statCountry.todayCases}
            total={statCountry.cases}
          />
          <InfoBox
            title="Recovered"
            cases={statCountry.todayRecovered}
            total={statCountry.recovered}
          />
          <InfoBox
            title="Deaths"
            isRed
            cases={statCountry.todayDeaths}
            total={statCountry.deaths}
          />
        </div>
        <LineGraph countryCode={countryCode} />
      </div>
      <Table data={data} />
    </div>
  );
};

export default App;
