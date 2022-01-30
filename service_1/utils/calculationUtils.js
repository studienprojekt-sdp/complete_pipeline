exports.calculateTimeToMidnight = function (response) {
  const time = response.time;
  const location = response.location;
  
  const secondsInDay = 86400;

  const arr = time.split(":");

  let timeInSeconds = parseInt(arr[0]) * 60 * 60;
  timeInSeconds += parseInt(arr[1]) * 60;
  timeInSeconds += parseInt(arr[2]);

  if (timeInSeconds !== 0) {
    let secondsToMidnight = secondsInDay - timeInSeconds;

    const secondsInHour = 3600;
    const secondsInMinute = 60;
  
    const returnHours = Math.floor(secondsToMidnight / secondsInHour);
    secondsToMidnight %= secondsInHour;
  
    const returnMinutes = Math.floor(secondsToMidnight / secondsInMinute);
    secondsToMidnight %= secondsInMinute;
  
    const returnSeconds = secondsToMidnight;
    

    const city_arr = location.split("/")
    if (city_arr.length > 1) {
      let city = city_arr[1].toUpperCase();

      return returnHours + " HOURS, " + returnMinutes + " MINUTES AND " + returnSeconds + " SECONDS UNTIL IT IS FINALLY MIDNIGHT IN " + city + ". I CAN'T WAIT!!";

    } else {

      return returnHours + " HOURS, " + returnMinutes + " MINUTES AND " + returnSeconds + " SECONDS UNTIL IT IS FINALLY MIDNIGHT. I CAN'T WAIT!!";
    }

  } 
  else {
    return "OMG, IT'S EXACTLY MIDNIGHT! SCARY STUFF!! THIS IS SOOOO EXCITING!!!"
  }
  };
