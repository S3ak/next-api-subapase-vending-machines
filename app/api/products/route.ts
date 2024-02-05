import { getLatestProducts, createProduct } from "./data";
export const dynamic = "force-dynamic"; // defaults to auto
import { Product } from "./definitions";

export async function GET(request: Request) {
  // const headers = new Headers();
  // headers.append("Content-Type", "application/json");
  // headers.append("API-Key", process.env.DATA_API_KEY || "");
  const count = Number(request.headers.get("count"));

  try {
    const res = await getLatestProducts(count);
    console.log("res", res);

    if (!res.data) throw new Error("No data found");

    return Response.json({
      message: res.message,
      data: res.data?.rows,
      count: res.data?.rowCount,
    });
  } catch (error) {
    return Response.json("Error", { status: 400 });
  }
}

export async function POST(request: Request) {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  // headers.append("API-Key", process.env.DATA_API_KEY || "");

  const data = await request.json();

  try {
    const res = await createProduct(data);
    if (!res.data) throw new Error("No data found");
    console.log("res", res);

    return Response.json({
      message: res.message,
      data: res.data?.rows,
    });
  } catch (error) {
    return Response.json("Error", { status: 400 });
  }
}
