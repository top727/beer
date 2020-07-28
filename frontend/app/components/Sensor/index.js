import React, { useState, useEffect } from "react";
import { useToasts } from "react-toast-notifications";
import socketIOClient from "socket.io-client";
import { ENDPOINT } from "../../utils/config";
import Beer from './Beer';

const Sensor = () => {
  const { addToast } = useToasts();
  const [beers, setBeers] = useState([]);

  useEffect(() => {
    let isCancelled = false;

    const socket = socketIOClient(ENDPOINT);
    socket.on("changedTemperature", (data) => {
      if (!isCancelled) setBeers(data.beers);
    });
    return () => {
      isCancelled = true;
    };
  }, []);

  useEffect(() => {
    const unsafe = beers.filter((x) => x.current < x.min || x.current > x.max);
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
          <Beer key={x.id} beer={x} />
        ))}
      </div>
    </div>
  );
};

export default Sensor;
