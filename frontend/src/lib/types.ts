export type RegisterUser = {
	username: string;
	email: string;
	password: string;
};

export type LoginUser = {
	email: string;
	password: string;
};

export interface ProductProps {
	id: number;
	name: string;
	description?: string;
	category: string;
	price: number;
	image_url?: string;
}

export interface Product {
	id: number;
	name: string;
	description?: string;
	price: number;
	stock: number;
	category_id?: number;
	image_url?: string;
	average_rating?: number;
	reviews?: { rating: number; comment: string; username: string }[];
}

export interface FullProductProps extends Product {
	category: string;
}

export type CreateProduct = Omit<Product, "id">;

export type UpdateProduct = Partial<CreateProduct>;

export interface Category {
	id: number;
	name: string;
	description: string;
}
