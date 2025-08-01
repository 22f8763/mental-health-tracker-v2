import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { title } = await req.json();

    if (!title) {
      return NextResponse.json({ error: "Title is required." }, { status: 400 });
    }

    const prompt = `
You are a blog content writer for a health and wellness blog.

Generate a short blog post based on this title: "${title}"

Include:
- A short engaging intro paragraph
- 3 bullet points or tips
- A closing sentence
- Use clean markdown-like plain text (with ### for headings and - for bullets)
`;

    const geminiRes = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyALfbDAwEltpZzdSA0Q0QTMat9sS7g1E5Q",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    const data = await geminiRes.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      return NextResponse.json({ error: "Failed to generate content." }, { status: 500 });
    }

    return NextResponse.json({ title, content: text });
  } catch (err) {
    console.error("Gemini API error:", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
