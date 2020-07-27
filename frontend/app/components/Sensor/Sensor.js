import React, { useState, useEffect } from "react";
import { useToasts } from "react-toast-notifications";
import classNames from "classnames";
import socketIOClient from "socket.io-client";
import useSound from "use-sound";
import { ENDPOINT } from "../../utils/config";
import ping from "../../assets/mp3/ping.mp3";

const Sensor = () => {
  const { addToast } = useToasts();
  const [beers, setBeers] = useState([]);
  const [play] = useSound(ping);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("changedTemperature", (data) => {
      setBeers(data.beers);
    });
  }, []);

  useEffect(() => {
    const unsafe = beers.filter((x) => x.current < x.min || x.current > x.max);
    if (unsafe.length) play();
    unsafe.forEach((x) => {
      addToast(`${x.id}'s temperature is not safe`, {
        appearance: "error",
        autoDismiss: true,
      });
    });
  }, [beers]);

  return (
    <div className="sensor">
      <div className="beer-group">
        {!beers.length && <div>...loading</div>}
        {beers.map((x) => (
          <div className="beer" key={x.id}>
            <div className="beer-name">
              <span>{x.name}</span>
            </div>
            <div className="min-max">
              <span>{x.min} &#8451;</span>~<span>{x.max} &#8451;</span>
            </div>
            <div
              className={classNames("current", {
                warning: x.min > x.current || x.current > x.max,
              })}
            >
              <span>{x.current} &#8451;</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sensor;
