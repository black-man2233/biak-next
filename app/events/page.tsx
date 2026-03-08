import { prisma } from "@/lib/prisma";
import { EventsClient } from "./EventsClient";

export const dynamic = "force-dynamic";

async function getEvents() {
  try {
    return await prisma.event.findMany({
      orderBy: { date: "asc" },
    });
  } catch {
    return [];
  }
}

export default async function EventsPage() {
  const events = await getEvents();
  const serialized = events.map((e) => ({
    ...e,
    date: e.date.toISOString(),
    endDate: e.endDate?.toISOString() ?? null,
    createdAt: e.createdAt.toISOString(),
    updatedAt: e.updatedAt.toISOString(),
  }));

  return <EventsClient events={serialized} />;
}
