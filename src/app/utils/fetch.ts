export async function fetchData<T>(url: string, options?: RequestInit): Promise<T> {
    const defaultOptions: RequestInit = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    };

    try {
        const response = await fetch(url, { ...defaultOptions, ...options });

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
        }

        return response.json() as Promise<T>;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}
