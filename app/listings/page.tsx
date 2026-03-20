'use client';

import { useEffect, useState } from 'react';

import { parseCSVFile } from '@/lib/utils';
import { CSV_FILE_PATH } from '@/lib/constants';

const ListingsPage = () => {
  const [parsedCSVData, setParsedCSVData] = useState<Record<string, any>[]>([]);

  useEffect(() => {
    const fetchAndParseCSVFile = async () => {
      const csvFile = await fetch(CSV_FILE_PATH);

      console.log('csvFile: ', csvFile);

      if (!csvFile.ok)
        throw new Error(
          `Failed to find the specified CSV file (status: ${csvFile.status})`,
        );

      const response = await csvFile.text();

      parseCSVFile(response, setParsedCSVData);
    };

    fetchAndParseCSVFile();
  }, []);

  console.log('parsedCSVData: ', parsedCSVData);

  return <div>ListingsPage</div>;
};

export default ListingsPage;
