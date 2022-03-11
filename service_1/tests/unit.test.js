const calculationUtils = require("../utils/calculationUtils.js");

describe("service_1_unittests", function () {

  const midnight = {
    time: "0:00:00",
    location: "Europe/Berlin"
  }

  const not_midnight = {
    time: "19:04:00",
    location: "Germany/Gelsenkirchen"
  }

  const no_location = {
    time: "19:04:00",
    location: "Germany"
  }
    
    
  it("exactly midnight", () => {
      expect(calculationUtils.calculateTimeToMidnight(midnight)).toBe("OMG, IT'S EXACTLY MIDNIGHT! SCARY STUFF!! THIS IS SOOOO EXCITING!!!");
  })

  it("not midnight", () => {
    expect(calculationUtils.calculateTimeToMidnight(not_midnight)).toBe("4 HOURS, 56 MINUTES AND 0 SECONDS UNTIL IT IS FINALLY MIDNIGHT IN GELSENKIRCHEN. I CAN'T WAIT!!");
  })

  it("no location", () => {
    expect(calculationUtils.calculateTimeToMidnight(no_location)).toBe("4 HOURS, 56 MINUTES AND 0 SECONDS UNTIL IT IS FINALLY MIDNIGHT. I CAN'T WAIT!!");
  })

});