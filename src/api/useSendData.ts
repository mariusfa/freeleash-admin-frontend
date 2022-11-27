import { useState } from 'react';
import { postJson } from './postJson';

export const useSendData = (): {
    isSubmitting: boolean;
    isError: boolean;
    sendData: (url: string, data: object | object[]) => Promise<void>;
} => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isError, setIsError] = useState(false);

    const sendData = async (url: string, data: object | object[]) => {
        setIsSubmitting(true);
        const { error } = await postJson(url, data);
        setIsSubmitting(false);
        if (error) {
            setIsError(true);
        }
    };

    return { isSubmitting: isSubmitting, isError, sendData };
};
