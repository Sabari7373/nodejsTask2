const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3001;

app.use(express.json());
const rooms = [
  {
    name: "Premium",
    seats: 50,
    amenities: "Parking , Wifi , AC",
    price: 1000,
    roomId: "001",
    cusDetails: [
      {
        customerName: "John Cena",
        date: new Date("2023-01-04"),
        start: "07:00",
        end: "10:00",
        status: "payment received",
      },
    ],
  },
  {
    name: "Gold",
    seats: 100,
    amenities: "wifi, parking",
    price: 800,
    roomId: "002",
    cusDetails: [
      {
        customerName: "Roman Reigns",
        date: new Date("2023-01-05"),
        start: "15:00",
        end: "17:00",
        status: "Payment Pending",
      },
    ],
  },
  {
    name: "Silver",
    seats: 120,
    amenities: "Wifi,TV",
    price: 700,
    roomId: "003",
    cusDetails: [
      {
        customerName: "Randy Orten",
        date: new Date("2023-1-06"),
        start: "15:00",
        end: "17:00",
        status: "Payment received",
      },
    ],
  },
];
app.get("/listCustomer", (req, res) => {
  let customerArray = [];

  rooms.forEach((room) => {
    let customerObj = { roomName: room.name };

    room.cusDetails.forEach((customer) => {
      customerObj.customerName = customer.customerName;
      customerObj.date = customer.date;
      customerObj.start = customer.start;
      customerObj.end = customer.end;

      customerArray.push(customerObj);
    });
  });

  res.send(customerArray);
});

app.get("/listRooms", (req, res) => {
  console.log("list rooms");
  res.status(200).send(rooms);
});

app.get("/", (req, res) => {
  console.log("Welcome To Hall Booking");

});
app.get("/", (req, res) => {
  res.status(200).send("Welcome To Hall Booking App");
});


app.post("/createRoom", (req, res) => {
  rooms.push({
    name: req.body.name,
    seats: req.body.seats,
    amenities: req.body.amenities,
    price: req.body.price,
    roomId: "001",
    cusDetails: [{}],
  });
  res.status(200).send("Room Created");
});

app.post("/bookRoom", (req, res, next) => {
  for (let i = 0; i < rooms.length; i++) {
    console.log("Book");
    if (!(rooms[i].roomId === req.body.roomId)) {
      return res.status(400).send({ error: "Invalid" });
    } else {
      let booking = {
        customerName: req.body.name,
        date: new Date(req.body.date),
        start: req.body.start,
        end: req.body.end,
        status: "confirmed",
      };
      let result = undefined;
      rooms[i].cusDetails.forEach((book) => {
        if (
          book.date.getTime() == booking.date.getTime() &&
          book.start === booking.start
        ) {
          result = 0;
          console.log("in booking");
        } else {
          result = 1;
          rooms[i].cusDetails.push(booking);
        }
      });
      if (result) return res.status(200).send("Booking confirmed");
      else
        return res
          .status(400)
          .send({ error: "Please select different time" });
    }
  }
});

app.listen(port, () => {
  console.log(`server started at ${port}`);
});
