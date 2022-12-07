import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: [
    { emit: 'event', level: 'query' },
    { emit: 'stdout', level: 'error' },
    { emit: 'stdout', level: 'info' },
    { emit: 'stdout', level: 'warn' },
  ],
});
prisma.$on('query', (e) => {
  console.log('Query: ' + e.query);
  console.log('Params: ' + e.params);
  console.log('Duration: ' + e.duration + 'ms');
});
async function main() {
  await prisma.user.deleteMany();
  await prisma.user.create({
    data: {
      name: 'admin',
      nickname: 'administer',
      phone: '13407135362',
      email: 'admin@example.com',
      password: 'ant.design',
      avatar:
        'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/850.jpg',
    },
  });
  const users = await prisma.user.findMany();
  console.log('[users]: ', users);
  // const account = '13407135362';
  // const password = 'ant.design';
  // const userExist = await prisma.user.findFirst({
  //   where: {
  //     OR: [
  //       {
  //         email: account,
  //       },
  //       {
  //         phone: account,
  //       },
  //     ],
  //   },
  // });
  // const userExist = await prisma.user.findFirst({
  //   where: {
  //     OR: [
  //       {
  //         email: account,
  //         password: password,
  //       },
  //       {
  //         phone: account,
  //         password: password,
  //       },
  //     ],
  //   },
  // });
  // console.log('[userExist]: ', userExist);
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
