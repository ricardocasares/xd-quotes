import * as React from "react";
import css from "./footer.module.css";

export const Footer = ({ children }) => (
  <div className={css.box}>{children}</div>
);
