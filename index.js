const express = require("express");
const app = express();
const cors = require("cors");
let options = { origin: "*" }
app.use(cors(options))
const port = 3001;


let AllRooms = [{
    "id": 1,
    "seatcount": 50,
    "amenities": [{ "one": "television", "two": "conferencetable", "three": "speakers", "four": "smartboard", "five": "projector" }],
    "price": 2500
}, {
    "id": 2,
    "seatcount": 45,
    "amenities": [{ "one": "television", "three": "speakers", "four": "smartboard", "five": "projector" }],
    "price": 1500
}, {
    "id": 3,
    "seatcount": 40,
    "amenities": [{ "one": "television", "two": "conferencetable", "three": "speakers", "five": "projector" }],
    "price": 1300
}, {
    "id": 4,
    "seatcount": 50,
    "amenities": [{ "two": "conferencetable", "three": "speakers", "four": "smartboard", "five": "projector" }],
    "price": 1200
}, {
    "id": 5,
    "seatcount": 35,
    "amenities": [{ "one": "television", "two": "conferencetable", "three": "speakers", "four": "smartboard" }],
    "price": 1100
}, {
    "id": 6,
    "seatcount": 30,
    "amenities": [{ "one": "television", "two": "conferencetable", "three": "speakers", "five": "projector" }],
    "price": 1000
}, {
    "id": 7,
    "seatcount": 25,
    "amenities": [{ "one": "television", "two": "conferencetable", "five": "projector" }],
    "price": 900
}]
app.use(express.json())
app.get("/users", function (req, res) {
    res.json(AllRooms)
})
app.post("/create", function (req, res) {
    req.body = AllRooms

    res.json({ message: "Rooms-added" })
})
app.put("/bookroom/:id", function (req, res) {
    let index = AllRooms.findIndex(obj => obj.id == req.params.id);
    let keyarray = Object.keys(req.body);
    keyarray.forEach((obj) => {
        AllRooms[index][obj] = req.body[obj]
    })
    res.json({ message: "room booked" })
})

app.listen(port);
