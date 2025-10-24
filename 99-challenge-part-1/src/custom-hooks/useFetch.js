
import { useEffect, useState } from "react"
export function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {

        const loadData = async () => {
            try {
                setLoading(true);
                setError("");
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`An Error Occured while fetching data`);
                }

                const data = await response.json();
                setData(data);
            } catch (e) {
                setError(e.message);
             }
             finally{
                setLoading(false);
             }
        }

        loadData()

    }, []);

    return {
        data,
        loading,
        error
    }
}

export default useFetch
