// run this by ts-node(npm install -g ts-node)
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query', 'info'],
  // log: [
  //   { emit: 'event', level: 'query' },
  //   { emit: 'stdout', level: 'error' },
  //   { emit: 'stdout', level: 'info' },
  //   { emit: 'stdout', level: 'warn' },
  // ],
});
// prisma.$on('query', (e) => {
//   console.log('Query: ' + e.query);
//   console.log('Params: ' + e.params);
//   console.log('Duration: ' + e.duration + 'ms');
// });
async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'admin',
      nickname: 'administer',
      phone: '',
      email: 'jayce@example.com',
      password: '1234',
      avatar:
        'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/850.jpg',
    },
  });
  console.log('[user]: ', user);
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
