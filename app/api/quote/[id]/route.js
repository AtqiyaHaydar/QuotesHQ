import Quote from "@model/quote";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const quote = await Quote.findById(params.id).populate("creator")
    if (!quote) return new Response("Quote Not Found", { status : 404 })

    return new Response(JSON.stringify(quote), { status: 200 })

  } catch(error) {
    return new Response("Internal Server Error", { status: 500 })
  }
}

export const PATCH = async (request, { params }) => {
  const { quote, source, tag} = await request.json();

  try {
    await connectToDB();
    
    const existingQuote = await Quote.findById(params.id);

    existingQuote.quote = quote;
    existingQuote.source = source;
    existingQuote.tag = tag;

    await existingQuote.save();

    return new Response("Successfullt updated the Quote", { status: 200 })

  } catch(error) {
    return new Response("Error Updating Quote", { status: 500 })
  }
}

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    await Quote.findByIdAndDelete(params.id);

    return new Response("Quote deleted successfully", { status: 200 })
  
  } catch (error) {
    return new Response("Error deleting quote", { status: 500 })  
  }
}