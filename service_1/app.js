const express = require("express");
const axios = require("axios");
const calculationUtils = require("./utils/calculationUtils.js");

const app = express();
const port = 4001;

app.listen(port, () => {
  console.log("Service_1 is running!");
});

// triggering watchtower!!!

app.get("/api/service_1/", function(req, res) {
  const timezone = req.query.tz;
  const requestURL = "http://service_2:4002/api/service_2/?tz=" + timezone;

  const config = {
    method: 'get',
    url: requestURL,
    headers: {}
  };
  
  axios(config)
  .then(function (response) {
      res.status(200).send(calculationUtils.calculateTimeToMidnight(response.data));
  })
  .catch(function (error) {
    if (error.response) {
      res.status(404).send("Error occurred in service_1! Reason: " + error.response.data)
    }
    else {
      res.status(404).send("Unknown error occurred in service_1!")
    }
  });
});

app.get("*", function(req, res) {
  res.status(200).send("You reached service_1");
});

