export async function POST(request: Request) {
  let body = {};
  try {
    body = await request.json();
  } catch (e) {
    return new Response("Invalid JSON body", { status: 400 });
  }

  return Response.json(body);
}
