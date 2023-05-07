export const getJsonMock = async (url: string) => {
    if (url === 'http://localhost:8080/team') {
        return Promise.resolve({ data: [] });
    }
    return Promise.resolve({ data: []});
};
