import pdf from "pdf-parse-new";

export async function extractResumeText(file) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const data = await pdf(buffer);

  return data.text;
}