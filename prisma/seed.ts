import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash("admin123", 12);
  await prisma.user.upsert({
    where: { email: "admin@biak.dk" },
    update: {},
    create: {
      email: "admin@biak.dk",
      password: hashedPassword,
      name: "Admin",
      role: "admin",
    },
  });

  // Seed events
  const events = [
    {
      title: "Sunday Service",
      titleDa: "Søndagsgudstjeneste",
      description: "Join us every Sunday for worship, prayer, and the Word. Interpretation available in Danish, English, Swahili, and Spanish.",
      descriptionDa: "Kom og vær med til gudstjeneste. Tolkning tilgængelig på dansk, engelsk, swahili og spansk.",
      date: new Date("2026-03-10T10:30:00"),
      endDate: new Date("2026-03-10T12:30:00"),
      location: "Kirkevej 10, 9700 Brønderslev",
      category: "service",
      isRecurring: true,
      recurringDay: "Sunday",
      startTime: "10:30",
      endTime: "12:30",
    },
    {
      title: "Wednesday Prayer & Bible Study",
      titleDa: "Onsdag: Bøn og Bibelundervisning",
      description: "Midweek prayer and Bible study at the church hall.",
      descriptionDa: "Midtugsbøn og bibelundervisning.",
      date: new Date("2026-03-11T18:30:00"),
      endDate: new Date("2026-03-11T20:00:00"),
      location: "Kirkevej 12, 9700 Brønderslev",
      category: "prayer",
      isRecurring: true,
      recurringDay: "Wednesday",
      startTime: "18:30",
      endTime: "20:00",
    },
    {
      title: "Youth Night",
      titleDa: "Ungdomsmøde",
      description: "Monthly youth gathering — fun, worship, and connection for young people.",
      descriptionDa: "Månedligt ungdomsmøde — sjov, tilbedelse og fællesskab.",
      date: new Date("2026-03-20T18:00:00"),
      endDate: new Date("2026-03-20T20:00:00"),
      location: "Kirkevej 10, 9700 Brønderslev",
      category: "youth",
      isRecurring: false,
      startTime: "18:00",
      endTime: "20:00",
    },
  ];

  for (const event of events) {
    await prisma.event.create({ data: event });
  }

  // Seed church info
  const churchInfoItems = [
    { key: "church_name", value: "BIAK — Brønderslev International Apostolsk Kirke" },
    { key: "mission", value: "To Reveal God's Love & Demonstrate His Power" },
    { key: "vision", value: "Connect people to God and each other. Equip people to fulfill their God-given purpose. Empower the church to reach out locally and globally." },
    { key: "address", value: "Kirkevej 10, 9700 Brønderslev, Denmark" },
    { key: "email", value: "info@biak.dk" },
    { key: "phone", value: "+45 26 16 14 39" },
    { key: "facebook", value: "https://www.facebook.com/biakdk" },
    { key: "sunday_service_time", value: "10:30 – 12:30" },
    { key: "wednesday_time", value: "18:30 – 20:00" },
  ];

  for (const item of churchInfoItems) {
    await prisma.churchInfo.upsert({
      where: { key: item.key },
      update: { value: item.value },
      create: item,
    });
  }

  // Seed announcements
  await prisma.announcement.create({
    data: {
      title: "Live Stream Available",
      content: "Can't make it in person? Watch our Sunday services live on Facebook every week!",
      isActive: true,
    },
  });

  console.log("✅ Database seeded successfully");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
