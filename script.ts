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
  const TEST_USERID = 'cf2de9ea-fd01-4c0b-bdad-43da5359fe12';
  await prisma.tag.deleteMany();
  await prisma.column.deleteMany();
  await prisma.category.deleteMany();

  await prisma.user.deleteMany();
  await prisma.user.create({
    data: {
      userid: TEST_USERID,
      name: 'admin',
      nickname: 'administer',
      phone: '13407135362',
      email: 'admin@example.com',
      password: 'ant.design',
      avatar:
        'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/850.jpg',
    },
  });

  await prisma.tag.createMany({
    data: [
      {
        name: '测试tag01',
        visible: true,
        userid: TEST_USERID,
      },
      {
        name: '测试tag02',
        visible: true,
        userid: TEST_USERID,
      },
      {
        name: '测试tag03',
        visible: true,
        userid: TEST_USERID,
      },
    ],
  });

  await prisma.column.createMany({
    data: [
      {
        name: '测试专栏01',
        description: '这是一个专栏的描述01',
        userid: TEST_USERID,
        visible: true,
      },
      {
        name: '测试专栏02',
        description: '这是一个专栏的描述02',
        userid: TEST_USERID,
        visible: true,
      },
    ],
  });

  await prisma.category.createMany({
    data: [
      {
        name: '测试分类01',
        description: '测试分类的描述01',
        visible: true,
        userid: TEST_USERID,
      },
      {
        name: '测试分类02',
        description: '测试分类的描述02',
        visible: true,
        userid: TEST_USERID,
      },
      {
        name: '测试分类03',
        description: '测试分类的描述03',
        visible: true,
        userid: TEST_USERID,
      },
    ],
  });
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
