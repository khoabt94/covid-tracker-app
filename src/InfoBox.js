import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import millify from "millify";
import "./InfoBox.css";

const InfoBox = ({ title, cases, total, isRed }) => {
  return (
    <Card
      // onClick={props.onClick}
      className="infoBox"
    >
      <CardContent>
        <h2 className="font-bold">{title}</h2>
        <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>
          +{millify(cases || 0, { lowercase: true })}
        </h2>
        <p className="infoBox__total">
          {millify(total || 0, { lowercase: true })} Total
        </p>
      </CardContent>
    </Card>
  );
};

export default InfoBox;
