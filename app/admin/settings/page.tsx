import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { SettingsClient } from "./SettingsClient";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const info = await prisma.churchInfo.findMany();
  const infoMap: Record<string, string> = {};
  info.forEach((i) => { infoMap[i.key] = i.value; });

  return <SettingsClient info={infoMap} userEmail={session.user?.email ?? ""} />;
}
