import { NextRequest, NextResponse } from "next/server";

// Endpoint de diagnóstico para listar modelos disponibles
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const version = searchParams.get("v") || "v1beta";

  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) {
    return NextResponse.json(
      { error: "GEMINI_API_KEY no configurada" },
      { status: 500 },
    );
  }

  try {
    const url = `https://generativelanguage.googleapis.com/${version}/models?key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { version, error: data },
        { status: response.status },
      );
    }

    const models = (data.models || []).map(
      (m: { name: string; supportedGenerationMethods?: string[] }) => ({
        name: m.name,
        methods: m.supportedGenerationMethods,
      }),
    );

    return NextResponse.json({ version, count: models.length, models });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
