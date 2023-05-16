import { Sequelize } from "sequelize";

const {
	DATABASE_HOST,
	DATABASE_NAME,
	DATABASE_USERNAME,
	DATABASE_PASSWORD,
} = process.env;

export default class DatabaseHandler {
	private static instance: DatabaseHandler;
	private sql_memory: Sequelize;
	private sequelize: Sequelize;

	constructor() {
		this.sql_memory = new Sequelize({
			dialect: 'sqlite',
			storage: 'memory/database.sqlite'
		});
		this.sequelize = new Sequelize(DATABASE_NAME as string, DATABASE_USERNAME as string, DATABASE_PASSWORD as string, {
			host: DATABASE_HOST,
			dialect: 'mysql'
		});
			
		new Promise<void>((res, rej) => {
			this.sql_memory.authenticate()
				.then(() => {
					console.log('[INFO] [SQLite] Connection has been established successfully.');
					res();
				})
				.catch(err => {
					console.error('[ERRO] [SQLite] Unable to connect to the database:', err);
					rej();
				});

			this.sequelize.authenticate()
				.then(() => {
					console.log('[INFO] [MySQL] Connection has been established successfully.');
					res();
				})
				.catch((err) => {
					console.error('[ERRO] [MySQL] Unable to connect to the database:', err);
				});
		});
	}

	public static getInstance(): DatabaseHandler {
		if (!DatabaseHandler.instance) {
			DatabaseHandler.instance = new DatabaseHandler();
		}

		return DatabaseHandler.instance;
	}

	public getSqlMemory(): Sequelize {
		return this.sql_memory;
	}

	public getSequelize(): Sequelize {
		return this.sequelize;
	}

	public createTable(tableName: string, attributes: any): boolean {
		try {
			this.sequelize.getQueryInterface().createTable(tableName, attributes);
			this.sql_memory.getQueryInterface().createTable(tableName, attributes);

			console.log(`[INFO] [MySQL] Table ${tableName} created successfully.`);
			console.log(`[INFO] [SQLite] Table ${tableName} created successfully.`);

			return true;
		}
		catch (err: any) {
			console.error(`[ERRO] [MySQL] Unable to create table ${tableName}: ${err}`);
			console.error(`[ERRO] [SQLite] Unable to create table ${tableName}: ${err}`);

			return false;
		}
	}

	public dropTable(tableName: string): boolean {
		try {
			this.sequelize.getQueryInterface().dropTable(tableName);
			this.sql_memory.getQueryInterface().dropTable(tableName);

			console.log(`[INFO] [MySQL] Table ${tableName} dropped successfully.`);
			console.log(`[INFO] [SQLite] Table ${tableName} dropped successfully.`);

			return true;
		}
		catch (err: any) {
			console.error(`[ERRO] [MySQL] Unable to drop table ${tableName}: ${err}`);
			console.error(`[ERRO] [SQLite] Unable to drop table ${tableName}: ${err}`);

			return false;
		}
	}

	public async insert(tableName: string, data: any): Promise<boolean> {
		try {
			await this.sequelize.getQueryInterface().bulkInsert(tableName, data);
			await this.sql_memory.getQueryInterface().bulkInsert(tableName, data);

			console.log(`[INFO] [MySQL] Data inserted successfully.`);
			console.log(`[INFO] [SQLite] Data inserted successfully.`);

			return true;
		}
		catch (err: any) {
			console.error(`[ERRO] [MySQL] Unable to insert data: ${err}`);
			console.error(`[ERRO] [SQLite] Unable to insert data: ${err}`);

			return false;
		}
	}

	public async update(tableName: string, data: any, where: any): Promise<boolean> {
		try {
			await this.sequelize.getQueryInterface().bulkUpdate(tableName, data, where);
			await this.sql_memory.getQueryInterface().bulkUpdate(tableName, data, where);

			console.log(`[INFO] [MySQL] Data updated successfully.`);
			console.log(`[INFO] [SQLite] Data updated successfully.`);

			return true;
		}
		catch (err: any) {
			console.error(`[ERRO] [MySQL] Unable to update data: ${err}`);
			console.error(`[ERRO] [SQLite] Unable to update data: ${err}`);

			return false;
		}
	}

	public async delete(tableName: string, where: any): Promise<boolean> {
		try {
			await this.sequelize.getQueryInterface().bulkDelete(tableName, where);
			await this.sql_memory.getQueryInterface().bulkDelete(tableName, where);

			console.log(`[INFO] [MySQL] Data deleted successfully.`);
			console.log(`[INFO] [SQLite] Data deleted successfully.`);

			return true;
		}
		catch (err: any) {
			console.error(`[ERRO] [MySQL] Unable to delete data: ${err}`);
			console.error(`[ERRO] [SQLite] Unable to delete data: ${err}`);

			return false;
		}
	}

	public async select(tableName: string, where: any): Promise<any> {
		try {
			const result = await this.sequelize.getQueryInterface().select(null, tableName, { where });
			await this.sql_memory.getQueryInterface().select(null, tableName, { where });

			console.log(`[INFO] [MySQL] Data selected successfully.`);
			console.log(`[INFO] [SQLite] Data selected successfully.`);

			return result;
		}
		catch (err: any) {
			console.error(`[ERRO] [MySQL] Unable to select data: ${err}`);
			console.error(`[ERRO] [SQLite] Unable to select data: ${err}`);

			return null;
		}
	}

	public async selectAll(tableName: string): Promise<any> {
		try {
			const result = await this.sequelize.getQueryInterface().select(null, tableName, {});
			await this.sql_memory.getQueryInterface().select(null, tableName, {});

			console.log(`[INFO] [MySQL] Data selected successfully.`);
			console.log(`[INFO] [SQLite] Data selected successfully.`);

			return result;
		}
		catch (err: any) {
			console.error(`[ERRO] [MySQL] Unable to select data: ${err}`);
			console.error(`[ERRO] [SQLite] Unable to select data: ${err}`);

			return null;
		}
	}

	public async selectAllWhere(tableName: string, where: any): Promise<any> {
		try {
			const result = await this.sequelize.getQueryInterface().select(null, tableName, { where });
			await this.sql_memory.getQueryInterface().select(null, tableName, { where });

			console.log(`[INFO] [MySQL] Data selected successfully.`);
			console.log(`[INFO] [SQLite] Data selected successfully.`);

			return result;
		}
		catch (err: any) {
			console.error(`[ERRO] [MySQL] Unable to select data: ${err}`);
			console.error(`[ERRO] [SQLite] Unable to select data: ${err}`);

			return null;
		}
	}
}