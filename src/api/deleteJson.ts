export const deleteJson = async (url: string) => {
    const response = await fetch(url, {
        method: 'DELETE',
    });
    return response;
};
