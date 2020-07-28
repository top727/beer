import React from "react";
import { ToastProvider } from "react-toast-notifications";
import Sensor from "./components/Sensor";
import "./index.scss";

const App = () => {
  return (
    <div className="app">
      <ToastProvider autoDismissTimeout={2000} placement="bottom-right">
        <div className="title">Temperature Sensor</div>
        <Sensor />
      </ToastProvider>
    </div>
  );
};

export default App;
