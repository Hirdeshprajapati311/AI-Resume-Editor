export async function enhanceText(text: string): Promise<string>{
  const res = await fetch("http://localhost:8000/ai-enhance", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  if (!res.ok) throw new Error("Failed to enhance text");

  const data = await res.json();
  return data.enhanced;
}

