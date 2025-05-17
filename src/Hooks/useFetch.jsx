import React from 'react';

function useFetch() {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(null);

  const request = React.useCallback(async (url, options) => {
    let response;
    let resJSON;

    setLoading(true);
    setError(null);

    try {
      response = await fetch(url, options);
      resJSON = await response.json();

      if (!response.ok) throw new Error(resJSON.message);
    } catch (error) {
      setError(error.message);
      resJSON = null;
    } finally {
      setLoading(false);
      setData(resJSON);

      return { response, json: resJSON };
    }
  }, []);

  return { data, error, loading, request };
}

export default useFetch;
