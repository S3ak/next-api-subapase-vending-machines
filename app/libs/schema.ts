import { relations } from "drizzle-orm";
import {
  pgEnum,
  pgTable,
  uuid,
  text,
  timestamp,
  boolean,
  integer,
  jsonb,
} from "drizzle-orm/pg-core";

export const keyStatus = pgEnum("key_status", [
  "expired",
  "invalid",
  "valid",
  "default",
]);
export const keyType = pgEnum("key_type", [
  "stream_xchacha20",
  "secretstream",
  "secretbox",
  "kdf",
  "generichash",
  "shorthash",
  "auth",
  "hmacsha256",
  "hmacsha512",
  "aead-det",
  "aead-ietf",
]);
export const aalLevel = pgEnum("aal_level", ["aal3", "aal2", "aal1"]);
export const factorType = pgEnum("factor_type", ["webauthn", "totp"]);
export const factorStatus = pgEnum("factor_status", ["verified", "unverified"]);
export const codeChallengeMethod = pgEnum("code_challenge_method", [
  "plain",
  "s256",
]);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().notNull(),
  name: text("name").notNull(),
  email: text("email"),
  role: text("role"),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
  password: text("password").notNull(),
});

// Represents a customer with basic contact information and password.
// Passwords should always be hashed and never stored in plain text.
export const customers = pgTable("customers", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  phone: text("phone"),
});

// Represents a product with its basic information and price.
export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  name: text("name").notNull(),
  description: text("description"),
  price: integer("price").notNull(),
});

// Represents a vending machine with its location and the products it contains.
export const vendingMachines = pgTable("vending_machines", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  location: text("location").notNull(),
  products: jsonb("products"), // This assumes that products will be stored as a JSON array in the database
});

export const vendingMachineRelations = relations(
  vendingMachines,
  ({ many }) => ({
    products: many(products),
  })
);

// Represents a transaction made by a customer.
// Includes the customer, product, and vending machine IDs, as well as a timestamp.
// Transactions can be marked as deleted but never actually removed.
export const transactions = pgTable("transactions", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  customerId: uuid("customer_id").references(() => customers.id),
  productId: uuid("product_id").references(() => products.id),
  vendingMachineId: uuid("vending_machine_id").references(
    () => vendingMachines.id
  ),
  timestamp: timestamp("timestamp").notNull(),
  isDeleted: boolean("is_deleted").default(false),
});

export const transactionsRelations = relations(transactions, ({ one }) => ({
  customer: one(customers),
  product: one(products),
  vendingMachine: one(vendingMachines),
}));

// Represents a group of vending machines.
// Vending machines in a group work in a daisy chain.
export const vendingMachineGroups = pgTable("vending_machine_groups", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  machines: jsonb("machines"),
});

export const vendingMachineGroupRelations = relations(
  vendingMachineGroups,
  ({ many }) => ({
    machines: many(vendingMachines),
  })
);
