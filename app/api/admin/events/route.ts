import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const events = await prisma.event.findMany({ orderBy: { date: "desc" } });
  return NextResponse.json(events);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const event = await prisma.event.create({
    data: {
      title: body.title,
      titleDa: body.titleDa || null,
      description: body.description,
      descriptionDa: body.descriptionDa || null,
      date: new Date(body.date),
      endDate: body.endDate ? new Date(body.endDate) : null,
      location: body.location,
      category: body.category || "general",
      startTime: body.startTime || null,
      endTime: body.endTime || null,
      isRecurring: body.isRecurring || false,
      recurringDay: body.recurringDay || null,
      imageUrl: body.imageUrl || null,
    },
  });
  return NextResponse.json(event, { status: 201 });
}
