import { useState } from 'react';
import { sendJson } from './sendJson';

export const useSendData = (): {
    isSubmitting: boolean;
    isError: boolean;
    sendData: (
        url: string,
        method: 'POST' | 'PUT' | 'DELETE',
        data?: object | object[]
    ) => Promise<{ error: boolean }>;
} => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isError, setIsError] = useState(false);

    const sendData = async (
        url: string,
        method: 'POST' | 'PUT' | 'DELETE',
        data?: object | object[]
    ) => {
        setIsSubmitting(true);
        setIsError(false);

        const { error } = await sendJson(url, method, data)

        setIsSubmitting(false);
        if (error) {
            setIsError(true);
            return { error: true };
        }
        return { error: false };
    };

    return { isSubmitting: isSubmitting, isError, sendData };
};
