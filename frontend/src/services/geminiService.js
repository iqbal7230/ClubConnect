import { GoogleGenerativeAI } from "@google/generative-ai";

const apikey= 'AIzaSyBiFSh1arfGoP6S0F6pYZRZJIacBWme4vM'
const genAI = new GoogleGenerativeAI(apikey);
// const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

export const generateResponse = async (prompt) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(`
      You are an event planning expert for university clubs. 
      Provide detailed, practical advice about: ${prompt}
      Focus on: budget management, team coordination, marketing, logistics, and student engagement.
    `);
    return await result.response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};