import { Battery, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function run(): Promise<Battery> {
  const battery = prisma.battery;

  return battery.create({
    data: {
      name: 'Existing Battery',
    },
  });
}

run()
  .then(async () => {
    console.log('Successfully seeded database>>');
    await prisma.$disconnect();
  })
  .catch(async (error: Error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
