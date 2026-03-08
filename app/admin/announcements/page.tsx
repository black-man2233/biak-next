import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AnnouncementsClient } from "./AnnouncementsClient";

export const dynamic = "force-dynamic";

export default async function AdminAnnouncementsPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const announcements = await prisma.announcement.findMany({ orderBy: { createdAt: "desc" } });
  const serialized = announcements.map((a) => ({
    ...a,
    createdAt: a.createdAt.toISOString(),
    updatedAt: a.updatedAt.toISOString(),
  }));

  return <AnnouncementsClient announcements={serialized} />;
}
