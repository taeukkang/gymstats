import prisma from "@/lib/prisma";

export async function POST() {
  try {
    const activeVisit = await prisma.gymVisit.findFirst({
      where: {
        checkOut: null,
      },
      orderBy: {
        checkIn: "desc",
      },
    });

    if (!activeVisit) {
      return new Response("No active visit found", { status: 400 });
    }

    await prisma.gymVisit.update({
      where: {
        id: activeVisit.id,
      },
      data: {
        checkOut: new Date(),
      },
    });
  } catch (e) {
    return new Response("Error updating visit", { status: 500 });
  }

  return new Response(null, { status: 204 });
}
