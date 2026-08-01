export async function GET() {
  return new Response(JSON.stringify({ message: 'Hello from BotRoom!' }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}