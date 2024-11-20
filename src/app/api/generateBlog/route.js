import { NextResponse } from "next/server";
import { configure, generateText } from "google-generativeai";

const API_KEY = "YOUR_GOOGLE_API_KEY";

export async function POST(request) {
  try {
    const { transcript } = await request.json();

    configure({ apiKey: API_KEY });

    const response = await generateText({
      model: "gemini-1.5", // Replace with the latest model
      prompt: `Create a blog post from the following transcript:\n\n${transcript}`,
    });

    return NextResponse.json({ blog: response.result });
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate blog post" }, { status: 500 });
  }
}
