import * as React from "react";
import { DEFAULT_AUTHOR } from "../../util";
import styles from "./quote.module.css";

export const Quote = ({
  children: _,
  author = "Anonymous",
  text = "Quotes will arrive",
  ...props
}) => (
  <div className={styles.box} {...props}>
    <h2 className={styles.text}>{text}</h2>
    <h3 className={styles.author}>{author || DEFAULT_AUTHOR}</h3>
  </div>
);
