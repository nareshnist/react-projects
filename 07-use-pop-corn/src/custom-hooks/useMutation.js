import { useState,useEffect } from "react";


/*
    2️⃣ useMutation → POST / PUT / PATCH / DELETE (Write)
        This is the missing piece.
        🔑 Idea
        Trigger API manually
        Not auto-run like useFetch
        Return a function (mutate)
*/

export function useMutation() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const mutate = async ({ url, method, body, headers }) => {
    try {
      setIsLoading(true);
      setError('');

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: body ? JSON.stringify(body) : null,
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      const result = await response.json();
      setData(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, data, error, isLoading };
}



/*


✅ PATTERN 1 (RECOMMENDED): useFetch with a trigger

This keeps your hook reusable and clean.


export function useFetch(url, { enabled = true } = {}) {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!url || !enabled) return;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError('');

        const response = await fetch(url);
        if (!response.ok) throw new Error('Fetch failed');

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, enabled]);

  return { data, error, isLoading };
}

🧠 What changed?
    ❌ No useEffect
    ✅ Fetch is manual
    ✅ Triggered on button click


🔹 Component Usage

function Projects() {
  const { data, isLoading, error, fetchData } = useFetch();

  const loadProjects = () => {
    fetchData('/api/projects');
  };

  return (
    <div>
      <button onClick={loadProjects}>
        Load Projects
      </button>

      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {data && data.map(p => (
        <p key={p.id}>{p.name}</p>
      ))}
    </div>
  );
}


✅ PATTERN 2: useFetch with enabled flag (React-Query style)

This keeps your auto-fetch design, but with a switch.


export function useFetch(url, { enabled = true } = {}) {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!url || !enabled) return;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError('');

        const response = await fetch(url);
        if (!response.ok) throw new Error('Fetch failed');

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, enabled]);

  return { data, error, isLoading };
}


function Projects() {
  const [enabled, setEnabled] = useState(false);

  const { data, isLoading } = useFetch(
    '/api/projects',
    { enabled }
  );

  return (
    <div>
      <button onClick={() => setEnabled(true)}>
        Load Projects
      </button>

      {isLoading && <p>Loading...</p>}
      {data && data.map(p => <p key={p.id}>{p.name}</p>)}
    </div>
  );
}


/*