import { API_RESPONSE_MESSAGES } from "../../libs/constants";
import supabase from "../../libs/supabase";

export async function getAllProducts() {
  try {
    let { data: products, error } = await supabase.from("products").select("*");
    if (error) throw error;

    return {
      message: `${API_RESPONSE_MESSAGES.success.read} products`,
      data: products,
    };
  } catch (error) {
    return { message: "Database Error: Failed to retreive products" };
  }
}

export async function getLatestProducts(count = 5) {
  const maxCount = Math.min(count, 100);
  const pageNumber = 1;
  const offset = (pageNumber - 1) * maxCount;

  let { data: products, error } = await supabase.from("products").select("*");

  if (error) throw error;

  return {
    message: `${API_RESPONSE_MESSAGES.success.read} products`,
    data: products,
  };
}

export async function createProduct(product: Product) {
  try {
    const { data, error } = await supabase
      .from("products")
      .insert([
        {
          id: crypto.randomUUID(),
          name: product.name,
          description: product.description,
          price: product.price,
        },
      ] as any)
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
