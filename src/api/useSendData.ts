import { useState } from 'react';
import { jsonWrapper } from './jsonWrapper';

export type sendDataType = (
        url: string,
        method: 'POST' | 'PUT' | 'DELETE',
        data?: object | object[]
    ) => Promise<{ error: boolean }>;

export const useSendData = (): {
    isSubmitting: boolean;
    isError: boolean;
    sendData: sendDataType;
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

        const { error } = await jsonWrapper.sendJson(url, method, data)

        setIsSubmitting(false);
        if (error) {
            setIsError(true);
            return { error: true };
        }
        return { error: false };
    };

    return { isSubmitting: isSubmitting, isError, sendData };
};
