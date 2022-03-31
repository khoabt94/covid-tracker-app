import { FormControl, MenuItem, Select } from "@material-ui/core";
import React, { Fragment, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import covidApi from "../api/covidApi";
import Chart from "chart.js/auto";

const LineGraph = ({ countryCode }) => {
  const [data, setData] = useState([]);
  const [timePeriod, setTimePeriod] = useState(30);
  const [country, setCountry] = useState("Worldwide");
  const timeArray = [30, 60, 90, 120, 180, 360];
  const dataX = data?.map((el) =>
    new Date(Date.parse(el.x)).toLocaleDateString()
  );
  const dataY = data?.map((el) => el.y);

  const handleTimePeriodChange = (event) => {
    setTimePeriod(event.target.value);
  };

  const buildChartData = (data) => {
    const entries = Object.entries(data);
    return entries
      .map((el, i) => ({
        x: el[0],
        y: i === 0 ? +el[1] : +el[1] - entries[i - 1][1],
      }))
      .slice(1);
  };

  useEffect(() => {
    const fetchHistory = async () => {
      const response = await covidApi.getHistory(countryCode, timePeriod);
      let buildData;
      if (countryCode === "Worldwide")
        buildData = buildChartData(response.cases);
      else buildData = buildChartData(response.timeline.cases);
      setData(buildData);
      setCountry(response?.country || "Worldwide");
    };
    fetchHistory();
  }, [timePeriod, countryCode]);

  return (
    <div className="p-5 rounded-md mt-5 border border-gray-200 bg-white shadow">
      <h2 className="font-bold text-2xl mb-2">{country} New Cases</h2>
      <FormControl>
        <Select
          variant="outlined"
          onChange={handleTimePeriodChange}
          value={timePeriod}
          className="w-[200px] bg-white h-[30px]"
        >
          {timeArray.map((time, index) => (
            <MenuItem key={index} value={time}>
              {`Last ${time} days`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Line
        data={{
          labels: dataX,
          datasets: [
            {
              backgroundColor: "rgba(204,16,52,0.5)",
              borderColor: "#CC1034",
              data: dataY,
              label: "New Cases",
              fill: true,
            },
          ],
        }}
        options={{ responsive: true, maintainAspectRatio: true }}
      />
    </div>
  );
};

export default LineGraph;
