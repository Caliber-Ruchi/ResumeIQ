import { GoogleGenAI } from "@google/genai";
import { RESUME_REVIEW_PROMPT } from "./prompts";

export async function reviewResume(resumeText) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing.");
  }

  const ai = new GoogleGenAI({
    apiKey,
  });

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `
${RESUME_REVIEW_PROMPT}

Resume:

${resumeText}
`,
    config: {
      temperature: 0.2,
    },
  });

  console.log("========== RAW GEMINI RESPONSE ==========");
  console.log(response.text);
  console.log("=========================================");

  const text = response.text?.trim();

  if (!text) {
    throw new Error("Gemini returned an empty response.");
  }

  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  try {
    const result = JSON.parse(cleaned);

    const levelMap = {
      "Entry-Level": "Junior",
      Entry: "Junior",
      Beginner: "Fresher",
    };

    if (result.experienceLevel) {
      result.experienceLevel =
        levelMap[result.experienceLevel] ?? result.experienceLevel;
    }

    result.summary =
      result.summary?.trim() ||
      `This resume demonstrates ${
        result.experienceLevel?.toLowerCase() || "professional"
      } experience with an overall score of ${
        result.overallScore ?? "N/A"
      }/100. The candidate shows a solid technical foundation but should address the identified weaknesses to improve interview readiness.`;

    return result;
  } catch (err) {
    console.error("Invalid JSON returned by Gemini:");
    console.error(cleaned);
    throw new Error("Gemini returned invalid JSON.");
  }
}