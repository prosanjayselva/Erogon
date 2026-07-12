import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const samples = [
  { type: 'CONTACT', message: 'New contact message from Priya Sharma' },
  { type: 'VOLUNTEER', message: 'New volunteer sign-up from Rahul Kumar' },
  { type: 'JOB_SEEKER', message: 'New job seeker profile from Ananya Patel' },
  { type: 'EMPLOYER', message: 'New employer requirement from Tech Corp India' },
  { type: 'NEWSLETTER', message: 'New newsletter subscriber: test@email.com' },
  { type: 'CONTACT', message: 'New contact message from Venkatesh G.' },
  { type: 'VOLUNTEER', message: 'New volunteer sign-up from Lakshmi Devi' },
];

async function seed() {
  for (const n of samples) {
    await prisma.notification.create({ data: n });
    console.log(`Created: ${n.message}`);
  }
  const count = await prisma.notification.count({ where: { read: false } });
  console.log(`\nTotal unread notifications: ${count}`);
  await prisma.$disconnect();
}

seed().catch((e) => { console.error(e); process.exit(1); });
