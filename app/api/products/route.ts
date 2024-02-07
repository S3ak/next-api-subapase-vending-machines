import { getLatestProducts, createProduct } from "./actions";
export const dynamic = "force-dynamic"; // defaults to auto
import { API_RESPONSE_MESSAGES } from "../../libs/constants";

export async function GET(request: Request) {
  // const headers = new Headers();
  // headers.append("Content-Type", "application/json");
  // headers.append("API-Key", process.env.DATA_API_KEY || "");
  const count = Number(request.headers.get("count"));

  try {
    const res = await getLatestProducts(count, {});
    console.log("res", res);

    if (!res.data) throw new Error("No data found");

    return Response.json({
      message: res.message,
      data: res.data,
      count: res.data.length,
    });
  } catch (error) {
    return Response.json(API_RESPONSE_MESSAGES.error.read, { status: 400 });
  }
}

export async function POST(request: Request) {
  const payload = await request.json();

  try {
    const { data, message } = await createProduct(payload);

    if (!data) throw new Error("No data found");

    return Response.json({
      message: message,
      data,
    });
  } catch (error: Error) {
    console.warn("error in POST ????", error);

    return Response.json(
      `${API_RESPONSE_MESSAGES.error.create} ${error?.message}`,
      { status: 400 }
    );
  }
}
