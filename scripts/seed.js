const { db } = require("@vercel/postgres");
const { faker } = require("@faker-js/faker");

const customers = Array.from({ length: 10 }, () => ({
  id: faker.string.uuid(),
  name: faker.person.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password(), // Remember to hash this before inserting into the database
}));

const products = Array.from({ length: 20 }, () => ({
  id: faker.string.uuid(),
  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  price: faker.commerce.price(),
}));

const vendingMachines = Array.from({ length: 5 }, () => ({
  id: faker.string.uuid(),
  location: faker.location.streetAddress(),
  products: products,
}));

const transactions = Array.from({ length: 50 }, () => ({
  id: faker.string.uuid(),
  customerId: faker.helpers.arrayElement(customers).id,
  productId: faker.helpers.arrayElement(products).id,
  vendingMachineId: faker.helpers.arrayElement(vendingMachines).id,
  timestamp: faker.date.past(),
  isDeleted: faker.datatype.boolean(),
}));

async function seedCustomers(client) {
  try {
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS customers (
        id UUID PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

    const insertedCustomers = await Promise.all(
      customers.map(
        (customer) =>
          client.sql`
        INSERT INTO customers (id, name, email, password)
        VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.password})
        ON CONFLICT (id) DO NOTHING;
      `
      )
    );

    return {
      createTable,
      customers: insertedCustomers,
    };
  } catch (error) {
    console.error("Error seeding customers:", error);
    throw error;
  }
}

async function seedProducts(client) {
  try {
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS products (
        id UUID PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        price NUMERIC(10, 2) NOT NULL
      );
    `;

    const insertedProducts = await Promise.all(
      products.map(
        (product) =>
          client.sql`
        INSERT INTO products (id, name, description, price)
        VALUES (${product.id}, ${product.name}, ${product.description}, ${product.price})
        ON CONFLICT (id) DO NOTHING;
      `
      )
    );

    return {
      createTable,
      products: insertedProducts,
    };
  } catch (error) {
    console.error("Error seeding products:", error);
    throw error;
  }
}

async function seedVendingMachines(client, products) {
  try {
    const creatTable = await client.sql`
      CREATE TABLE IF NOT EXISTS vending_machines (
        id UUID PRIMARY KEY,
        location TEXT NOT NULL
      );
    `;

    const creatTableJoin = await client.sql`
      CREATE TABLE IF NOT EXISTS vending_machine_products (
        vending_machine_id UUID REFERENCES vending_machines(id),
        product_id UUID REFERENCES products(id),
        PRIMARY KEY (vending_machine_id, product_id)
      );
    `;

    const insertedvendingMachines = await Promise.all(
      vendingMachines.map(async (machine) => {
        await client.sql`
        INSERT INTO vending_machines (id, location)
        VALUES (${machine.id}, ${machine.location})
        ON CONFLICT (id) DO NOTHING;
      `;

        await Promise.all(
          machine.products.map(
            (product) =>
              client.sql`
          INSERT INTO vending_machine_products (vending_machine_id, product_id)
          VALUES (${machine.id}, ${product.id})
          ON CONFLICT (vending_machine_id, product_id) DO NOTHING;
        `
          )
        );
      })
    );

    return {
      creatTable,
      creatTableJoin,
      vendingMachines: insertedvendingMachines,
    };
  } catch (error) {
    console.error("Error seeding vending machines:", error);
    throw error;
  }
}

async function seedTransactions(client, customers, products, vendingMachines) {
  try {
    const creatTable = await client.sql`
      CREATE TABLE IF NOT EXISTS transactions (
        id UUID PRIMARY KEY,
        customer_id UUID REFERENCES customers(id),
        product_id UUID REFERENCES products(id),
        vending_machine_id UUID REFERENCES vending_machines(id),
        timestamp TIMESTAMP NOT NULL,
        is_deleted BOOLEAN NOT NULL
      );
    `;

    const insertedTransactions = await Promise.all(
      transactions.map(
        (transaction) =>
          client.sql`
        INSERT INTO transactions (id, customer_id, product_id, vending_machine_id, timestamp, is_deleted)
        VALUES (${transaction.id}, ${transaction.customerId}, ${transaction.productId}, ${transaction.vendingMachineId}, ${transaction.timestamp}, ${transaction.isDeleted})
        ON CONFLICT (id) DO NOTHING;
      `
      )
    );

    return {
      creatTable,
      transactions: insertedTransactions,
    };
  } catch (error) {
    console.error("An error occurred while seeding transactions:", error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  const products = await seedProducts(client);
  const customers = await seedCustomers(client);
  const vendingMachines = await seedVendingMachines(client, products.products);
  await seedTransactions(
    client,
    customers.customers,
    products.products,
    vendingMachines.vendingMachines
  );
}

// Call main with your client
main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err
  );
});
