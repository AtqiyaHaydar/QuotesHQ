import Quote from "@models/quote";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
  try {
    await connectToDB()

    const quotes = await Quote.find({}).sort({ createdAt: -1 }).populate('creator')

    return new Response(JSON.stringify(quotes), { status: 200 })
  } catch (error) {
    console.log("Failed to detch quots", error)
    return new Response("Failed to fetch all quote", { status: 500 })
  }
}