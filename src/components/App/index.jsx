import * as React from "react";
import { getRandomItem, insertQuote } from "../../util";
import { useQuotes } from "../../hooks/useQuotes";
import { Intro } from "../Intro";
import { CtaButton } from "../CtaButton";
import { QuotesPanel } from "../QuotesPanel";
import { Footer } from "../Footer";
import styles from "./app.module.css";

export function App() {
  const useQuotesProps = useQuotes();
  const pickOneForMe = () => insertQuote(getRandomItem(useQuotesProps.quotes));

  return (
    <div className={styles.panel}>
      <Intro />
      <QuotesPanel onQuoteClicked={insertQuote} {...useQuotesProps} />
      <Footer>
        <CtaButton onClick={pickOneForMe}>Pick one for me</CtaButton>
      </Footer>
    </div>
  );
}
