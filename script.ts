import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      name: 'jay',
      phone: '13407135362',
      email: 'jayce@example.com',
      password: '123',
    },
  });
  const users = await prisma.user.findMany();
  console.log('[users]: ', users);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
