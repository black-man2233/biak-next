import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const sermons = await prisma.sermon.findMany({ orderBy: { date: "desc" } });
  return NextResponse.json(sermons);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const sermon = await prisma.sermon.create({
    data: {
      title: body.title,
      speaker: body.speaker,
      date: new Date(body.date),
      videoUrl: body.videoUrl || null,
      description: body.description || null,
    },
  });
  return NextResponse.json(sermon, { status: 201 });
}
