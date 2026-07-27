import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const password = process.env.ADMIN_PASSWORD;
  if (!password || password.length < 8) {
    console.error('ADMIN_PASSWORD must be set in .env (min 8 characters)');
    process.exit(1);
  }

  await prisma.user.deleteMany();

  const hashed = await bcrypt.hash(password, 12);

  await prisma.user.create({
    data: {
      email: process.env.ADMIN_EMAIL || 'admin@ergonfoundation.org',
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
