import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Pastikan ID Pelacakan Anda sudah benar
const GA_TRACKING_ID = 'G-R5VL7GP0PC';

const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Fungsi untuk mengirim event pageview ke Google Analytics
    if (window.gtag) {
      window.gtag('config', GA_TRACKING_ID, {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]); // Efek ini akan berjalan setiap kali lokasi berubah

  return null; // Komponen ini tidak me-render UI apapun
};

export default AnalyticsTracker;