import Papa, { LocalFile } from 'papaparse';

const parseCSVFile = (
  file: string | LocalFile,
  setParsedCSVData: React.Dispatch<React.SetStateAction<Record<string, any>[]>>,
) => {
  Papa.parse<Record<string, any>[]>(file, {
    header: true,
    error: (error: Error) => {
      console.error(`Error importing the CSV file: ${error.message}`);
    },
    complete: (results) => {
      const {
        meta: { fields },
      } = results;

      if (!fields || fields.length === 0) return;

      setParsedCSVData(results.data);

      console.log('parsed csv data: ', results.data);

      // store data in the postgres database
    },
  });
};

export { parseCSVFile };
