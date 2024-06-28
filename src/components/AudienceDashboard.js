import React, { useState, useEffect } from 'react';
import moment from 'moment';
import PlatformDisplay from './PlatformDisplay';
import TrainStatusTable from './TrainStatusTable';

const AudienceDashboard = ({ trains, platforms, setPlatforms, setTrains }) => {
  const [currentTime, setCurrentTime] = useState(moment().format('HH:mm'));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment().format('HH:mm'));
    }, 30000); // Update time every 30 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (trains?.length > 0 && platforms?.length > 0) {
      scheduler();
    }
  }, [currentTime, trains, platforms]);

  const scheduler = () => {
    let updatedTrains = [...trains];
    let updatedPlatforms = [...platforms];

    // Extract trains arriving at the current time
    const arrivingTrains = updatedTrains.filter(
      train => train.actualArrival === currentTime && (train.status === "Not arrived" || train.status === "Waiting")
    );

    // Find available platforms
    const availablePlatforms = updatedPlatforms.filter(platform => !platform.currentTrain);

    // Sort arriving trains by priority and their order in the trains array
    arrivingTrains.sort((a, b) => {
      if (a.priority !== b.priority) {
        return a.priority.localeCompare(b.priority);
      }
      return trains.indexOf(a) - trains.indexOf(b);
    });

    // Allocate platforms to arriving trains
    arrivingTrains.forEach(train => {
      if (availablePlatforms?.length > 0) {
        const platform = availablePlatforms.shift();
        platform.currentTrain = train;
        train.status = "Arrived";
      } else {
        // Get the least departure time from the currently occupied platforms
        const leastDepartureTime = updatedPlatforms
          .filter(platform => platform.currentTrain)
          .map(platform => moment(platform.currentTrain.actualDeparture, 'HH:mm'))
          .sort((a, b) => a - b)[0];

        // Calculate the new actual arrival and departure times
        const newActualArrivalTime = moment(leastDepartureTime).add(1, 'minute');
        const originalArrivalTime = moment(train.scheduledArrival, 'HH:mm');
        const originalDepartureTime = moment(train.scheduledDeparture, 'HH:mm');
        const duration = moment.duration(originalDepartureTime.diff(originalArrivalTime));
        const newActualDepartureTime = moment(newActualArrivalTime).add(duration);

        train.actualArrival = newActualArrivalTime.format('HH:mm');
        train.actualDeparture = newActualDepartureTime.format('HH:mm');
        train.status = "Waiting";
      }
    });

    // Check for departure
    updatedTrains.forEach(train => {
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
        {trains?.length === 0 ? (
          <div className="no-trains-message">No Trains Scheduled.</div>
        ) : (
          <>
            <TrainStatusTable trains={trains} currentTime={currentTime} platforms={platforms} />
            <PlatformDisplay platforms={platforms} trains={trains} currentTime={currentTime} />
          </>
        )}
      </div>
    </div>
  );
};

export default AudienceDashboard;
