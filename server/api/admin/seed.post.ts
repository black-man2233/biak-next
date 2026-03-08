export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const sundays: Date[] = []
  const wednesdays: Date[] = []

  // Generate next 16 Sundays and Wednesdays from today
  for (let i = 0; sundays.length < 16 || wednesdays.length < 16; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    if (d.getDay() === 0 && sundays.length < 16) sundays.push(new Date(d))
    if (d.getDay() === 3 && wednesdays.length < 16) wednesdays.push(new Date(d))
  }

  const sundayEvents = sundays.map(date => ({
    title: 'Søndagsgudstjeneste / Sunday Service',
    description: 'Tilbedelse, bøn og forkyndelse. Tolkning på dansk, engelsk, swahili og spansk. / Worship, prayer and preaching. Interpretation in Danish, English, Swahili and Spanish.',
    date,
    startTime: '10:30',
    endTime: '12:00',
    location: 'Kirkevej 10, 9700 Brønderslev',
    category: 'service',
    imageUrl: null,
  }))

  const wednesdayEvents = wednesdays.map(date => ({
    title: 'Bøn & Bibelundervisning / Prayer & Bible Study',
    description: 'Midtugs-samling med fokus på bøn og fordybelse i Bibelen. / Midweek gathering focused on prayer and Bible study.',
    date,
    startTime: '18:30',
    endTime: '20:00',
    location: 'Kirkevej 12, 9700 Brønderslev',
    category: 'prayer',
    imageUrl: null,
  }))

  let created = 0
  for (const ev of [...sundayEvents, ...wednesdayEvents]) {
    // Check if event already exists on this date with this title
    const existing = await prisma.event.findFirst({
      where: {
        title: ev.title,
        date: {
          gte: new Date(ev.date.getFullYear(), ev.date.getMonth(), ev.date.getDate()),
          lt:  new Date(ev.date.getFullYear(), ev.date.getMonth(), ev.date.getDate() + 1),
        },
      },
    })
    if (!existing) {
      await prisma.event.create({ data: ev })
      created++
    }
  }

  return { ok: true, created }
})
