import { useState } from "react";
import OrderMethodScreen from "./OrderMethodScreen";
import OrdererDataScreen from "./OrdererDataScreen"; // Assuming this is the previous screen

const OrderDetailScreen = ({ ordererData, onBack }) => {
  const [showOrderMethodScreen, setShowOrderMethodScreen] = useState(false);
  const [showOrdererScreen, setShowOrdererScreen] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    qty: 0, // Ubah ke angka
    orderFrequency: "Sekali",
    unit: "Butir", //Set default jadi Butir
  });

  // State untuk menyimpan pesan kesalahan validasi
  const [validationErrors, setValidationErrors] = useState({
    qty: "",
    orderFrequency: "",
  });

  const handleButtonNextClick = () => {
    // Validasi sebelum melanjutkan
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      setShowOrderMethodScreen(true);
    } else {
      setValidationErrors(errors);
    }
  };

  const handleButtonBackClick = () => {
    if (typeof onBack === "function") {
      onBack();
    } else {
      setShowOrdererScreen(true);
    }
  };

  if (showOrderMethodScreen) {
    return (
      <OrderMethodScreen
        ordererData={ordererData}
        orderDetails={orderDetails}
        onBack={() => setShowOrderMethodScreen(false)}
      />
    );
  }

  if (showOrdererScreen) {
    return <OrdererDataScreen initialData={ordererData} />;
  }

  const handleInputChange = (field, value) => {
    // Konversi ke angka jika fieldnya adalah qty
    const newValue = field === "qty" ? Number(value) : value;

    setOrderDetails((prevData) => ({
      ...prevData,
      [field]: newValue,
    }));

    // Validasi setiap input berubah
    validateField(field, newValue);
  };

  // Fungsi validasi form
  const validateForm = () => {
    let errors = {};

    // Validasi Jumlah Telur (qty)
    if (!orderDetails.qty) {
      errors.qty = "Jumlah telur Tidak Boleh Kosong!";
    } else if (typeof orderDetails.qty !== "number") {
      errors.qty = "Jumlah telur harus berupa angka!";
    } else if (orderDetails.qty < 0) {
      errors.qty = "Jumlah telur tidak boleh negatif!";
    }

    // Validasi Frekuensi Pemesanan (orderFrequency)
    if (!orderDetails.orderFrequency) {
      errors.orderFrequency = "Frekuensi Pemesanan Tidak Boleh Kosong!";
    } else if (typeof orderDetails.orderFrequency !== "string") {
      errors.orderFrequency = "Frekuensi Pemesanan harus berupa string!";
    } else if (
      orderDetails.orderFrequency.length < 1 ||
      orderDetails.orderFrequency.length > 255
    ) {
      errors.orderFrequency =
        "Frekuensi Pemesanan harus diantara 1 dan 255 karakter!";
    }

    return errors;
  };

  // Fungsi validasi per field
  const validateField = (field, value) => {
    let error = "";

    switch (field) {
      case "qty":
        if (!value) {
          error = "Jumlah telur Tidak Boleh Kosong!";
        } else if (typeof value !== "number") {
          error = "Jumlah telur harus berupa angka!";
        } else if (value < 0) {
          error = "Jumlah telur tidak boleh negatif!";
        }
        break;
      case "orderFrequency":
        if (!value) {
          error = "Frekuensi Pemesanan Tidak Boleh Kosong!";
        } else if (typeof value !== "string") {
          error = "Frekuensi Pemesanan harus berupa string!";
        } else if (value.length < 1 || value.length > 255) {
          error = "Frekuensi Pemesanan harus diantara 1 dan 255 karakter!";
        }
        break;
      default:
        break;
    }

    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [field]: error,
    }));
  };

  const hasErrors = Object.values(validationErrors).some((error) => error !== "");

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
            <div className="w-8 h-8 bg-[#8B4513] rounded-full flex items-center justify-center text-white">
              2
            </div>
            <span className="ml-4 font-semibold">DETAIL PEMESANAN</span>
          </div>
          <div className="w-16 h-0.5 bg-gray-300 mx-4"></div>
        </div>

        <div className="flex items-center">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              3
            </div>
            <span className="ml-4 text-gray-500">METODE PENGIRIMAN</span>
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
        <h2 className="text-xl font-bold">DETAIL PEMESANAN</h2>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-sm">Jumlah Telur</label>
            <div className="flex space-x-2">
              <input
                type="number"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
                placeholder="Jumlah telur"
                value={orderDetails.qty}
                onChange={(e) => handleInputChange("qty", e.target.value)}
              />
              <select
                className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
                value={orderDetails.unit}
                onChange={(e) => handleInputChange("unit", e.target.value)}
              >
                <option value="Butir">Butir</option>
                <option value="Kilogram">Kilogram</option>
              </select>
            </div>
            {validationErrors.qty && (
              <p className="text-red-500 text-xs italic">
                {validationErrors.qty}
              </p>
            )}
          </div>
          <div>
            <label className="block mb-2 text-sm">Frekuensi Pemesanan</label>
            <select
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
              value={orderDetails.orderFrequency}
              onChange={(e) =>
                handleInputChange("orderFrequency", e.target.value)
              }
            >
              <option value="Sekali">Sekali</option>
              <option value="Harian">Harian</option>
              <option value="Mingguan">Mingguan</option>
              <option value="Bulanan">Bulanan</option>
            </select>
            {validationErrors.orderFrequency && (
              <p className="text-red-500 text-xs italic">
                {validationErrors.orderFrequency}
              </p>
            )}
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded">
          <h3 className="font-semibold mb-2">Data Pemesan:</h3>
          <p>Nama: {ordererData?.fullname}</p>
          <p>Email: {ordererData?.email}</p>
          <p>Alamat: {ordererData?.address}</p>
          <p>No. Telepon: {ordererData?.noPhone}</p>
        </div>

        <div className="flex justify-between mt-8">
          <button
            onClick={handleButtonBackClick}
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

export default OrderDetailScreen;