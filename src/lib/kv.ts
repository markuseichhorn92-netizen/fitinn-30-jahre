// Minimaler Zugriff auf Vercel KV / Upstash Redis über die REST-API (ohne Zusatzpaket).
// Variablen kommen automatisch, wenn im Vercel-Projekt unter „Storage“ ein Redis-Speicher verbunden ist.
const URL_ = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || '';
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || '';

export const kvEnabled = Boolean(URL_ && TOKEN);

// Mehrere Befehle in einem Aufruf, z. B. [['HINCRBY', 'k', 'f', '1'], ['EXPIRE', 'k', '100']].
export async function kvPipeline(cmds: (string | number)[][]): Promise<unknown[] | null> {
  if (!kvEnabled) return null;
  const res = await fetch(`${URL_}/pipeline`, {
    method: 'POST',
    headers: { authorization: `Bearer ${TOKEN}`, 'content-type': 'application/json' },
    body: JSON.stringify(cmds.map((c) => c.map(String))),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`KV ${res.status}`);
  const out = (await res.json()) as { result?: unknown; error?: string }[];
  return out.map((r) => (r.error ? null : r.result));
}
