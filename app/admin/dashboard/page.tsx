import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { DashboardClient } from "./DashboardClient";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const [eventCount, announcementCount, sermonCount] = await Promise.all([
    prisma.event.count(),
    prisma.announcement.count({ where: { isActive: true } }),
    prisma.sermon.count(),
  ]);

  const upcomingEvents = await prisma.event.findMany({
    where: { date: { gte: new Date() } },
    orderBy: { date: "asc" },
    take: 5,
  });

  const serialized = upcomingEvents.map((e) => ({
    ...e,
    date: e.date.toISOString(),
    endDate: e.endDate?.toISOString() ?? null,
    createdAt: e.createdAt.toISOString(),
    updatedAt: e.updatedAt.toISOString(),
  }));

  return (
    <DashboardClient
      stats={{ eventCount, announcementCount, sermonCount }}
      upcomingEvents={serialized}
      userName={session.user?.name ?? "Admin"}
    />
  );
}
