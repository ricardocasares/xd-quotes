import panel from "./panel";
import { App } from "./components/App";
import "./global.css";

const quotePicker = panel(App);

module.exports = {
  panels: {
    quotePicker,
  },
};
