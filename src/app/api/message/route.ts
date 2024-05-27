import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const geminiApiKey = process.env.GEMINI_API_KEY;
const geminiModel = process.env.GEMINI_MODEL;

if (!geminiApiKey || !geminiModel) {
    throw new Error("Gemini API key or model name is not defined in the environment variables.");
}

const genAI = new GoogleGenerativeAI(geminiApiKey);

export const GET = async (req: NextRequest) => {
  return NextResponse.json({ message: "hello" });
};

export const POST = async (req: NextRequest) => {
  const model = genAI.getGenerativeModel({ model: geminiModel });
  try {
    const { prompt } = await req.json();
    console.log(prompt);
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [
            {
              text: "hello",
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              text: "you are an ai",
            },
          ],
        },
      ],
      generationConfig: {
        maxOutputTokens: 100,
      },
    });
    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    const text = response.text();
    return NextResponse.json({ message: text });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
};
