import { useState, useRef, useEffect } from "react";
import CategoryScreen from "../CategoryScreen";
import BusinessScreen from "./BusinessScreen";
import PropTypes from "prop-types"; // Import PropTypes

const FormScreen = ({ initialData }) => {
  const [showCategoryScreen, setShowCategoryScreen] = useState(false);
  const [showBusinessScreen, setShowBusinessScreen] = useState(false);
  const [isAlamatFocused, setIsAlamatFocused] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    fullname: initialData?.fullname || "",
    address: initialData?.address || "",
    placeAndDateOfBirth: {
      place: initialData?.placeAndDateOfBirth?.place || "",
      date: initialData?.placeAndDateOfBirth?.date || "",
    },
    gender: initialData?.gender || "",
    noPhone: initialData?.noPhone || "",
    noKtp: initialData?.noKtp || "",
    email: initialData?.email || "",
  });

  const dropdownRef = useRef(null);

  const validateField = (field, value) => {
    switch (field) {
      case "email":
        if (!value.trim()) return "Email Tidak Boleh Kosong!";
        if (value.length > 255)
          return "Email harus di antara 1 dan 255 karakter!";
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(value))
          return "Email mengandung karakter tidak valid!";
        break;

      case "fullname":
        if (!value.trim()) return "Nama lengkap Tidak Boleh Kosong!";
        if (value.length > 255)
          return "Nama lengkap harus diantara 1 dan 255 karakter!";
        break;

      case "noPhone":
        if (!value.trim()) return "Nomor handphone Tidak Boleh Kosong!";
        if (value.length > 255)
          return "Nomor handphone harus diantara 1 dan 255 karakter!";
        const phoneRegex = /^\+?[\d\s\-()]{7,20}$/;
        if (!phoneRegex.test(value))
          return "Nomor handphone tidak valid! Contoh: +6281234567890 atau 081234567890";
        if (!value.startsWith("+") && value.length < 10)
          return "Nomor handphone lokal harus memiliki minimal 10 digit!";
        break;

      case "address":
        if (!value.trim()) return "Alamat Tidak Boleh Kosong!";
        break;

      case "noKtp":
        if (!value.trim()) return "Nomor KTP Tidak Boleh Kosong!";
        if (!/^\d+$/.test(value)) return "Nomor KTP harus berupa Angka!";
        break;

      case "placeAndDateOfBirth":
        if (!value.place.trim() || !value.date)
          return "Tempat tanggal lahir Tidak Boleh Kosong!";
        if (value.place.length > 255)
          return "Tempat tanggal lahir harus diantara 1 dan 255 karakter!";
        break;

      case "gender": // Validasi Jenis Kelamin
        if (!value) return "Jenis Kelamin Tidak Boleh Kosong!";
        break;

      default:
        return "";
    }
    return "";
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      if (field === "placeAndDateOfBirth") {
        const error = validateField(field, formData[field]);
        if (error) newErrors[field] = error;
      } else {
        const error = validateField(field, formData[field]);
        if (error) newErrors[field] = error;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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

  const handleButtonNextClick = () => {
    if (validateForm()) {
      setShowBusinessScreen(true);
    }
  };

  const handleInputChange = (field, value) => {
    if (
      field === "placeAndDateOfBirth.place" ||
      field === "placeAndDateOfBirth.date"
    ) {
      const [parent, child] = field.split(".");
      setFormData((prevData) => ({
        ...prevData,
        [parent]: {
          ...prevData[parent],
          [child]: value,
        },
      }));
      // Clear error when user starts typing
      setErrors((prev) => ({
        ...prev,
        [parent]: "",
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [field]: value,
      }));
      // Clear error when user starts typing
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  if (showCategoryScreen) {
    return (
      <CategoryScreen
        onContinue={() => setShowCategoryScreen(false)}
        formData={formData}
      />
    );
  }

  if (showBusinessScreen) {
    return (
      <BusinessScreen
        personalData={formData}
        alamatLengkap={{
          alamat: formData.address,
          provinsi: formData.province,
          kota: formData.city,
          kecamatan: formData.kecamatan,
          kelurahan: formData.kelurahan,
          kodePos: formData.postalCode,
        }}
        onBack={() => setShowBusinessScreen(false)}
      />
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-8 animate-fadeIn">
      <div className="flex mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-[#8B4513] rounded-full flex items-center justify-center text-white">
            1
          </div>
          <span className="font-semibold">INFORMASI PRIBADI</span>
        </div>
        <div className="flex-1 border-t-2 mx-4 my-4"></div>
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            2
          </div>
          <span className="text-gray-500">INFORMASI USAHA</span>
        </div>
        <div className="flex-1 border-t-2 mx-4 my-4"></div>
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            3
          </div>
          <span className="text-gray-500">PERSETUJUAN</span>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-bold">INFORMASI PRIBADI</h2>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-sm">Nama Lengkap</label>
            <input
              type="text"
              className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#8B4513] ${
                errors.fullname ? "border-red-500" : ""
              }`}
              placeholder="Nama lengkap"
              value={formData.fullname}
              onChange={(e) => handleInputChange("fullname", e.target.value)}
            />
            {errors.fullname && (
              <p className="text-red-500 text-sm mt-1">{errors.fullname}</p>
            )}
          </div>
          <div>
            <label className="block mb-2 text-sm">Alamat Lengkap</label>
            <input
              type="text"
              className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#8B4513] ${
                errors.address ? "border-red-500" : ""
              }`}
              placeholder="Alamat lengkap"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              onFocus={() => setIsAlamatFocused(true)}
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-sm">Tempat Lahir</label>
            <input
              type="text"
              className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#8B4513] ${
                errors.placeAndDateOfBirth ? "border-red-500" : ""
              }`}
              placeholder="Tempat Lahir"
              value={formData.placeAndDateOfBirth.place}
              onChange={(e) =>
                handleInputChange("placeAndDateOfBirth.place", e.target.value)
              }
            />
            {errors.placeAndDateOfBirth && (
              <p className="text-red-500 text-sm mt-1">
                {errors.placeAndDateOfBirth}
              </p>
            )}
          </div>
          <div>
            <label className="block mb-2 text-sm">Tanggal Lahir</label>
            <input
              type="date"
              className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#8B4513] ${
                errors.placeAndDateOfBirth ? "border-red-500" : ""
              }`}
              value={formData.placeAndDateOfBirth.date}
              onChange={(e) =>
                handleInputChange("placeAndDateOfBirth.date", e.target.value)
              }
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-sm">Jenis Kelamin</label>
            <select
              className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#8B4513] ${
                errors.gender ? "border-red-500" : ""
              }`}
              value={formData.gender}
              onChange={(e) => handleInputChange("gender", e.target.value)}
            >
              <option value="">Pilih Jenis Kelamin</option>
              <option value="Male">Pria</option>
              <option value="Female">Wanita</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
            )}
          </div>
          <div>
            <label className="block mb-2 text-sm">Nomor Telepon/WhatsApp</label>
            <input
              type="tel"
              className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#8B4513] ${
                errors.noPhone ? "border-red-500" : ""
              }`}
              placeholder="Nomor telepon/WhatsApp"
              value={formData.noPhone}
              onChange={(e) => handleInputChange("noPhone", e.target.value)}
            />
            {errors.noPhone && (
              <p className="text-red-500 text-sm mt-1">{errors.noPhone}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-sm">Nomor KTP</label>
            <input
              type="text"
              className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#8B4513] ${
                errors.noKtp ? "border-red-500" : ""
              }`}
              placeholder="Nomor KTP"
              value={formData.noKtp}
              onChange={(e) => handleInputChange("noKtp", e.target.value)}
            />
            {errors.noKtp && (
              <p className="text-red-500 text-sm mt-1">{errors.noKtp}</p>
            )}
          </div>
          <div>
            <label className="block mb-2 text-sm">Email</label>
            <input
              type="email"
              className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#8B4513] ${
                errors.email ? "border-red-500" : ""
              }`}
              placeholder="Email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
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
            className="px-8 py-2 bg-[#8B4513] text-white rounded hover:bg-[#723A0F] transition-colors"
          >
            LANJUT →
          </button>
        </div>
      </div>
    </div>
  );
};

FormScreen.propTypes = {
  initialData: PropTypes.shape({
    fullname: PropTypes.string,
    address: PropTypes.string,
    province: PropTypes.string,
    city: PropTypes.string,
    kecamatan: PropTypes.string,
    kelurahan: PropTypes.string,
    postalCode: PropTypes.string,
    placeAndDateOfBirth: PropTypes.shape({
      place: PropTypes.string,
      date: PropTypes.string,
    }),
    gender: PropTypes.string,
    noPhone: PropTypes.string,
    noKtp: PropTypes.string,
    email: PropTypes.string,
  }),
};

export default FormScreen;