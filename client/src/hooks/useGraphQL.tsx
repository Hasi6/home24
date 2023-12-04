import { useState, useEffect, useCallback } from 'react';

interface GraphQLResponse<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refresh: () => void;
  isRefreshing: boolean;
  initialLoading: boolean;
}

function useGraphQL<T>(query: string, headers: Record<string, string>): GraphQLResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const apiHeaders = JSON.stringify(headers);

  const fetchData = useCallback(() => {
    return new Promise<void>((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open('POST', '/graphql', true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      Object.keys(JSON.parse(apiHeaders)).forEach((key) => {
        xhr.setRequestHeader(key, JSON.parse(apiHeaders)[key]);
      });

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          setLoading(false);
          setIsRefreshing(false);
          if (xhr.status === 200) {
            try {
              const response = JSON.parse(xhr.responseText);
              setData(response.data);
              resolve();
            } catch (err) {
              if (err instanceof Error) {
                setError(err);
                reject(err);
              } else {
                const unknownError = new Error('Unknown error occurred during JSON parsing');
                setError(unknownError);
                reject(unknownError);
              }
            }
          } else {
            const httpError = new Error(`HTTP error! Status: ${xhr.status}`);
            setError(httpError);
            reject(httpError);
          }
        }
      };

      xhr.send(JSON.stringify({ query }));

      // Cleanup function
      return () => {
        xhr.abort();
      };
    });
  }, [query, apiHeaders]);

  useEffect(() => {
    fetchData()
      .then(() => setInitialLoading(false))
      .catch(() => {});
    // fetchData only changes when query or headers change
  }, [fetchData]);

  const refresh = useCallback(() => {
    setIsRefreshing(true);
    setLoading(true);
    fetchData().catch(() => {});
  }, [fetchData]);

  return { loading, data, error, refresh, isRefreshing, initialLoading };
}

export default useGraphQL;
