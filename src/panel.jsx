import * as React from "react";
import { render } from "react-dom";

export default function (Component) {
  let panel = null;
  let instance = null;
  const root = document.createElement("div");

  function show(event) {
    panel = event.node;
    panel.appendChild(root);

    if (!instance) {
      instance = render(<Component />, root);
    }
  }

  function hide() {
    panel.removeChild(root);
  }

  function update() {
    console.log("Not implemented yet");
  }

  return { show, hide, update };
}
