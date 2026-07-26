import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();

  const hashed = await bcrypt.hash('82rF_d2HR9', 10);

  await prisma.user.create({
    data: {
      email: 'ergonfoundation',
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
