import React from 'react';
import { useCSVReader } from 'react-papaparse';
import moment from 'moment';


const UploadCSV = ({ onFileLoaded }) => {
  const { CSVReader } = useCSVReader();

  const handleOnDrop = (data) => {    
    const parsedData = data.data.slice(1)
      .filter(row => row.length > 0 && row[0] && row[1] && row[2] && row[3]) 
      .map(row => {
      const arrivalTime = row[1];
      const departureTime = row[2];
      
      if (moment(departureTime, 'HH:mm').isBefore(moment(arrivalTime, 'HH:mm'))) {
        console.log(`Invalid record: Departure time ${departureTime} is before arrival time ${arrivalTime} for train ${row[0]}`);
        return null; 
      }
      
      return {
        trainNumber: row[0],
        scheduledArrival: row[1],
        scheduledDeparture: row[2],
        priority: row[3],
        actualArrival: row[1],
        actualDeparture: row[2],
        status: "Not arrived"
      };
    }).filter(record => record !== null); 

    console.log("parsedData testing :", JSON.stringify(parsedData));
    onFileLoaded(parsedData);
  };

  const handleOnError = (err) => {
    console.error(err);
  };

  const handleOnRemoveFile = () => {
    console.log('File removed');
  };

  return (
    <CSVReader
      onUploadAccepted={handleOnDrop}
      onError={handleOnError}
      addRemoveButton
      onRemoveFile={handleOnRemoveFile}
    >
      {({ getRootProps, acceptedFile, ProgressBar, getRemoveFileProps }) => (
        <div>
          <div {...getRootProps()} style={{ border: '1px dashed #ccc', padding: '20px', textAlign: 'center' }}>
            {acceptedFile ? acceptedFile.name : 'Drop CSV file here or click to upload'}
          </div>
          <ProgressBar />
          {acceptedFile && <button {...getRemoveFileProps()}>Remove</button>}
        </div>
      )}
    </CSVReader>
  );
};

export default UploadCSV;
