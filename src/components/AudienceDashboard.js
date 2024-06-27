import React, { useState, useEffect } from 'react';
import moment from 'moment';
import PlatformDisplay from './PlatformDisplay';
import TrainStatusTable from './TrainStatusTable';

const AudienceDashboard = ({ trains, platforms, setPlatforms, setTrains }) => {
  const [currentTime, setCurrentTime] = useState(moment().format('HH:mm'));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment().format('HH:mm'));
      if (trains?.length > 0 && platforms?.length > 0) {
        scheduler();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [currentTime]);

  const scheduler = () => {
    let updatedTrains = [...trains];
    let updatedPlatforms = [...platforms];

    updatedTrains.forEach(train => {
      // Check for arrival
      if (train.actualArrival === currentTime && (train.status === "Not arrived" || train.status === "Waiting")) {
        const availablePlatform = updatedPlatforms.find(platform => !platform.currentTrain);
        if (availablePlatform) {
          availablePlatform.currentTrain = train;
          // train.actualArrival = currentTime;
          train.status = "Arrived";
        } else {
          // Get the least departure time from the currently occupied platforms
          const occupiedPlatforms = updatedPlatforms.filter(platform => platform.currentTrain);
          const leastDepartureTime = occupiedPlatforms
            .map(platform => moment(platform.currentTrain.actualDeparture, 'HH:mm'))
            .sort((a, b) => a - b)[0];

          // Calculate the new actual arrival and departure times
          const newActualArrivalTime = moment(leastDepartureTime).add(1, 'minute').format('HH:mm');
          const originalArrivalTime = moment(train.scheduledArrival, 'HH:mm');
          const originalDepartureTime = moment(train.scheduledDeparture, 'HH:mm');
          const duration = originalDepartureTime.diff(originalArrivalTime, 'minutes');
          const newActualDepartureTime = moment(newActualArrivalTime, 'HH:mm').add(duration, 'minutes').format('HH:mm');

          train.actualArrival = newActualArrivalTime;
          train.actualDeparture = newActualDepartureTime;
          train.status = "Waiting";
        }
      }

      // Check for departure
      if (train.actualDeparture === currentTime && train.status === "Arrived") {
        const platform = updatedPlatforms.find(platform => platform.currentTrain && platform.currentTrain.trainNumber === train.trainNumber);
        if (platform) {
          train.status = "Departing";
          setTrains([...updatedTrains]);

          // Schedule the actual departure and platform clearing after 1 minute
          setTimeout(() => {
            platform.currentTrain = null;
            train.actualDeparture = moment().add(1, 'minute').format('HH:mm');
            train.status = "Departed";
            setTrains([...updatedTrains]);
            setPlatforms([...updatedPlatforms]);
          }, 60000); // 1 minute delay
        }
      }
    });

    setPlatforms(updatedPlatforms);
  };

  return (
    <div className="audience-dashboard">
      <h1>Travel Information Screen</h1>
      <div className="dashboard-content">
        <TrainStatusTable trains={trains} currentTime={currentTime} platforms={platforms}/>
        <PlatformDisplay platforms={platforms} trains={trains} currentTime={currentTime} />
      </div>
    </div>
  );
};

export default AudienceDashboard;
