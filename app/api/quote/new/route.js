import Quote from "@models/quote";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
  const { userId, quote, source, tag } = await request.json();

  try {
    await connectToDB();
    const newQuote = new Quote({ creator: userId, quote, source, tag });

    await newQuote.save();
    return new Response(JSON.stringify(newQuote), { status: 200 });
  } catch (error) {
    return new Response("Failed to create quote", { status: 500 });
  }
}