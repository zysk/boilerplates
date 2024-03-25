import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { NodeEnvironment } from '../common/config';

if (process.env.NODE_ENV == NodeEnvironment.Test) {
	config({ path: '.env.test' });
} else {
	config();
}

export const dataSourceOptions: DataSourceOptions = {
	type: 'postgres',
	host: process.env.DB_HOST,
	port: process.env.DB_PORT as unknown as number,
	username: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
	entities:
		process.env.NODE_ENV == NodeEnvironment.Test
			? ['src/**/*.entity.ts']
			: ['dist/**/*.entity.js'],
	migrations: ['dist/database/migrations/*.js'],
	logging: process.env.DB_LOGGING == 'true',
	ssl: process.env.DB_SSL == 'true'
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
