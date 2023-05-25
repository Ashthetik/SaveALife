/**
 * Data Model Interfaces
 */
import { User } from "../interfaces/DTO/user.dto";
import DatabaseHandler from "../database/data.handler";
const db = new DatabaseHandler();
/**
 * Service Methods
 */
export const findAll = async (): Promise<User[]> => {
	return await new Promise(async (res, rej) => {
		const users = await db.selectAll('users');

		if (users) {
			res(users);
		}
		else {
			rej(
				{
					status: 404,
					message: 'No users found'
				}
			);
		}
	});
};

export const find = async (id: string): Promise<User> => {
	return await new Promise(async (res, rej) => {
		const users = await db.select('users', { id });

		if (users) {
			res(users);
		}
		else {
			rej(
				{
					status: 404,
					message: 'No users found'
				}
			);
		}
	});
};

export const create = async (newUser: User): Promise<User> => {
	return await new Promise(async (res, rej) => {
		const users = await db.insert('users', newUser);

		if (users) {
			res(newUser);
		}
		else {
			rej(
				{
					status: 404,
					message: 'No users found'
				}
			);
		}
	});
}

export const update = async (id: string, userUpdate: User): Promise<User> => {
	return await new Promise(async (res, rej) => {
		const users = await db.update('users', userUpdate, { id });

		if (users) {
			res(userUpdate);
		}
		else {
			rej(
				{
					status: 404,
					message: 'No users found'
				}
			);
		}
	});
};

export const remove = async (id: string): Promise<boolean> => {
	return await new Promise(async (res, rej) => {
		const users = await db.delete('users', { id });

		if (users) {
			res(users);
		}
		else {
			rej(
				{
					status: 404,
					message: 'No users found'
				}
			);
		}
	});
};
