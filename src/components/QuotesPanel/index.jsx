import * as React from "react";
import { Quote } from "../Quote";
import styles from "./quotes.panel.module.css";

export const QuotesPanel = ({ quotes, error, loading, onQuoteClicked }) => {
  const pickQuote = (quote) => () => onQuoteClicked(quote);

  return (
    <div className={styles.box}>
      {error && <Quote text="What can go wrong, it will." author="Murphy" />}
      {loading && <Quote text="Be the quotes loading." author="Ricardo" />}
      {quotes &&
        quotes.map((quote, idx) => (
          <Quote key={`quote-${idx}`} onClick={pickQuote(quote)} {...quote} />
        ))}
    </div>
  );
};
