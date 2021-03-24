import { useState, useEffect } from "react";

const QUOTES_API = "https://type.fit/api/quotes";

export function useQuotes() {

  const [error, setError] = useState(false);
  const [quotes, setQuotes] = useState([]);

  const toJSON = (r) => r.json();
  const hasError = () => setError(true);

  // @todo
  // The API has no way to limit the size of the response
  // and this is not good because it's blocking the UI for a long time :(
  const httpGetEffect = () =>
    fetch(QUOTES_API)
      .then(toJSON)
      .then(setQuotes)
      .catch(hasError);

  useEffect(httpGetEffect, []);

  return { error, quotes, loading: quotes.length === 0 && !error };
}

export default useQuotes;