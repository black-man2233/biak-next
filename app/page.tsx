import { HeroSection } from "@/components/home/HeroSection";
import { MissionSection } from "@/components/home/MissionSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { EventsPreview } from "@/components/home/EventsPreview";
import { PastorsSection } from "@/components/home/PastorsSection";
import { CTASection } from "@/components/home/CTASection";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function getUpcomingEvents() {
  try {
    return await prisma.event.findMany({
      where: { date: { gte: new Date() } },
      orderBy: { date: "asc" },
      take: 3,
    });
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const events = await getUpcomingEvents();

  const serializedEvents = events.map((e) => ({
    ...e,
    date: e.date.toISOString(),
    endDate: e.endDate?.toISOString() ?? null,
    createdAt: e.createdAt.toISOString(),
    updatedAt: e.updatedAt.toISOString(),
  }));

  return (
    <>
      <HeroSection />
      <MissionSection />
      <ServicesSection />
      <EventsPreview events={serializedEvents} />
      <PastorsSection />
      <CTASection />
    </>
  );
}
