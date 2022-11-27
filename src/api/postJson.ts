export const postJson = async (url: string, data: object) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw Error(`Fetch failed for ${url}`);
        }
        return { error: undefined };
    } catch (e) {
        return { error: e };
    }
};
