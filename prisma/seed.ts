import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    console.log(`Clear database ...`);

    await prisma.printer.deleteMany();
    await prisma.destination.deleteMany();
    await prisma.house.deleteMany();
    await prisma.printingJob.deleteMany();

    console.log(`Start seeding ...`);

    await createHouses();
    await createDestinations();
    await createPrinters();
    await createPrintingJobs();

    console.log(`Seeding finished.`);
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

async function createHouses() {
  for (let index = 0; index < 2; index++) {
    await prisma.house.create({
      data: {
        name: `House name ${index}`,
      },
    });
  }
}

async function createDestinations() {
  const houses = await prisma.house.findMany();
  for (let index = 0; index < 200; index++) {
    await prisma.destination.create({
      data: {
        houseId: index % 2 === 0 ? houses[0].id : houses[1].id,
        name: `00${index}_0${index}`,
        description: `Destination 00${index}_0${index}`,
        enabled: index % 2 === 0,
        location: index % 2 === 0 ? 'Test (Retail Tech)' : 'WVZ Homburg',
        // printers:
      },
    });
  }
}

async function createPrinters() {
  for (let index = 0; index < 200; index++) {
    await prisma.printer.create({
      data: {
        name: `ETI_0${index}_SATO_${index}`,
        description: `Etikettendrucker SATO (CT${index}-LX)`,
        enabled: index % 2 === 0,
        activePaperId: index,
        dataFormat: index % 2 === 0 ? 'SBPL' : 'STCL',
        location: index % 2 === 0 ? 'Retail Tech, Tower 10. OG' : 'WVZ Homburg',
        model: index % 2 === 0 ? '' : 'SATO CT4-LX',
        serialNumber: index % 2 === 0 ? `EC${index}` : '',
        comment: '',
        // destinationId:
        // destination: ""
      },
    });
  }
}

async function createPrintingJobs() {
  for (let index = 0; index < 200; index++) {
    await prisma.printingJob.create({
      data: {
        status: index % 2 === 0,
        counter: `counter-${index}`,
        paperType: `papertype-${index}`,
        timeStarted: '2022.10.17',
      },
    });
  }
}

void main();
