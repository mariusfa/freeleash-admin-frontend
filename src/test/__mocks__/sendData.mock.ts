export const sendDataMock = async (
    url: string,
    method: 'POST' | 'PUT' | 'DELETE',
    data?: object
) => {
    return Promise.resolve({ error: false });
};