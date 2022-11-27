export const sendJson = async (
    url: string,
    method: 'POST' | 'PUT' | 'DELETE',
    data?: object
) => {
    try {
        const options = getOptions(method, data);

        const response = await fetch(url, options);
        if (!response.ok) {
            throw Error(`Fetch failed for ${url}`);
        }
        return { error: undefined };
    } catch (e) {
        return { error: e };
    }
};

function getOptions(method: string, data: object | undefined) {
    const options = {
        method,
        headers: { 'Content-Type': 'application/json' },
    };
    if (method !== 'DELETE' && data) {
        Object.assign(options, { body: JSON.stringify(data) });
    }
    Object.assign(options);
    return options;
}
