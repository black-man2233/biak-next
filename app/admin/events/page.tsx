import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminEventsClient } from "./AdminEventsClient";

export const dynamic = "force-dynamic";

export default async function AdminEventsPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const events = await prisma.event.findMany({ orderBy: { date: "desc" } });
  const serialized = events.map((e) => ({
    ...e,
    date: e.date.toISOString(),
    endDate: e.endDate?.toISOString() ?? null,
    createdAt: e.createdAt.toISOString(),
    updatedAt: e.updatedAt.toISOString(),
  }));

  return <AdminEventsClient events={serialized} />;
}
