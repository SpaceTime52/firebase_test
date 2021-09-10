import React from "react";
import ReactDOM from "react-dom";
import App from "components/App";

// APP Component를 를 HTML #root 위치에 불러옴

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
