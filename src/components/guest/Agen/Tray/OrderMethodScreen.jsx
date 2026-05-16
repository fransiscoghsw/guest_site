import { useState, useEffect } from "react";
import PaymentMethodScreen from "./PaymentMethodScreen";

const OrderMethodScreen = ({ ordererData, orderDetails, onBack }) => {
  const [showPaymentMethodScreen, setShowPaymentMethodScreen] = useState(false);
  const [shippingData, setShippingData] = useState({
    shippingAddress: "",
    shippingSchedule: "Morning",
    shippingCost: "Customer",
  });

  // State untuk menyimpan pesan kesalahan validasi
  const [validationErrors, setValidationErrors] = useState({
    shippingAddress: "",
    shippingSchedule: "",
    shippingCost: "",
  });

  const [hasErrors, setHasErrors] = useState(false);

  // Efek untuk memantau perubahan pada shippingData dan menjalankan validasi
  useEffect(() => {
    const errors = validateForm();
    setValidationErrors(errors);
    setHasErrors(Object.keys(errors).length > 0); // Update hasErrors based on errors
  }, [shippingData]); // Jalankan efek setiap kali shippingData berubah

  const handleButtonNextClick = () => {
    // Tidak perlu memanggil validateForm() di sini, karena useEffect sudah melakukannya
    if (!hasErrors) {
      setShowPaymentMethodScreen(true);
    }
  };

  const handleInputChange = (field, value) => {
    // Jika memilih biaya pengiriman dan tidak memenuhi syarat, atur biaya pengiriman menjadi "Customer"
    if (field === "shippingCost" && value === "Provider" && !isEligibleForFreeShipping()) {
        setShippingData((prevData) => ({
            ...prevData,
            shippingCost: "Customer",
        }));
    } else {
        setShippingData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    }
  };

  // Calculate if order is eligible for free shipping
  const isEligibleForFreeShipping = () => {
    const totalEggs = orderDetails?.qty || 0;
    const unit = orderDetails?.unit || "Butir";

    // Jika unit adalah Kilogram, selalu return true
    if (unit === "Kilogram") {
      return true;
    }

    // Jika unit adalah Butir, cek jumlah minimum
    return totalEggs >= 50000;
  };

  // Fungsi validasi form
  const validateForm = () => {
    let errors = {};

    // Validasi Alamat Pengiriman (shippingAddress)
    if (!shippingData.shippingAddress) {
      errors.shippingAddress = "Alamat Pengiriman Tidak Boleh Kosong!";
    } else if (typeof shippingData.shippingAddress !== "string") {
      errors.shippingAddress = "Alamat Pengiriman harus berupa string!";
    }

    // Validasi Jadwal Pengiriman (shippingSchedule)
    if (
      shippingData.shippingSchedule !== "Morning" &&
      shippingData.shippingSchedule !== "Afternoon" &&
      shippingData.shippingSchedule !== "Evening"
    ) {
      errors.shippingSchedule =
        "Jadwal pengiriman harus salah satu dari 'Morning', 'Afternoon' atau 'Evening'";
    }

    // Validasi Biaya Pengiriman (shippingCost)
    if (
      shippingData.shippingCost !== "Customer" &&
      shippingData.shippingCost !== "Provider"
    ) {
      errors.shippingCost =
        "Biaya pengiriman harus salah satu dari 'Customer', 'Provider'";
    }

    return errors;
  };

  // Kondisi untuk merender PaymentMethodScreen
  if (showPaymentMethodScreen) {
    return (
      <PaymentMethodScreen
        ordererData={ordererData}
        orderDetails={orderDetails}
        shippingData={shippingData}
        onBack={() => setShowPaymentMethodScreen(false)}
      />
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-8 animate-fadeIn">
      {/* Progress indicator section */}
      <div className="flex items-center mb-8">
        <div className="flex items-center">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              1
            </div>
            <span className="ml-4 text-gray-500">DATA PEMESAN</span>
          </div>
          <div className="w-16 h-0.5 bg-gray-300 mx-4"></div>
        </div>

        <div className="flex items-center">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              2
            </div>
            <span className="ml-4 text-gray-500">DETAIL PEMESANAN</span>
          </div>
          <div className="w-16 h-0.5 bg-gray-300 mx-4"></div>
        </div>

        <div className="flex items-center">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-[#8B4513] rounded-full flex items-center justify-center text-white">
              3
            </div>
            <span className="ml-4 font-semibold">METODE PENGIRIMAN</span>
          </div>
          <div className="w-16 h-0.5 bg-gray-300 mx-4"></div>
        </div>

        <div className="flex items-center">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              4
            </div>
            <span className="ml-4 text-gray-500">METODE PEMBAYARAN</span>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-bold">METODE PENGIRIMAN</h2>

        <div className="space-y-6">
          <div>
            <label className="block mb-2 text-sm">Alamat Pengiriman</label>
            <textarea
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#8B4513] h-24"
              placeholder="Masukkan alamat pengiriman lengkap"
              value={shippingData.shippingAddress}
              onChange={(e) =>
                handleInputChange("shippingAddress", e.target.value)
              }
            />
            {validationErrors.shippingAddress && (
              <p className="text-red-500 text-xs italic">
                {validationErrors.shippingAddress}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm">Jadwal Pengiriman</label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="Morning"
                  name="shippingSchedule"
                  value="Morning"
                  checked={shippingData.shippingSchedule === "Morning"}
                  onChange={(e) =>
                    handleInputChange("shippingSchedule", e.target.value)
                  }
                  className="focus:ring-[#8B4513] text-[#8B4513]"
                />
                <label htmlFor="Morning">Pagi (08.00-12.00)</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="Afternoon"
                  name="shippingSchedule"
                  value="Afternoon"
                  checked={shippingData.shippingSchedule === "Afternoon"}
                  onChange={(e) =>
                    handleInputChange("shippingSchedule", e.target.value)
                  }
                  className="focus:ring-[#8B4513] text-[#8B4513]"
                />
                <label htmlFor="Afternoon">Siang (12.00-15.00)</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="Evening"
                  name="shippingSchedule"
                  value="Evening"
                  checked={shippingData.shippingSchedule === "Evening"}
                  onChange={(e) =>
                    handleInputChange("shippingSchedule", e.target.value)
                  }
                  className="focus:ring-[#8B4513] text-[#8B4513]"
                />
                <label htmlFor="Evening">Sore (15.00-18.00)</label>
              </div>
            </div>
            {validationErrors.shippingSchedule && (
              <p className="text-red-500 text-xs italic">
                {validationErrors.shippingSchedule}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm">Biaya Pengiriman</label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="Customer"
                  name="shippingCost"
                  value="Customer"
                  checked={shippingData.shippingCost === "Customer"}
                  onChange={(e) =>
                    handleInputChange("shippingCost", e.target.value)
                  }
                  className="focus:ring-[#8B4513] text-[#8B4513]"
                />
                <label htmlFor="Customer">Ditanggung Pemesan</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="Provider"
                  name="shippingCost"
                  value="Provider"
                  checked={shippingData.shippingCost === "Provider"}
                  onChange={(e) =>
                    handleInputChange("shippingCost", e.target.value)
                  }
                  className="focus:ring-[#8B4513] text-[#8B4513]"
                  disabled={!isEligibleForFreeShipping()}
                />
                <label
                  htmlFor="Provider"
                  className={
                    !isEligibleForFreeShipping() ? "text-gray-400" : ""
                  }
                >
                  Ditanggung Penyedia (untuk pemesanan >50.000 butir telur
                  se-Jabodetabek)
                </label>
              </div>
            </div>
            {validationErrors.shippingCost && (
              <p className="text-red-500 text-xs italic">
                {validationErrors.shippingCost}
              </p>
            )}
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded">
            <h3 className="font-semibold mb-2">Ringkasan Pemesanan:</h3>
            <p>Nama: {ordererData?.fullname}</p>
            <p>
              Jumlah: {orderDetails?.qty} {orderDetails?.unit}
            </p>
            <p>Frekuensi: {orderDetails?.orderFrequency}</p>
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <button
            onClick={onBack}
            className="px-8 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
          >
            KEMBALI
          </button>
          <button
            onClick={handleButtonNextClick}
            className={`px-8 py-2 bg-[#8B4513] text-white rounded hover:bg-[#723A0F] transition-colors ${
              hasErrors ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={hasErrors}
          >
            LANJUT →
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderMethodScreen;