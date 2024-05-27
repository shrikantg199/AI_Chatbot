import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const GET = async (req: NextRequest) => {
  return NextResponse.json({ message: "hello" });
};
export const POST = async (req: NextRequest) => {
  const model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL });
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
