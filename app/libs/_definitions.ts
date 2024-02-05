/**
 * Represents a customer with basic contact information and password.
 * Passwords should always be hashed and never stored in plain text.
 */
type Customer = {
  id: number;
  name: string;
  email: string;
  password: string; // hashed, never store plain text passwords
};

/**
 * Represents a product with its basic information and price.
 */
type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
};

/**
 * Represents a vending machine with its location and the products it contains.
 */
type VendingMachine = {
  id: number;
  location: string;
  products: Product[];
};

/**
 * Represents a transaction made by a customer.
 * Includes the customer, product, and vending machine IDs, as well as a timestamp.
 * Transactions can be marked as deleted but never actually removed.
 */
type Transaction = {
  id: number;
  customerId: number;
  productId: number;
  vendingMachineId: number;
  timestamp: Date;
  isDeleted: boolean;
};

/**
 * Represents a group of vending machines.
 * Vending machines in a group work in a daisy chain.
 */
type VendingMachineGroup = {
  id: number;
  machines: VendingMachine[];
};
