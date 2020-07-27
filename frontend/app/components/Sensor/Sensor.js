import React, { useEffect } from "react";
import { useToasts } from "react-toast-notifications";
import classNames from "classnames";
import socketIOClient from "socket.io-client";
import { ENDPOINT } from "../../utils/config";
import beers from "../../utils/beer";

const Sensor = () => {
  const { addToast } = useToasts();

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("changedTemperature", (data) => {
      console.log(data);
      // setResponse(data);
    });
  }, []);

  return (
    <div className="sensor">
      <div className="beer-group">
        {beers.map((x, index) => (
          <div className="beer" key={x.name}>
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
