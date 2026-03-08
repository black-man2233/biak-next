import { prisma } from "@/lib/prisma";
import { SermonsClient } from "./SermonsClient";

export const dynamic = "force-dynamic";

async function getSermons() {
  try {
    return await prisma.sermon.findMany({ orderBy: { date: "desc" } });
  } catch {
    return [];
  }
}

export default async function SermonsPage() {
  const sermons = await getSermons();
  const serialized = sermons.map((s) => ({
    ...s,
    date: s.date.toISOString(),
    createdAt: s.createdAt.toISOString(),
  }));
  return <SermonsClient sermons={serialized} />;
}
