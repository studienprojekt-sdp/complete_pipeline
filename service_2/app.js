const express = require("express");
const axios = require("axios");

const app = express();
const port = 4002;

app.listen(port, () => {
  console.log("Service_2 is running!");
});

app.get("/api/service_2/", function(req, res) {
  const timezone = req.query.tz;
  const requestURL = "http://service_3:4003/api/service_3/?tz=" + timezone;

  const config = {
    method: 'get',
    url: requestURL,
    headers: {}
  };
  
  axios(config)
  .then(function (response) {
    const payload = {
      time: response.data.time_24,
      location: response.data.timezone
    }
    res.status(200).send(payload);
  })
  .catch(function (error) {
    if (error.response) {
      res.status(404).send("Error occurred in service_2! Reason: " + error.response.data)
    }
    else {
      res.status(404).send("Unknown error occurred in service_2!")
    }
  });
});

app.get("*", function(req, res) {
  res.status(200).send("You reached service_2");
});