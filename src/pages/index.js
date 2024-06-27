import React, { useState } from 'react';
import AdminDashboard from '../components/AdminDashboard';
import AudienceDashboard from '../components/AudienceDashboard';

const sampleTrains = [
  { trainNumber: "22001", scheduledArrival: "14:39", scheduledDeparture: "14:40", priority: "P1", status: "Not arrived" },
  { trainNumber: "22002", scheduledArrival: "14:39", scheduledDeparture: "14:40", priority: "P2", status: "Not arrived" },
  { trainNumber: "22003", scheduledArrival: "14:39", scheduledDeparture: "14:40", priority: "P1", status: "Not arrived" },
  { trainNumber: "22004", scheduledArrival: "14:39", scheduledDeparture: "14:40", priority: "P3", status: "Not arrived" },
  { trainNumber: "22005", scheduledArrival: "14:39", scheduledDeparture: "14:40", priority: "P2", status: "Not arrived" },
  { trainNumber: "22006", scheduledArrival: "14:39", scheduledDeparture: "14:40", priority: "P1", status: "Not arrived" },
  { trainNumber: "22007", scheduledArrival: "14:39", scheduledDeparture: "14:40", priority: "P3", status: "Not arrived" },
  { trainNumber: "22008", scheduledArrival: "00:10", scheduledDeparture: "00:12", priority: "P2", status: "Not arrived" },
  { trainNumber: "22009", scheduledArrival: "00:10", scheduledDeparture: "00:12", priority: "P1", status: "Not arrived" },
  { trainNumber: "22010", scheduledArrival: "00:10", scheduledDeparture: "00:12", priority: "P3", status: "Not arrived" }
];

const App = () => {
  const [trains, setTrains] = useState();
  const [numPlatforms, setNumPlatforms] = useState(5);
  const [platforms, setPlatforms] = useState(new Array(numPlatforms?numPlatforms:2).fill(null).map((_, index) => ({ platformNumber: index + 1, currentTrain: null })));
  const [currentDashboard, setCurrentDashboard] = useState('audience');

  return (
    <div>
      <nav>
        <button 
          className={currentDashboard === 'admin' ? 'active' : ''} 
          onClick={() => setCurrentDashboard('admin')}
        >
          Manage Trains
        </button>
        <button 
          className={currentDashboard === 'audience' ? 'active' : ''} 
          onClick={() => setCurrentDashboard('audience')}
        >
          Trains status display
        </button>
      </nav>

      {currentDashboard === 'admin' ? (
        <AdminDashboard
          trains={trains}
          setTrains={setTrains}
          platforms={platforms}
          setPlatforms={setPlatforms}
          numPlatforms={numPlatforms}
          setNumPlatforms={setNumPlatforms}
        />
      ) : (
        <AudienceDashboard trains={trains} platforms={platforms} setPlatforms={setPlatforms} setTrains={setTrains}/>
      )}
    </div>
  );
};

export default App;
