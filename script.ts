import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // await prisma.user.create({
  //   data: {
  //     name: 'admin',
  //     nickname: 'administer',
  //     phone: '13507135362',
  //     email: 'admin@example.com',
  //     password: 'ant.design',
  //   },
  // });
  // const users = await prisma.user.findMany();
  // console.log('[users]: ', users);
  const account = '13407135362';
  const userExist = await prisma.user.findFirst({
    where: {
      OR: [
        {
          email: account,
        },
        {
          phone: account,
        },
      ],
    },
  });
  console.log('[userExist]: ', userExist);
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
