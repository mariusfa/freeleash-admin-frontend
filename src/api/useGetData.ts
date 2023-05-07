import { useEffect, useState } from 'react';
import { jsonWrapper } from './jsonWrapper';

export const useGetData = <T>(
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
            const { data: result, error } = await jsonWrapper.getJson(url);
            setData(result);
            setIsError(!!error);
            setRefetch(false);
            setIsLoading(false);
        };
        getData();

        if (intervalTime) {
            const interval = setInterval(() => {
                getData();
            }, intervalTime);
            return () => clearInterval(interval);
        }
    }, [refetch]);

    return { data, isError, isLoading, refetch: () => setRefetch(true) };
};
