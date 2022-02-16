import App from "./App";
import React from "react";
import ReactDom from "react-dom"
import { render } from "react-dom";

const appDiv = document.getElementById("app");
render(<App />, appDiv);