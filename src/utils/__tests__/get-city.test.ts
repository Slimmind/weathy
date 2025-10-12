import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { getCity } from '../get-city';

// Mock fetch function
const mockFetch = vi.fn();

// Заменяем глобальный fetch на наш мок
globalThis.fetch = mockFetch;

describe('getCity', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('should return city name when API returns city', async () => {
		const mockResponse = {
			address: {
				city: 'Moscow',
				country: 'Russia',
			},
		};

		mockFetch.mockResolvedValueOnce({
			json: () => Promise.resolve(mockResponse),
			ok: true,
		});

		const result = await getCity(55.7558, 37.6176);

		expect(result).toBe('Moscow');
		expect(mockFetch).toHaveBeenCalledWith(
			'https://nominatim.openstreetmap.org/reverse?format=json&lat=55.7558&lon=37.6176'
		);
	});

	it('should return town name when city is not present', async () => {
		const mockResponse = {
			address: {
				town: 'Saint Petersburg',
				country: 'Russia',
			},
		};

		mockFetch.mockResolvedValueOnce({
			json: () => Promise.resolve(mockResponse),
			ok: true,
		});

		const result = await getCity(59.9343, 30.3351);

		expect(result).toBe('Saint Petersburg');
	});

	it('should return undefined when neither city nor town is present', async () => {
		const mockResponse = {
			address: {
				country: 'Russia',
			},
		};

		mockFetch.mockResolvedValueOnce({
			json: () => Promise.resolve(mockResponse),
			ok: true,
		});

		const result = await getCity(55.7558, 37.6176);

		expect(result).toBeUndefined();
	});

	it('should return undefined when fetch fails', async () => {
		mockFetch.mockRejectedValueOnce(new Error('Network error'));

		const result = await getCity(55.7558, 37.6176);

		expect(result).toBeUndefined();
	});

	it('should return undefined when response is not ok', async () => {
		mockFetch.mockResolvedValueOnce({
			json: () => Promise.resolve({}),
			ok: false,
		});

		const result = await getCity(55.7558, 37.6176);

		expect(result).toBeUndefined();
	});
});
