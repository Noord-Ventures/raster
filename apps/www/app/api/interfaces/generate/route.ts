import { NextResponse } from "next/server";

const sizes = {
  poster: "1024x1536",
  square: "1024x1024",
  story: "1024x1536",
} as const;

const windows = new Map<string, { count: number; resetAt: number }>();

function allow(request: Request) {
  const now = Date.now();
  const address = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  const current = windows.get(address);
  if (!current || current.resetAt <= now) {
    if (windows.size > 5000) windows.clear();
    windows.set(address, { count: 1, resetAt: now + 10 * 60 * 1000 });
    return true;
  }
  if (current.count >= 3) return false;
  current.count += 1;
  return true;
}

export async function POST(request: Request) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return NextResponse.json({ error: "Image generation needs OPENAI_API_KEY." }, { status: 503 });
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host) {
    try {
      if (new URL(origin).host !== host) return NextResponse.json({ error: "Cross-site generation is not allowed." }, { status: 403 });
    } catch {
      return NextResponse.json({ error: "Cross-site generation is not allowed." }, { status: 403 });
    }
  }
  if (!allow(request)) {
    return NextResponse.json({ error: "Generation limit reached. Try again in ten minutes." }, { status: 429 });
  }
  const body = await request.json() as { prompt?: string; format?: keyof typeof sizes };
  const prompt = body.prompt?.trim().slice(0, 1200);
  const format = body.format && body.format in sizes ? body.format : "poster";
  if (!prompt) return NextResponse.json({ error: "Write a direction first." }, { status: 400 });

  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: { authorization: `Bearer ${key}`, "content-type": "application/json" },
    body: JSON.stringify({
      model: process.env.OPENAI_IMAGE_MODEL ?? "gpt-image-1",
      prompt: `${prompt}\nCreate an original finished graphic. Use a disciplined European modernist composition, clear hierarchy, and print-quality detail. Do not reproduce an existing artwork. No brand marks, signatures, or legible text.`,
      size: sizes[format],
      quality: "medium",
      n: 1,
    }),
    signal: AbortSignal.timeout(120_000),
  });
  const payload = await response.json() as { data?: Array<{ b64_json?: string; url?: string }>; error?: { message?: string } };
  if (!response.ok) return NextResponse.json({ error: payload.error?.message ?? "Image generation failed." }, { status: response.status });
  const result = payload.data?.[0];
  const image = result?.b64_json ? `data:image/png;base64,${result.b64_json}` : result?.url;
  if (!image) return NextResponse.json({ error: "The image service returned no output." }, { status: 502 });
  return NextResponse.json({ image });
}
