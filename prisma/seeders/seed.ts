import 'dotenv/config';
import { PrismaClient, Prisma } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import Papa from 'papaparse';
import fs from 'fs/promises';
import path from 'path';

import { CSV_FILE_NAME } from '@/lib/constants';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

const parseCSVFile = (
  content: string,
): Promise<Prisma.PropertyListingCreateInput[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse<Prisma.PropertyListingCreateInput>(content, {
      header: true,
      skipEmptyLines: true,
      error: (error: Error) => {
        console.error(`Error importing the CSV file: ${error.message}`);

        reject(error);
      },
      complete: async (results) => {
        const {
          meta: { fields },
          data: propertyListingsData,
        } = results;

        if (!fields || fields.length === 0) return;

        resolve(propertyListingsData);
      },
    });
  });
};

const main = async () => {
  console.log('\nStart seeding records into database...\n');

  try {
    const resolvedPath = path.join(process.cwd(), 'public/data', CSV_FILE_NAME);

    const fileContents = await fs.readFile(resolvedPath, { encoding: 'utf8' });

    if (fileContents.length === 0)
      throw new Error('The specified CSV file is empty');

    const propertyListings = await parseCSVFile(fileContents);

    for (const listing of propertyListings) {
      const result = await prisma.propertyListing.create({
        data: listing,
      });

      console.log(`Created property listing with ID: ${result.id}`);
    }

    console.log('\nFinished seeding records...');
  } catch (error) {
    console.error('Seeding failed: ', error);
  }
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);

    await prisma.$disconnect();
    process.exit(1);
  });
