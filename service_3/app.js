import express from "express";
import axios from "axios";

const app = express();
const port = 4003;

app.listen(port, () => {
  console.log("Service_3 is running!");
});

app.get("/api/service_3/", function(req, res) {
  const timezone = req.query.tz;
  const requestURL = "https://api.ipgeolocation.io/timezone?apiKey=59149b3287fd4d55b0d992b9cf2924ea&tz=" + timezone;

  const config = {
    method: 'get',
    url: requestURL,
    headers: {}
  };
  
  axios(config)
  .then(function (response) {
    res.status(200).send(response.data); 
  })
  .catch(function (error) {
    if (error.response) {
      res.status(404).send("Error occurred in service_3! Reason: " + error.response.data)
    }
    else {
      res.status(404).send("Unknown error occurred in service_3!")
    }
  });
});

app.get("*", function(req, res) {
  res.status(200).send("You reached service_3");
});