import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  let body: any = {};
  try {
    body = await request.json();
  } catch (e) {
    return new Response("Invalid JSON body", { status: 400 });
  }

  try {
    await prisma.gymVisit.create({
      data: {
        checkIn: new Date(),
        latitude: Number(body.latitude),
        longitude: Number(body.longitude),
        address: body.address,
      },
    });
  } catch (e) {
    return new Response("Error creating visit", { status: 500 });
  }

  return Response.json(body);
}
