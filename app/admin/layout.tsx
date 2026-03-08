import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const isLoginPage = false; // handled by middleware

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {session && <AdminSidebar />}
      <div className={`flex-1 ${session ? "lg:ml-64" : ""}`}>{children}</div>
    </div>
  );
}
