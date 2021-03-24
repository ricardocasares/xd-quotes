import * as React from "react";
import { Beaker } from "../Icons/Beaker";
import css from "./button.module.css";

export const CtaButton = ({ children, ...props }) => (
  // @todo
  // Hall of shame, never ever use a div for a button
  <div className={css.button} {...props}>
    {children} <Beaker className={css.icon} />
  </div>
);

export default CtaButton;
