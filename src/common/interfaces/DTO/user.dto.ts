import { BaseItem } from './default.dto';

export interface User extends BaseItem {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	api_keys: string[];
	createdAt: Date;
	id: string;
}