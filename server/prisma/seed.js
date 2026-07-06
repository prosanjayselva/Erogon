import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashed = await bcrypt.hash('Admin@123', 10);

  await prisma.user.upsert({
    where: { email: 'admin@ergonfoundation.org' },
    update: {},
    create: {
      email: 'admin@ergonfoundation.org',
      password: hashed,
      name: 'ERGON Admin',
    },
  });

  console.log('Seed complete — admin user created');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
