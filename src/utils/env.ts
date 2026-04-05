/**
 * Environment variable validation
 * Ensures all required VITE_ env variables are present at runtime
 */

const requiredEnvVars = ['VITE_GEOCODING_API_KEY'] as const;

const missingVars = requiredEnvVars.filter(
	(envVar) => !import.meta.env[envVar]
);

if (missingVars.length > 0) {
	console.error(
		`❌ Missing required environment variables: ${missingVars.join(', ')}`
	);
	console.error(
		'Please create a .env file with the following variables:'
	);
	missingVars.forEach((varName) => {
		console.error(`  ${varName}=your_value_here`);
	});
}

export const env = {
	GEOCODING_API_KEY: import.meta.env.VITE_GEOCODING_API_KEY || '',
};
