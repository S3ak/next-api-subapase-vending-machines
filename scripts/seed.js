import "@dotenvx/dotenvx";
import { drizzle } from "drizzle-orm/node-postgres";
import {
  users,
  customers,
  products,
  vendingMachines,
  transactions,
} from "../app/libs/schema";
import { faker } from "@faker-js/faker";

const mockUsers = Array.from({ length: 10 }, () => ({
  id: faker.string.uuid(),
  name: faker.person.firstName(),
  email: faker.internet.email(),
  role: faker.helpers.arrayElement(["admin", "user"]),
  password: faker.internet.password(), // Remember to hash this before inserting into the database
}));

const mockCustomers = Array.from({ length: 10 }, () => ({
  id: faker.string.uuid(),
  name: faker.person.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password(), // Remember to hash this before inserting into the database
  phone: faker.phone.number(), // Remember to hash this before inserting into the database
}));

const mockProducts = Array.from({ length: 20 }, () => ({
  id: faker.string.uuid(),
  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  price: faker.commerce.price(),
}));

const mockVendingMachines = Array.from({ length: 5 }, () => ({
  id: faker.string.uuid(),
  location: faker.location.streetAddress(),
  products: products,
}));

const mockTransactions = Array.from({ length: 50 }, () => ({
  id: faker.string.uuid(),
  customerId: faker.helpers.arrayElement(customers).id,
  productId: faker.helpers.arrayElement(products).id,
  vendingMachineId: faker.helpers.arrayElement(vendingMachines).id,
  timestamp: faker.date.past(),
  isDeleted: faker.datatype.boolean(),
}));

const queryClient = postgres(process.env.DATABASE_URL || "");

async function main() {
  const db = drizzle(queryClient, {
    logger: true,
  });

  console.log("Seed start");

  await db.insert(users).values(mockUsers);
  await db.insert(products).values(mockProducts);
  await db.insert(customers).values(mockCustomers);
  await db.insert(vendingMachines).values(mockVendingMachines);
  await db.insert(transactions).values(mockTransactions);

  console.log("Seed done");
}

// Call main with your client
main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err
  );
});
