export const getJson = async (url: string) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw Error(`Fetch failed for ${url}`);
        }
        const jsonData = await response.json();
        return { data: jsonData };
    } catch (error) {
        return { error: error };
    }
};
