import { useEffect, useState } from 'react';

const usePortal = (searchQuery) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

            try {
                let response;
                if (searchQuery) {
                    let url = `${import.meta.env.VITE_SERVER_BASE_URL}/search?q=${searchQuery}`;
                    response = await fetch(url);
                }

                const result = await response.json();
                setData(result);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [searchQuery]);

    return { data, isLoading, error };
};

export default usePortal;