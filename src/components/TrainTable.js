import React from 'react';

const TrainTable = ({ trains, modifySchedule }) => {
  const handleModifySchedule = (trainNumber) => {
    const newArrival = prompt("Enter new Actual arrival time (HH:mm):");
    const newDeparture = prompt("Enter new Actual departure time (HH:mm):");
    modifySchedule(trainNumber, newArrival, newDeparture);
  };

  return (
    <table className="train-table">
      <thead>
        <tr>
          <th>Train Number</th>
          <th>Priority</th>
          <th>Scheduled Arrival</th>
          <th>Actual Arrival</th>
          <th>Scheduled Departure</th>
          <th>Actual Departure</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {trains?.map(train => (
          <tr key={train.trainNumber}>
            <td>{train.trainNumber}</td>
            <td>{train.priority}</td>
            <td>{train.scheduledArrival}</td>
            <td>{train.actualArrival || 'N/A'}</td>
            <td>{train.scheduledDeparture}</td>
            <td>{train.actualDeparture || 'N/A'}</td>
            <td>{train.status}</td>
            <td>
              <button onClick={() => handleModifySchedule(train.trainNumber)}>Modify</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TrainTable;
