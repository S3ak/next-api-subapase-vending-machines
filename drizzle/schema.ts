import { pgTable, pgEnum, uuid, text, integer, foreignKey, timestamp, boolean, jsonb } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"

export const keyStatus = pgEnum("key_status", ['expired', 'invalid', 'valid', 'default'])
export const keyType = pgEnum("key_type", ['stream_xchacha20', 'secretstream', 'secretbox', 'kdf', 'generichash', 'shorthash', 'auth', 'hmacsha256', 'hmacsha512', 'aead-det', 'aead-ietf'])
export const aalLevel = pgEnum("aal_level", ['aal3', 'aal2', 'aal1'])
export const factorType = pgEnum("factor_type", ['webauthn', 'totp'])
export const factorStatus = pgEnum("factor_status", ['verified', 'unverified'])
export const codeChallengeMethod = pgEnum("code_challenge_method", ['plain', 's256'])


export const customers = pgTable("customers", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	name: text("name").notNull(),
	email: text("email").notNull(),
	password: text("password").notNull(),
	phone: text("phone"),
});

export const products = pgTable("products", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	name: text("name").notNull(),
	description: text("description"),
	price: integer("price").notNull(),
});

export const transactions = pgTable("transactions", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	customerId: uuid("customer_id").references(() => customers.id),
	productId: uuid("product_id").references(() => products.id),
	vendingMachineId: uuid("vending_machine_id").references(() => vendingMachines.id),
	timestamp: timestamp("timestamp", { mode: 'string' }).notNull(),
	isDeleted: boolean("is_deleted").default(false),
});

export const users = pgTable("users", {
	id: uuid("id").primaryKey().notNull(),
	name: text("name").notNull(),
	email: text("email"),
	role: text("role"),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	password: text("password").notNull(),
});

export const vendingMachineGroups = pgTable("vending_machine_groups", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	machines: jsonb("machines"),
});

export const vendingMachines = pgTable("vending_machines", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	location: text("location").notNull(),
	products: jsonb("products"),
});