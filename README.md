# Train Scheduler

This project is a Train Scheduler application developed as an assignment for Plotline. It allows administrators to manage train schedules and displays real-time train information on a travel information screen.

## Tech Stack and Versions

- **React**: 17.0.2
- **Next.js**: 12.0.7
- **Moment.js**: 2.29.1
- **React-Papaparse**: 3.14.0

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

- Node.js (v14.17.0 or higher)
- npm (v6.14.13 or higher)

### Installation

1. **Clone the Repository:**
   ```sh
   git clone https://github.com/akhilkasetty/train-scheduler.git
   ```
   ```sh
   cd train-scheduler
   ```
   ```sh
   npm install
   ```
2. **Install Dependencies:**
   ```sh
    npm run dev
3. **Open Your Browser and Navigate to:**
   ```sh
    http://localhost:3000
   
## Sample CSV
Note: Please edit time in whole csv according to your system time to see data in action .
  ```csv
  trainNumber,scheduledArrival,scheduledDeparture,priority
  22001,14:03,14:04,P1
  22002,14:03,14:04,P2
  22003,14:03,14:04,P1
  22004,14:03,14:04,P3
  22005,14:03,14:04,P2
  22006,00:10,00:12,P1
  22007,00:10,00:12,P3
  22008,00:10,00:12,P2
  22009,00:10,00:12,P1
  22010,00:10,00:12,P3
```

## Usage

### Admin Dashboard

**Manage Train Schedules:**
- Upload a CSV file to manage train schedules. The CSV file should have the following columns: Train Number, Scheduled Arrival, Scheduled Departure, Priority.

**Set Number of Platforms:**
- Set the number of platforms using the input field and click "Apply".

**Modify Schedules:**
- You can modify train schedules directly from the dashboard.

### Travel Information Screen

**Display Real-Time Train Information:**
- Displays real-time train information, including current trains, upcoming trains, and recently departed trains.

**Train Animations:**
- The train animation shows trains arriving at and departing from platforms, making the information more visually appealing.

## Assumptions

### Time Synchronization 
- Time is checked based on the real-time system clock, so data needs to have times according to our clock to see trains movement and data in action.

### Minute Addition for Waiting Trains
- If all platforms are occupied and a new train arrives, the train's actual arrival and departure times are delayed based on the least departure time among currently occupied platforms plus one minute.

### Default Train Status
- On CSV upload, the default status for all trains is set to "Not arrived".

### Train States
- The possible states for a train are "Not arrived", "Arrived", "Departing", "Departed", and "Waiting".

### Departure Handling
- Upon reaching the scheduled departure time, the train enters the "Departing" state and then the "Departed" state after a minute, at which point it is removed from the platform.

### Single Day Operation
- The application only handles trains scheduled for a single day and does not manage trains with multiple dates.




