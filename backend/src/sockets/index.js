import axios from "axios";
import { serviceURL } from "../utils/config";
import defaultBeers from "../utils/beer";
var io;

let beers = [...defaultBeers];

var init = (server) => {
  io = require("socket.io").listen(server);
  io.set("origins", "*:*");

  io.on("connection", async (socket) => {
    setInterval(async () => {
      const newBeers = await Promise.all(
        beers.map(async (x) => {
          const result = await axios.get(`${serviceURL}/${x.id}`);
          return {
            ...x,
            current: result.data.temperature,
          };
        })
      );

      const diff = beers.filter(
        (x, index) => x.current != newBeers[index].current
      );

      beers = [...newBeers];

      if (diff.length) socket.emit("changedTemperature", { beers });
    }, 1000);
  });
};

module.exports = {
  io,
  init,
};
