import React from 'react';
import moment from 'moment';

const TrainStatusTable = ({ trains, platforms, currentTime }) => {
  const now = moment(currentTime, 'HH:mm');

  const getTrainsData = () => {
    return trains?.map(train => {
      // const arrivalTime = moment(train.scheduledArrival, 'HH:mm');
      // const departureTime = moment(train.scheduledDeparture, 'HH:mm');
      // const actualDepartureTime = moment(train.actualDeparture, 'HH:mm');
      
      const status = train.status;

      const platform = platforms.find(platform => platform.currentTrain && platform.currentTrain.trainNumber === train.trainNumber);

      return {
        ...train,
        status,
        platformNumber: platform ? platform.platformNumber : 'N/A'
      };
    });
  };


  const trainsData = getTrainsData();

  return (
    <div >
      <h2>Train Status</h2>
      <table className="train-table">
        <thead>
          <tr>
            <th>Train Number</th>
            <th>Status</th>
            <th>Platform</th>
            <th>Scheduled Arrival</th>
            <th>Actual Arrival</th>
          </tr>
        </thead>
        <tbody>
          {trainsData?.map(train => (
            <tr key={train.trainNumber}>
              <td>{train.trainNumber}</td>
              <td>{train.status}</td>
              <td>{train.platformNumber}</td>
              <td>{train.scheduledArrival}</td>
              <td>{train.actualArrival}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrainStatusTable;
