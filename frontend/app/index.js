import React from "react";
import ReactDOM from "react-dom";
import { ToastProvider } from "react-toast-notifications";
import Sensor from "./components/Sensor/Sensor";
import "./index.scss";

const App = () => {
  return (
    <div className="app">
      <ToastProvider>
        <div className="title">Temperature Sensor</div>

        <Sensor />
      </ToastProvider>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
