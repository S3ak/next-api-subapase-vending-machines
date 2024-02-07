import { API_RESPONSE_MESSAGES } from "../../libs/constants";
import supabase from "../../libs/supabase";

const client = supabase;

/**
 * Retrieves the latest products from the database. This is the preferred method for retrieving products.
 *
 * @param count2 number of products to retrieve. Default is 30.
 * @param client The Supabase client to use for the database query.
 * @returns An object containing a success message and the retrieved products.
 * @throws An error if there was an issue retrieving the products.
 */
export async function getLatestProducts(count = 30) {
  const maxCount = Math.min(count, 100);
  const pageNumber = 1;
  const offset = (pageNumber - 1) * maxCount;

  let { data: products, error } = await client
    .from("products")
    .select("*")
    .range(offset, maxCount);

  if (error) throw error;

  return {
    message: `${API_RESPONSE_MESSAGES.success.read} products`,
    data: products,
  };
}

/**
 * Creates a new product in the database.
 *
 * @param product - The product object containing the name, description, and price of the product.
 * @param options - Optional parameters for the createProduct function.
 * @param options.client - The Supabase client to use for the database operations. Defaults to the global supabase client.
 * @returns A promise that resolves to an object containing the success message and the created product data.
 * @throws If there is an error during the database operation.
 */
export async function createProduct(product: Product) {
  try {
    const { data, error } = await client
      .from("products")
      .insert([
        {
          id: crypto.randomUUID(),
          name: product.name,
          description: product.description,
          price: product.price,
        },
      ])
      .select(); // Add a type assertion to 'any' to bypass the type checking.

    if (error) throw error;

    return {
      message: `${API_RESPONSE_MESSAGES.success.create} product`,
      data,
    };
  } catch (error) {
    throw error;
  }
}

/**
 * Retrieves all products from the database.
 *
 * @param {Object} options - The options for retrieving products.
 * @param {Object} options.client - The Supabase client instance. Defaults to the global client.
 * @param {boolean} options.isAdmin - Indicates whether the user is an admin. Defaults to false.
 * @returns {Promise<Object>} - A promise that resolves to an object containing the message and data.
 * @throws {Error} - If the user is not authorized or if there is a database error.
 */
export async function _getAllProducts({ client = supabase, isAdmin = false }) {
  try {
    if (!isAdmin) {
      throw new Error(API_RESPONSE_MESSAGES.unauthorized);
    }

    // The client.from("products") line is specifying the "products" table from which the data should be fetched.

    // The .select("*") method is used to specify which columns to fetch from the table. The asterisk (*) is a wildcard that means "all columns".

    // The .range(offset, maxCount) method is used to limit the number of rows fetched from the table. It fetches rows starting from the offset index up to the maxCount index. This is useful for implementing pagination in your application.

    // The await keyword is used to pause the execution of the function until the Promise returned by client.from("products").select("*").range(offset, maxCount) is either resolved or rejected. This is necessary because fetching data from a database is an asynchronous operation that can take some time to complete.

    // The result of the operation is an object that contains data and error properties. The data property contains the fetched data if the operation was successful, and the error property contains an error message if the operation failed.

    // The { data: products, error } syntax is using destructuring assignment to extract the data and error properties from the result object into separate variables. The data: products part is renaming data to products for clarity, since the fetched data represents products.
    let { data: products, error } = await client.from("products").select("*");
    if (error) throw error;

    return {
      message: `${API_RESPONSE_MESSAGES.success.read} products`,
      data: products,
    };
  } catch (error) {
    return { message: "Database Error: Failed to retreive products" };
  }
}
