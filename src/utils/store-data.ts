export function storeData(key: string, data: any): void {
	localStorage.setItem(key, JSON.stringify(data));
}
