export function getStoredData<T = unknown>(key: string): T | null {
	const data = localStorage.getItem(key);
	if (!data) return null;
	try {
		return JSON.parse(data) as T;
	} catch {
		console.error(`Failed to parse stored data for key: ${key}`);
		return null;
	}
}
