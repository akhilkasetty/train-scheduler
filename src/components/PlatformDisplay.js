import React from 'react';
import moment from 'moment';

const PlatformDisplay = ({ platforms, trains, currentTime }) => {
  const getRemainingTime = (departureTime) => {
    const now = moment(currentTime, 'HH:mm');
    const departure = moment(departureTime, 'HH:mm');
    const diff = departure.diff(now, 'minutes');
    return diff > 0 ? diff : 0;
  };

  // "tailwindcss": "^3.4.1",
    // "typescript": "^5"

  return (
    <div className="platform-display">
      {platforms.map(platform => (
        <div key={platform.platformNumber} className="platform">
          <div className="platform-track">
            {platform.currentTrain && (
              <div className={`train ${platform.currentTrain.status}`}>
                {/* <div className="train-icon">🚆</div> */}
                <img src="/train.png" alt="Train" className="train-icon" />
                <div className="train-details">
                  {platform.currentTrain.trainNumber}
                  {platform.currentTrain.status === 'Arrived' && (
                    <span className="timer">Departs in: {getRemainingTime(platform.currentTrain.actualDeparture)} min</span>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="platform-label">Platform {platform.platformNumber}</div>
        </div>
      ))}
    </div>
  );
};

export default PlatformDisplay;
