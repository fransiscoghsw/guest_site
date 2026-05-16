import { useState, useRef, useEffect } from "react";
import OrderDetailScreen from "./OrderDetailScreen";
import CategoryScreen from "../CategoryScreen";

const OrdererDataScreen = ({ initialData }) => {
  const [showCategoryScreen, setShowCategoryScreen] = useState(false);
  const [showOrderDetailScreen, setOrderDetailScreen] = useState(false);
  const [isAlamatFocused, setIsAlamatFocused] = useState(false);
  const [formOrdererData, setFormOrdererData] = useState({
    email: initialData?.email || "",
    fullname: initialData?.fullname || "",
    address: initialData?.address || "",
    noPhone: initialData?.noPhone || "",
  });
  const dropdownRef = useRef(null);

  // State untuk menyimpan pesan kesalahan validasi
  const [validationErrors, setValidationErrors] = useState({
    email: "",
    fullname: "",
    address: "",
    noPhone: "",
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsAlamatFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleButtonBackClick = () => {
    setShowCategoryScreen(true);
  };

  if (showCategoryScreen) {
    return <CategoryScreen />;
  }

  const handleButtonNextClick = () => {
    // Validasi sebelum melanjutkan
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      setOrderDetailScreen(true);
    } else {
      setValidationErrors(errors);
    }
  };

  if (showOrderDetailScreen) {
    return (
      <OrderDetailScreen
        ordererData={formOrdererData}
        onBack={() => setOrderDetailScreen(false)}
      />
    );
  }

  const handleInputChange = (field, value) => {
    setFormOrdererData((prevData) => ({
      ...prevData,
      [field]: value,
    }));

    // Validasi setiap input berubah
    validateField(field, value);
  };

  // Fungsi validasi form
  const validateForm = () => {
    let errors = {};

    // Validasi Email
    if (!formOrdererData.email) {
      errors.email = "Email Tidak Boleh Kosong!";
    } else if (typeof formOrdererData.email !== "string") {
      errors.email = "Email harus berupa string!";
    } else if (formOrdererData.email.length < 1 || formOrdererData.email.length > 255) {
      errors.email = "Email harus di antara 1 dan 255 karakter!";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formOrdererData.email)) {
      errors.email = "Email mengandung karakter tidak valid!";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formOrdererData.email)) {
      errors.email = "Email harus berupa email yang valid!";
    }

    // Validasi Nama Lengkap
    if (!formOrdererData.fullname) {
      errors.fullname = "Nama lengkap Tidak Boleh Kosong!";
    } else if (typeof formOrdererData.fullname !== "string") {
      errors.fullname = "Nama lengkap harus berupa string!";
    } else if (formOrdererData.fullname.length < 1 || formOrdererData.fullname.length > 255) {
      errors.fullname = "Nama lengkap harus diantara 1 dan 255 karakter!";
    }

    // Validasi Nomor Telepon
    if (!formOrdererData.noPhone) {
      errors.noPhone = "Nomor handphone Tidak Boleh Kosong!";
    } else if (typeof formOrdererData.noPhone !== "string") {
      errors.noPhone = "Nomor handphone harus berupa string!";
    } else if (formOrdererData.noPhone.length < 1 || formOrdererData.noPhone.length > 255) {
      errors.noPhone = "Nomor handphone harus diantara 1 dan 255 karakter!";
    } else if (!/^\+?[\d\s\-()]{7,20}$/.test(formOrdererData.noPhone)) {
      errors.noPhone =
        "Nomor handphone tidak valid! Contoh: +6281234567890 atau 081234567890";
    } else if (!formOrdererData.noPhone.startsWith("+") && formOrdererData.noPhone.length < 10) {
      errors.noPhone = "Nomor handphone lokal harus memiliki minimal 10 digit!";
    }

    // Validasi Alamat
    if (!formOrdererData.address) {
      errors.address = "Alamat Tidak Boleh Kosong!";
    } else if (typeof formOrdererData.address !== "string") {
      errors.address = "Alamat harus berupa string!";
    }

    return errors;
  };

  // Fungsi validasi per field
  const validateField = (field, value) => {
    let error = "";

    switch (field) {
      case "email":
        if (!value) {
          error = "Email Tidak Boleh Kosong!";
        } else if (typeof value !== "string") {
          error = "Email harus berupa string!";
        } else if (value.length < 1 || value.length > 255) {
          error = "Email harus di antara 1 dan 255 karakter!";
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
          error = "Email mengandung karakter tidak valid!";
        }
        break;
      case "fullname":
        if (!value) {
          error = "Nama lengkap Tidak Boleh Kosong!";
        } else if (typeof value !== "string") {
          error = "Nama lengkap harus berupa string!";
        } else if (value.length < 1 || value.length > 255) {
          error = "Nama lengkap harus diantara 1 dan 255 karakter!";
        }
        break;
      case "noPhone":
        if (!value) {
          error = "Nomor handphone Tidak Boleh Kosong!";
        } else if (typeof value !== "string") {
          error = "Nomor handphone harus berupa string!";
        } else if (value.length < 1 || value.length > 255) {
          error = "Nomor handphone harus diantara 1 dan 255 karakter!";
        } else if (!/^\+?[\d\s\-()]{7,20}$/.test(value)) {
          error =
            "Nomor handphone tidak valid! Contoh: +6281234567890 atau 081234567890";
        } else if (!value.startsWith("+") && value.length < 10) {
          error = "Nomor handphone lokal harus memiliki minimal 10 digit!";
        }
        break;
      case "address":
        if (!value) {
          error = "Alamat Tidak Boleh Kosong!";
        } else if (typeof value !== "string") {
          error = "Alamat harus berupa string!";
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

  // Cek apakah ada error di form
  const hasErrors = Object.values(validationErrors).some((error) => error !== "");

  return (
    <div className="w-full max-w-4xl mx-auto p-8 animate-fadeIn">
      {/* Rest of your JSX remains the same */}
      <div className="flex items-center mb-8">
        <div className="flex items-center">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-[#8B4513] rounded-full flex items-center justify-center text-white">
              1
            </div>
            <span className="ml-4 font-semibold">DATA PEMESAN</span>
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
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              4
            </div>
            <span className="ml-4 text-gray-500">METODE PEMBAYARAN</span>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-bold">DATA PEMESAN</h2>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-sm">Nama Lengkap</label>
            <input
              type="text"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
              placeholder="Nama lengkap"
              value={formOrdererData.fullname}
              onChange={(e) => handleInputChange("fullname", e.target.value)}
            />
            {validationErrors.fullname && (
              <p className="text-red-500 text-xs italic">
                {validationErrors.fullname}
              </p>
            )}
          </div>
          <div>
            <label className="block mb-2 text-sm">Alamat Lengkap</label>
            <input
              type="text"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
              placeholder="Alamat lengkap"
              value={formOrdererData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              onFocus={() => setIsAlamatFocused(true)}
            />
            {validationErrors.address && (
              <p className="text-red-500 text-xs italic">
                {validationErrors.address}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-sm">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
              placeholder="Email"
              value={formOrdererData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
            {validationErrors.email && (
              <p className="text-red-500 text-xs italic">
                {validationErrors.email}
              </p>
            )}
          </div>
          <div>
            <label className="block mb-2 text-sm">Nomor Telepon</label>
            <input
              type="tel"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
              placeholder="Nomor Telepon"
              value={formOrdererData.noPhone}
              onChange={(e) => handleInputChange("noPhone", e.target.value)}
            />
            {validationErrors.noPhone && (
              <p className="text-red-500 text-xs italic">
                {validationErrors.noPhone}
              </p>
            )}
          </div>
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

export default OrdererDataScreen;