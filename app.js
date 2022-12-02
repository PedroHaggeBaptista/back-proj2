const express = require("express");
require("express-async-errors");
require("dotenv").config();
var bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(express.json()); //Irá suportar JSON
app.use(
  bodyParser.urlencoded({
    // Irá suportar urlenconded
    extended: true,
  })
);

let newSSIDs = {"ssid": [], "rssi": []};

function getRoom(array) {
    if (array.ssid == "" || array.rssi == "") {
        return "Sem salas por perto";
    }

    array.ssid.map(async (each, index) => {
        if(each[0] == "e" && each[1] == "s" && each[2] == "p") {
            newSSIDs.ssid.push(each);
            newSSIDs.rssi.push(array.rssi[index]);
        }
    })

    if (newSSIDs.ssid.length > 1) {
        const max = Math.max(...newSSIDs.rssi);
        const index = newSSIDs.rssi.indexOf(max)
        let location = newSSIDs.ssid[index].split("-")[1]
        location = location.split("_")
        const room = location[0]
        const building = location[1]

        return(`O objeto está localizado na sala ${room} do prédio ${building}`)
    } else {
        let location = newSSIDs.ssid[0].split("-")[1]
        location = location.split("_")
        const room = location[0]
        const building = location[1]

        return {
            "room": room,
            "building": building
        }
    }
}

mongoose.connect(`mongodb+srv://IPTracker:${process.env.MONGO_PASS}@cluster0.zyrrcuq.mongodb.net/test`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const PORT = process.env.PORT || 3001;

const buzzerRouter = require('./Routes/buzzer')
const deviceRouter = require('./Routes/device')
const userRouter = require('./Routes/user')

app.use("/Buzzer", buzzerRouter)
app.use("/Device", deviceRouter)
app.use("/User", userRouter)

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});
