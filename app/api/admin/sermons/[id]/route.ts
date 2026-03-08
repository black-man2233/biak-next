import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();

  const sermon = await prisma.sermon.update({
    where: { id },
    data: {
      title: body.title,
      speaker: body.speaker,
      date: new Date(body.date),
      videoUrl: body.videoUrl || null,
      description: body.description || null,
    },
  });
  return NextResponse.json(sermon);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await prisma.sermon.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
