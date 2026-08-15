// Tracks real concurrent connections in memory via Server-Sent Events.
// Requires a single long-lived Node process (e.g. `next start`) — the count
// won't be accurate if this runs across multiple serverless instances at once.
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const encoder = new TextEncoder();
// Added <Uint8Array> for strict TypeScript safety
const clients = new Set<ReadableStreamDefaultController<Uint8Array>>();

function broadcast() {
  const payload = encoder.encode(`data: ${clients.size}\n\n`);
  for (const controller of clients) {
    try {
      controller.enqueue(payload);
    } catch {
      clients.delete(controller);
    }
  }
}

export async function GET() {
  let controllerRef: ReadableStreamDefaultController<Uint8Array>;
  let ping: ReturnType<typeof setInterval>;

  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      controllerRef = controller;
      clients.add(controller);
      broadcast();
      ping = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(": ping\n\n"));
        } catch {}
      }, 20000);
    },
    cancel() {
      clearInterval(ping);
      clients.delete(controllerRef);
      broadcast();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
