import { useEffect, useState } from 'react';
import { getJson } from './getJson';

export const useFetch = (url: string) => {
    const [data, setData] = useState(null);
    const [isError, setIsError] = useState(false);
    const [refetch, setRefetch] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            const { data: result, error } = await getJson(url);
            setData(result);
            setIsError(!!error);
            setRefetch(false);
            setIsLoading(false);
        };
        getData();
    }, [refetch]);

    return { data, isError, isLoading, refetch: () => setRefetch(true) };
};
