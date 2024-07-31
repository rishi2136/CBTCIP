const allGuests = require("./data/dummyGuest.json")

const newArray = [];

// let guestList = JSON.parse(allGuests);
allGuests.map((el) => newArray.push(el.name));

console.log(newArray)
