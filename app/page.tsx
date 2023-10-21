import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function getTodaysVisit() {
  const todayAtMidnight = new Date();
  todayAtMidnight.setHours(0, 0, 0, 0);

  const visit = await prisma.gymVisit.findFirst({
    where: {
      checkIn: {
        gte: todayAtMidnight,
      },
    },
    orderBy: {
      checkIn: "desc",
    },
  });

  return visit;
}

export default async function Home() {
  const visit = await getTodaysVisit();
  return (
    <main>
      <div className="flex flex-col items-center text-center">
        <div className="text-5xl">Did Taeuk go to the gym today?</div>
        <div>
          On {visit?.checkIn.toLocaleString()} at {visit?.address}
        </div>
      </div>
    </main>
  );
}
