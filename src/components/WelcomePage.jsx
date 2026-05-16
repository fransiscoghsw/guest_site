import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import quailEgg from "../assets/images/icons/quail icon.png";

// Semua gambar yang perlu di-preload sebelum halaman bisa di-scroll
import HeroBg from "../assets/images/HomePage Hero.jpeg";
import AgenSideImage from "../assets/images/telur-telur-puyuh.jpg";
import BudimanLogo from "../assets/images/budiman.png";
import HappyHarvestLogo from "../assets/images/happy-harvest.jpg";
import TipTopLogo from "../assets/images/tip-top.png";
import KeunggulanSatu from "../assets/images/Quail.svg";
import KeunggulanDua from "../assets/images/Clean Hands (1).svg";
import KeunggulanTiga from "../assets/images/Process.svg";
import KeunggulanEmpat from "../assets/images/Instagram Verification Badge.svg";

const IMAGES_TO_PRELOAD = [
  HeroBg,
  AgenSideImage,
  BudimanLogo,
  HappyHarvestLogo,
  TipTopLogo,
  KeunggulanSatu,
  KeunggulanDua,
  KeunggulanTiga,
  KeunggulanEmpat,
];

const WelcomePage = ({ onClose }) => {
  const [progress, setProgress] = useState(0);
  const [allLoaded, setAllLoaded] = useState(false);

  useEffect(() => {
    // Lock scroll selama loading
    document.body.style.overflow = "hidden";

    let loadedCount = 0;
    const total = IMAGES_TO_PRELOAD.length;

    const onDone = () => {
      loadedCount += 1;
      setProgress(Math.round((loadedCount / total) * 100));
      if (loadedCount >= total) {
        setAllLoaded(true);
      }
    };

    IMAGES_TO_PRELOAD.forEach((src) => {
      if (!src) { onDone(); return; }
      const img = new Image();
      img.onload = onDone;
      img.onerror = onDone;
      img.src = src;
      if (img.complete) onDone();
    });

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Setelah semua gambar selesai, tunggu animasi selesai lalu tutup
  useEffect(() => {
    if (!allLoaded) return;
    const timer = setTimeout(() => {
      document.body.style.overflow = "";
      onClose();
    }, 600); // sedikit jeda agar progress bar terlihat penuh
    return () => clearTimeout(timer);
  }, [allLoaded, onClose]);

  return (
    <AnimatePresence>
      <motion.div
        key="welcome"
        className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Gambar telur puyuh — animasi asli tetap */}
        <motion.img
          src={quailEgg}
          alt="Telur Puyuh"
          className="w-32 h-32"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />

        {/* Progress bar — muncul setelah gambar turun */}
        <motion.div
          className="mt-8 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {/* Track */}
          <div className="w-48 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            {/* Fill — lebar mengikuti progress nyata */}
            <motion.div
              className="h-full bg-green-500 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeOut", duration: 0.3 }}
            />
          </div>
          <p className="text-gray-400 text-xs tracking-widest">
            {allLoaded ? "Siap!" : "Memuat halaman..."}
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default WelcomePage;