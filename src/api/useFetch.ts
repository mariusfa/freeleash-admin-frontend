import { useEffect, useState } from 'react';
import { getJson } from './getJson';

export const useFetch = <T>(
    url: string,
    initData: T,
    intervalTime?: number
): { data: T; isError: boolean; refetch: () => void; isLoading: boolean } => {
    const [data, setData] = useState<T>(initData);
    const [isError, setIsError] = useState(false);
    const [refetch, setRefetch] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            console.log('fetching');
            const { data: result, error } = await getJson(url);
            setData(result);
            setIsError(!!error);
            setRefetch(false);
            setIsLoading(false);
        };
        getData();

        if (intervalTime) {
            const interval = setInterval(() => {
                getData();
                console.log('hello');
            }, intervalTime);
            return () => clearInterval(interval);
        }
    }, [refetch]);

    return { data, isError, isLoading, refetch: () => setRefetch(true) };
};
