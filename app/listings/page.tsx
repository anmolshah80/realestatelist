'use client';

import { useEffect, useState } from 'react';

import { parseCSVFile } from '@/lib/utils';

const ListingsPage = () => {
  const [parsedCSVData, setParsedCSVData] = useState<Record<string, any>[]>([]);

  const CSV_FILE_PATH = '/data/zillow-properties-listing-information__new.csv';

  useEffect(() => {
    const fetchAndParseCSVFile = async () => {
      const csvFile = await fetch(CSV_FILE_PATH);

      console.log('csvFile: ', csvFile);

      if (!csvFile.ok)
        throw new Error(
          `HTTP error! Status: ${csvFile.status}\nFailed to find the specified CSV file`,
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
