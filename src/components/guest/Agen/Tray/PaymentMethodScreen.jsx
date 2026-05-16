import { useState, useEffect } from "react";
import ConfirmationScreen from "./ConfirmationScreen";

const PaymentMethodScreen = ({
  ordererData,
  orderDetails,
  shippingData,
  onBack,
}) => {
  const [paymentData, setPaymentData] = useState({
    bankName: "",
    noRekeningAndName: "",
  });
  const [showConfirmationScreen, setShowConfirmationScreen] = useState(false);

  // State untuk menyimpan pesan kesalahan validasi
  const [validationErrors, setValidationErrors] = useState({
    bankName: "",
    noRekeningAndName: "",
  });

  const [hasErrors, setHasErrors] = useState(false);

  // Efek untuk memantau perubahan pada paymentData dan menjalankan validasi
  useEffect(() => {
    const errors = validateForm();
    setValidationErrors(errors);
    setHasErrors(Object.keys(errors).length > 0); // Update hasErrors based on errors
  }, [paymentData]); // Jalankan efek setiap kali paymentData berubah

  const handleButtonNextClick = () => {
    // Tidak perlu memanggil validateForm() di sini, karena useEffect sudah melakukannya
    if (!hasErrors) {
      setShowConfirmationScreen(true);
    }
  };

  const handleInputChange = (field, value) => {
    setPaymentData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  // Fungsi validasi form
  const validateForm = () => {
    let errors = {};

    // Validasi Nama Bank (bankName)
    if (!paymentData.bankName) {
      errors.bankName = "Nama Bank Tidak Boleh Kosong!";
    }

    // Validasi Nomor Rekening dan Nama (noRekeningAndName)
    if (!paymentData.noRekeningAndName) {
      errors.noRekeningAndName = "Nomor Rekening dan Nama Tidak Boleh Kosong!";
    }

    return errors;
  };

  // Kondisi untuk merender ConfirmationScreen
  if (showConfirmationScreen) {
    return (
      <ConfirmationScreen
        ordererData={ordererData}
        orderDetails={orderDetails}
        shippingData={shippingData}
        paymentData={paymentData}
        onBack={() => setShowConfirmationScreen(false)}
      />
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-8 animate-fadeIn">
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
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              3
            </div>
            <span className="ml-4 text-gray-500">METODE PENGIRIMAN</span>
          </div>
          <div className="w-16 h-0.5 bg-gray-300 mx-4"></div>
        </div>

        <div className="flex items-center">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-[#8B4513] rounded-full flex items-center justify-center text-white">
              4
            </div>
            <span className="ml-4 font-semibold">METODE PEMBAYARAN</span>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-bold">METODE PEMBAYARAN</h2>

        <div className="bg-[#FDF5E6] p-6 rounded-lg space-y-4">
          <p className="font-semibold">
            Metode pembayaran dilakukan melalui rekening perusahaan:
          </p>
          <div className="space-y-2">
            <p className="font-bold">PT SUKAHARJA QUAIL INDONESIA</p>
            <p className="font-bold">0955009601</p>
            <p>An PT Sukaharja Quail Indonesia (BCA)</p>
          </div>
          <p className="mt-4">
            Total biaya pemesanan bisa langsung hubungi Tim Marketing PT SQI
          </p>
          <a
            href="https://wa.me/6285814688322"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-[#8B4513] hover:underline"
          >
            wa.me/6285814688322
          </a>
        </div>

        <div className="space-y-6 mt-6">
          <div>
            <label className="block mb-2 text-sm">Nama Bank</label>
            <input
              type="text"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
              placeholder="Contoh: BCA, BRI, Mandiri"
              value={paymentData.bankName}
              onChange={(e) => handleInputChange("bankName", e.target.value)}
            />
            {validationErrors.bankName && (
              <p className="text-red-500 text-xs italic">
                {validationErrors.bankName}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm">
              Nomor Rekening dan Nama
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
              placeholder="Contoh: 0955009601 YULIANA"
              value={paymentData.noRekeningAndName}
              onChange={(e) =>
                handleInputChange("noRekeningAndName", e.target.value)
              }
            />
            {validationErrors.noRekeningAndName && (
              <p className="text-red-500 text-xs italic">
                {validationErrors.noRekeningAndName}
              </p>
            )}
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded space-y-4">
          <h3 className="font-semibold">Ringkasan Pemesanan:</h3>
          <div className="space-y-2">
            <p>Nama: {ordererData?.fullname}</p>
            <p>Email: {ordererData?.email}</p>
            <p>No. Telepon: {ordererData?.noPhone}</p>
            <p>
              Jumlah: {orderDetails?.qty} {orderDetails?.unit}
            </p>
            <p>Frekuensi: {orderDetails?.orderFrequency}</p>
            <p>Alamat Pengiriman: {shippingData?.shippingAddress}</p>
            <p>
              Jadwal Pengiriman:{" "}
              {shippingData?.shippingSchedule === "morning"
                ? "Pagi (08.00-12.00)"
                : shippingData?.shippingSchedule === "afternoon"
                ? "Siang (12.00-15.00)"
                : "Sore (15.00-18.00)"}
            </p>
            <p>
              Biaya Pengiriman:{" "}
              {shippingData?.shippingCost === "customer"
                ? "Ditanggung Pemesan"
                : "Ditanggung Penyedia"}
            </p>
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
            LANJUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodScreen;