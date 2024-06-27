import React, { useState } from 'react';
import UploadCSV from './UploadCSV';
import moment from 'moment';
import TrainTable from './TrainTable';

const AdminDashboard = ({ trains, setTrains, platforms, setPlatforms, numPlatforms, setNumPlatforms }) => {
  const [platformInput, setPlatformInput] = useState(numPlatforms);

  const handleNumPlatformsChange = (e) => {
    setPlatformInput(e.target.value);
  };

  const applyNumPlatformsChange = () => {
    const newNumPlatforms = parseInt(platformInput, 10);
    if (!isNaN(newNumPlatforms) && newNumPlatforms >= 2 && newNumPlatforms <= 20) {
      setNumPlatforms(newNumPlatforms);
      setPlatforms(new Array(newNumPlatforms).fill(null).map((_, index) => ({ platformNumber: index + 1, currentTrain: null })));
    } else {
      alert("Please enter a valid number of platforms between 2 and 20.");
    }
  };

  const onFileLoaded = (data) => {
    const parsedData = data.map(train => ({
      trainNumber: train.trainNumber,
      scheduledArrival: train.scheduledArrival,
      scheduledDeparture: train.scheduledDeparture,
      actualArrival: train.scheduledArrival,
      actualDeparture: train.scheduledDeparture,
      priority: train.priority,
      status: 'Not arrived'
    }));

    // const updatedTrains = [...trains];
    const updatedTrains = Array.isArray(trains) ? [...trains] : [];
    parsedData.forEach(newTrain => {
      const index = updatedTrains.findIndex(train => train.trainNumber === newTrain.trainNumber);
      if (index !== -1) {
        // Replace existing train with new train data
        updatedTrains[index] = newTrain;
      } else {
        // Append new train data
        updatedTrains.push(newTrain);
      }
    });

    console.log("updatedTrains :", updatedTrains);

    setTrains(updatedTrains);
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="settings">
        <label>
          Number of Platforms:
          <input
            type="number"
            value={platformInput}
            onChange={handleNumPlatformsChange}
            min="2"
            max="20"
          />
          <button onClick={applyNumPlatformsChange}>Apply</button>
        </label>
      </div>
      <div className="upload-section">
        <UploadCSV onFileLoaded={onFileLoaded} />
      </div>
      <TrainTable trains={trains} modifySchedule={(trainNumber, newArrival, newDeparture) => {
        const updatedTrains = trains.map(train => {
          if (train.trainNumber === trainNumber) {
            return {
              ...train,
              actualArrival: newArrival,
              actualDeparture: newDeparture
            };
          }
          return train;
        });
        setTrains(updatedTrains);
      }} />
    </div>
  );
};

export default AdminDashboard;

