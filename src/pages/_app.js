// src/pages/_app.js
import '../styles/globals.css';
import '../styles/PlatformDisplay.css';
import '../styles/TrainTable.css';
import '../styles/AdminDashboard.css';
import '../styles/AudienceDashboard.css';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
