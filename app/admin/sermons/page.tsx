import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminSermonsClient } from "./AdminSermonsClient";

export const dynamic = "force-dynamic";

export default async function AdminSermonsPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const sermons = await prisma.sermon.findMany({ orderBy: { date: "desc" } });
  const serialized = sermons.map((s) => ({
    ...s,
    date: s.date.toISOString(),
    createdAt: s.createdAt.toISOString(),
  }));

  return <AdminSermonsClient sermons={serialized} />;
}
