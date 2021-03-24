import * as React from "react";
import { Intro as Icon } from "../Icons/Intro";
import css from "./intro.module.css";

export const Intro = () => (
  <div className={css.box}>
    <Icon className={css.icon} />
    <div>
      <h3 className={css.title}>Pick a quote</h3>
      <p className={css.subtitle}>
        Click on your favorite quote to create it on canvas
      </p>
    </div>
  </div>
);
